// packages/x402-mw/src/middleware/x402-middleware.ts
import { Request, Response, NextFunction } from 'express';
import { X402Generator, HeaderParser, ResourceBinder } from '../core/payment';
import { 
  FacilitatorClient, 
  VerifyService, 
  SettleService, 
  CircuitBreaker,
  PaymentVerificationResult,
  PaymentSettlementResult
} from '../facilitator';
import { 
  X402MiddlewareConfig, 
  DEFAULT_MIDDLEWARE_CONFIG,
  validateConfig,
  toX402Config,
  toFacilitatorConfig
} from './config';
import winston from 'winston';

/**
 * ミドルウェア実行結果
 */
export interface MiddlewareResult {
  success: boolean;
  paymentId?: string;
  reason?: string;
  verificationResult?: PaymentVerificationResult;
  settlementResult?: PaymentSettlementResult;
}

/**
 * x402 Payment Required ミドルウェア
 */
export class X402Middleware {
  private static logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
  });

  private config: X402MiddlewareConfig;
  private facilitatorClient: FacilitatorClient;
  private verifyService: VerifyService;
  private settleService: SettleService;
  private circuitBreaker: CircuitBreaker;

  constructor(config: X402MiddlewareConfig) {
    // 設定をデフォルトとマージ
    this.config = {
      ...config,
      payment: { 
        ...DEFAULT_MIDDLEWARE_CONFIG.payment,
        ...config.payment 
      },
      facilitator: { 
        ...DEFAULT_MIDDLEWARE_CONFIG.facilitator,
        ...config.facilitator 
      },
      middleware: { 
        ...DEFAULT_MIDDLEWARE_CONFIG.middleware,
        ...config.middleware 
      },
      circuitBreaker: { 
        ...DEFAULT_MIDDLEWARE_CONFIG.circuitBreaker,
        ...config.circuitBreaker 
      },
    };

    // 設定検証
    validateConfig(this.config);

    // サービス初期化
    this.facilitatorClient = new FacilitatorClient(toFacilitatorConfig(this.config));
    this.circuitBreaker = new CircuitBreaker(this.config.circuitBreaker);
    this.verifyService = new VerifyService(this.facilitatorClient, this.circuitBreaker);
    this.settleService = new SettleService(this.facilitatorClient, this.circuitBreaker);

    X402Middleware.logger.info('X402 Middleware initialized', {
      networkName: this.config.payment.networkName,
      currency: this.config.payment.currency,
      amount: this.config.payment.amount,
    });
  }

  /**
   * Express ミドルウェア関数を取得
   */
  getMiddleware() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await this.processRequest(req, res);
        
        if (result.success) {
          // 支払い成功 → 次のハンドラーに進む
          next();
        }
        // 支払い失敗の場合は、processRequest内で402応答済み
      } catch (error) {
        X402Middleware.logger.error('Middleware error', {
          error: error instanceof Error ? error.message : 'Unknown error',
          url: req.originalUrl,
          method: req.method,
        });

        // エラー時は500応答
        res.status(500).json({
          error: 'internal_server_error',
          message: 'Payment processing failed',
          timestamp: new Date().toISOString(),
        });
      }
    };
  }

  /**
   * リクエスト処理のメインロジック
   */
  private async processRequest(req: Request, res: Response): Promise<MiddlewareResult> {
    console.log('🔄 X402Middleware.processRequest started');
    console.log('📍 Request URL:', req.originalUrl);
    console.log('🔧 Request method:', req.method);
    console.log('📋 Request headers:', req.headers);
    
    // 1. スキップパス判定
    if (this.shouldSkipPath(req.path)) {
      console.log('⏭️ Path skipped:', req.path);
      return { success: true, reason: 'path_skipped' };
    }

    // 2. リソース設定取得
    const resourceConfig = ResourceBinder.getResourceConfig(req);
    const x402Config = resourceConfig 
      ? { ...toX402Config(this.config), ...resourceConfig.config }
      : toX402Config(this.config);
    console.log('⚙️ X402 config loaded:', x402Config);

    // 3. 支払いヘッダー解析
    console.log('🔍 Parsing payment header...');
    console.log('💳 X-PAYMENT header value:', req.headers['x-payment']);
    const paymentHeader = HeaderParser.parsePaymentHeader(req);
    console.log('📦 Payment header result:', paymentHeader);
    
    if (!paymentHeader || !paymentHeader.isValid) {
      console.log('❌ No valid payment header found → generating 402 response');
      // 支払い情報なし → 402応答生成
      await this.generate402Response(req, res, x402Config);
      return { success: false, reason: 'payment_required' };
    }

    console.log('✅ Valid payment header found');
    console.log('📦 Payment payload:', paymentHeader.payload);

    // 4. 支払い検証
    console.log('🔍 Building payment requirements...');
    const requirements = await this.buildPaymentRequirements(req, x402Config, paymentHeader.payload);
    console.log('📋 Payment requirements built:', requirements);
    
    console.log('🔍 Starting payment verification...');
    console.log('📦 Payload to verify:', paymentHeader.payload);
    console.log('📋 Requirements for verification:', requirements);
    
    const verificationResult = await this.verifyService.verifyPayment(
      paymentHeader.payload,
      requirements
    );
    
    console.log('📊 Verification result:', verificationResult);

    if (!verificationResult.isValid) {
      // 検証失敗 → 402応答生成
      await this.generate402Response(req, res, x402Config);
      this.config.middleware.onPaymentFailed?.(req, {
        reason: verificationResult.reason,
        verificationResult,
      });
      return { 
        success: false, 
        ...(verificationResult.reason && { reason: verificationResult.reason }),
        verificationResult 
      };
    }

    // 5. 支払い確定
    const settlementResult = await this.settleService.settlePayment(
      verificationResult.paymentId!
    );

    if (!settlementResult.isSettled) {
      // 確定失敗 → 402応答生成
      await this.generate402Response(req, res, x402Config);
      this.config.middleware.onPaymentFailed?.(req, {
        reason: settlementResult.reason,
        settlementResult,
      });
      return { 
        success: false, 
        ...(settlementResult.reason && { reason: settlementResult.reason }),
        verificationResult,
        settlementResult 
      };
    }

    // 6. 成功応答ヘッダー設定
    const responseHeader = HeaderParser.generatePaymentResponseHeader(
      verificationResult.paymentId!,
      'settled'
    );
    res.set('X-PAYMENT-RESPONSE', responseHeader);

    // 7. 成功コールバック
    this.config.middleware.onPaymentVerified?.(req, {
      verificationResult,
      settlementResult,
    });

    X402Middleware.logger.info('Payment processing successful', {
      paymentId: verificationResult.paymentId,
      txHash: paymentHeader.payload.txHash,
      amount: paymentHeader.payload.value,
      url: req.originalUrl,
    });

    return { 
      success: true, 
      ...(verificationResult.paymentId && { paymentId: verificationResult.paymentId }),
      verificationResult,
      settlementResult 
    };
  }

  /**
   * 402応答生成
   */
  private async generate402Response(req: Request, res: Response, x402Config: any): Promise<void> {
    const options = this.config.middleware.customHeaders 
      ? { customHeaders: this.config.middleware.customHeaders }
      : {};
    
    await X402Generator.generatePaymentRequired(req, res, x402Config, options);

    this.config.middleware.onPaymentRequired?.(req, x402Config);
  }

  /**
   * PaymentRequirements構築
   */
  private async buildPaymentRequirements(req: Request, x402Config: any, paymentPayload?: any): Promise<any> {
    console.log('🏗️ buildPaymentRequirements called');
    console.log('📍 Request URL:', req.originalUrl || req.url);
    console.log('⚙️ X402 config:', x402Config);
    console.log('📦 Payment payload provided:', !!paymentPayload);
    
    // PaymentPayloadからnonceを取得（最小限修正）
    const nonce = paymentPayload?.nonce || 'temp-nonce';
    console.log('🔑 Using nonce:', nonce);
    console.log('✅ Nonce source:', paymentPayload?.nonce ? 'PaymentPayload' : 'fallback');
    
    const requirements = {
      scheme: 'https://rfc.x402.org/schemes/eip3009',
      network: x402Config.networkName,
      maxAmountRequired: x402Config.amount,
      asset: x402Config.currency,
      payTo: x402Config.receiverAddress,
      resource: req.originalUrl || req.url,
      nonce: nonce,
      validUntil: new Date(Date.now() + (x402Config.nonceExpirationMs || 900000)).toISOString(),
    };
    
    console.log('📋 Built requirements:', requirements);
    return requirements;
  }

  /**
   * パススキップ判定
   */
  private shouldSkipPath(path: string): boolean {
    const skipPaths = this.config.middleware.skipPaths || [];
    return skipPaths.some(skipPath => {
      if (skipPath.includes('*')) {
        const regex = new RegExp(skipPath.replace(/\*/g, '.*'));
        return regex.test(path);
      }
      return path === skipPath;
    });
  }

  /**
   * Circuit Breaker統計取得
   */
  getCircuitBreakerStats() {
    return this.circuitBreaker.getStats();
  }

  /**
   * 設定更新
   */
  updateConfig(newConfig: Partial<X402MiddlewareConfig>): void {
    this.config = { ...this.config, ...newConfig };
    validateConfig(this.config);

    // サービス設定更新
    if (newConfig.facilitator) {
      this.facilitatorClient.updateConfig(toFacilitatorConfig(this.config));
    }
    if (newConfig.circuitBreaker) {
      this.circuitBreaker.updateConfig(this.config.circuitBreaker!);
    }

    X402Middleware.logger.info('Middleware config updated');
  }
}

/**
 * ファクトリー関数 - 簡単な使用のため
 */
export function createX402Middleware(config: X402MiddlewareConfig) {
  const middleware = new X402Middleware(config);
  return middleware.getMiddleware();
}

/**
 * 環境変数ベースのファクトリー関数
 */
export function createX402MiddlewareFromEnv(overrides: Partial<X402MiddlewareConfig> = {}) {
  const { configFromEnv } = require('./config');
  const envConfig = configFromEnv();
  const finalConfig = { ...envConfig, ...overrides };
  
  return createX402Middleware(finalConfig as X402MiddlewareConfig);
}