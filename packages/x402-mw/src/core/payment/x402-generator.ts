// packages/x402-mw/src/core/payment/x402-generator.ts
import { Request, Response } from 'express';
import { PaymentRequirements, PaymentRequirementsSchema } from '@x402/shared';
import { NonceManager } from '../../cache/nonce-manager';
import winston from 'winston';

export interface X402Config {
  amount: string; // wei単位
  currency: string; // "USDC", "ETH", etc.
  decimals: number;
  networkName: string; // "base-sepolia", "base-mainnet"
  chainId: number;
  receiverAddress: string;
  facilitatorApiUrl: string;
  nonceExpirationMs?: number; // デフォルト: 15分
}

export interface X402GeneratorOptions {
  resource?: string; // 自動検出されない場合の手動指定
  skipNonceGeneration?: boolean; // テスト用
  customHeaders?: Record<string, string>;
}

/**
 * x402 Payment Required 応答生成器
 */
export class X402Generator {
  private static logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
  });

  /**
   * 402 Payment Required 応答を生成
   */
  static async generatePaymentRequired(
    req: Request,
    res: Response,
    config: X402Config,
    options: X402GeneratorOptions = {}
  ): Promise<void> {
    try {
      // リソースパスの決定
      const resource = options.resource || req.originalUrl || req.url;
      
      // nonce生成（スキップ指定がない場合）
      let nonce: string;
      if (options.skipNonceGeneration) {
        nonce = 'test-nonce-' + Date.now();
      } else {
        nonce = NonceManager.generateNonce();
      }

      // 有効期限設定
      const expiresAt = new Date(
        Date.now() + (config.nonceExpirationMs || 15 * 60 * 1000)
      ).toISOString();

      // PaymentRequirements構築
      const paymentRequirements: PaymentRequirements = {
        scheme: 'https://rfc.x402.org/schemes/eip3009',
        network: config.networkName,
        maxAmountRequired: config.amount,
        asset: config.currency,
        payTo: config.receiverAddress,
        resource,
        nonce,
        validUntil: expiresAt,
      };

      // X-PAYMENT-REQUIRED ヘッダー値作成 (Base64エンコードしたJSON)
      const paymentRequiredHeader = Buffer.from(
        JSON.stringify(paymentRequirements)
      ).toString('base64');

      // 402応答ヘッダー設定
      res.status(402);
      res.set('X-PAYMENT-REQUIRED', paymentRequiredHeader);
      res.set('Content-Type', 'application/json');
      
      // カスタムヘッダー追加
      if (options.customHeaders) {
        Object.entries(options.customHeaders).forEach(([key, value]) => {
          res.set(key, value);
        });
      }

      // 402応答ボディ
      const responseBody = {
        error: 'payment_required',
        message: 'Payment required to access this resource',
        payment_required: paymentRequirements,
        timestamp: new Date().toISOString(),
      };

      // ログ記録
      this.logger.info('402 Payment Required generated', {
        resource,
        nonce,
        amount: config.amount,
        currency: config.currency,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
      });

      res.json(responseBody);
    } catch (error) {
      this.logger.error('Failed to generate 402 response', {
        error: error instanceof Error ? error.message : 'Unknown error',
        resource: options.resource || req.originalUrl,
      });
      
      // 500エラーにフォールバック
      res.status(500).json({
        error: 'internal_server_error',
        message: 'Failed to generate payment requirement',
        timestamp: new Date().toISOString(),
      });
    }
  }

  /**
   * PaymentRequirements検証
   */
  static validatePaymentRequirements(requirements: unknown): PaymentRequirements {
    try {
      return PaymentRequirementsSchema.parse(requirements);
    } catch (error) {
      throw new Error('Invalid payment requirements format');
    }
  }
}