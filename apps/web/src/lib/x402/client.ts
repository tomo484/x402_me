// x402クライアントライブラリ - 402応答処理とAPI通信を担当
import type { PaymentRequirements, PaymentPayload } from '@x402/shared';
import type { X402ClientConfig, X402Response, PaymentResult } from './types';
import { X402Parser } from './parser';

export class X402Client {
  private config: X402ClientConfig;

  constructor(config: X402ClientConfig) {
    this.config = {
      timeout: 10000,
      retryCount: 3,
      ...config,
    };
  }

  /**
   * 保護されたリソースにアクセス（支払いフロー付き）
   */
  async accessResource(
    path: string,
    options: {
      method?: string;
      headers?: Record<string, string>;
      body?: any;
      paymentPayload?: PaymentPayload;
    } = {}
  ): Promise<X402Response> {
    const { method = 'GET', headers = {}, body, paymentPayload } = options;

    // X-PAYMENTヘッダー追加（支払い情報がある場合）
    if (paymentPayload) {
      const encodedPayment = X402Parser.encodePaymentHeader(paymentPayload);
      headers['X-PAYMENT'] = encodedPayment;
      console.log('💳 Adding X-PAYMENT header');
      console.log('📦 Payment payload:', paymentPayload);
      console.log('🔐 Encoded header:', encodedPayment);
    } else {
      console.log('❌ No payment payload provided');
    }

    try {
      const fetchOptions: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        signal: AbortSignal.timeout(this.config.timeout!),
      };

      if (body) {
        fetchOptions.body = JSON.stringify(body);
      }

      console.log('🌐 Fetch request details:');
      console.log('📍 URL:', `${this.config.apiBaseUrl}${path}`);
      console.log('🔧 Method:', method);
      console.log('📋 Headers:', fetchOptions.headers);
      console.log('📦 Body:', fetchOptions.body);

      const response = await fetch(`${this.config.apiBaseUrl}${path}`, fetchOptions);

      return await X402Parser.parseResponse(response);
    } catch (error) {
      console.error('X402 request failed:', error);
      return {
        status: 0,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  /**
   * 支払いフローを自動実行
   */
  async executePaymentFlow(
    path: string,
    signPayment: (requirements: PaymentRequirements) => Promise<PaymentPayload>,
    options: {
      method?: string;
      headers?: Record<string, string>;
      body?: any;
    } = {}
  ): Promise<PaymentResult> {
    try {
      console.log('🌐 X402Client.executePaymentFlow started');
      console.log('📍 Request path:', path);
      console.log('🔧 API base URL:', this.config.apiBaseUrl);
      
      // 1. 初回リクエスト（402応答を期待）
      console.log('📤 Sending initial request...');
      const initialResponse = await this.accessResource(path, options);
      console.log('📥 Initial response:', initialResponse);

      if (initialResponse.status === 200) {
        // 既に支払い済み
        const result: PaymentResult = {
          success: true,
          data: initialResponse.data,
        };
        if (initialResponse.paymentResponse) {
          result.paymentResponse = initialResponse.paymentResponse;
        }
        return result;
      }

      if (initialResponse.status !== 402 || !initialResponse.paymentRequired) {
        // 402以外のエラー
        return {
          success: false,
          error: initialResponse.error || `HTTP ${initialResponse.status}`,
        };
      }

      // 2. 支払い要件の有効期限チェック
      if (X402Parser.isPaymentRequirementsExpired(initialResponse.paymentRequired)) {
        return {
          success: false,
          error: 'Payment requirements have expired',
        };
      }

      // 3. 支払い署名作成
      console.log('✍️ Creating payment signature...');
      const paymentPayload = await signPayment(initialResponse.paymentRequired);
      console.log('📦 Payment payload created:', paymentPayload);

      // 4. 支払い情報付きで再リクエスト
      console.log('📤 Sending payment request...');
      const paymentResponse = await this.accessResource(path, {
        ...options,
        paymentPayload,
      });
      console.log('📥 Payment response:', paymentResponse);

      if (paymentResponse.status === 200) {
        const result: PaymentResult = {
          success: true,
          data: paymentResponse.data,
        };
        if (paymentResponse.paymentResponse) {
          result.paymentResponse = paymentResponse.paymentResponse;
        }
        return result;
      }

      return {
        success: false,
        error: paymentResponse.error || `Payment failed: HTTP ${paymentResponse.status}`,
      };

    } catch (error) {
      console.error('Payment flow failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment flow error',
      };
    }
  }

  /**
   * リトライ機能付きリクエスト
   */
  async requestWithRetry(
    path: string,
    options: {
      method?: string;
      headers?: Record<string, string>;
      body?: any;
      paymentPayload?: PaymentPayload;
      retryCount?: number;
    } = {}
  ): Promise<X402Response> {
    const maxRetries = options.retryCount ?? this.config.retryCount ?? 3;
    let lastError: string = '';

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response = await this.accessResource(path, options);
        
        // 成功またはクライアントエラー（4xx）の場合はリトライしない
        if (response.status === 200 || response.status === 402 || 
            (response.status >= 400 && response.status < 500)) {
          return response;
        }

        // サーバーエラー（5xx）またはネットワークエラーの場合はリトライ
        if (attempt < maxRetries) {
          const delay = Math.min(1000 * Math.pow(2, attempt), 5000); // 指数バックオフ（最大5秒）
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }

        lastError = response.error || `HTTP ${response.status}`;
      } catch (error) {
        lastError = error instanceof Error ? error.message : 'Network error';
        
        if (attempt < maxRetries) {
          const delay = Math.min(1000 * Math.pow(2, attempt), 5000);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
      }
    }

    return {
      status: 0,
      error: `Max retries (${maxRetries}) exceeded. Last error: ${lastError}`,
    };
  }

  /**
   * 複数リソースへの並行アクセス
   */
  async accessMultipleResources(
    requests: Array<{
      path: string;
      method?: string;
      headers?: Record<string, string>;
      body?: any;
      paymentPayload?: PaymentPayload;
    }>
  ): Promise<X402Response[]> {
    const promises = requests.map(request => 
      this.accessResource(request.path, request)
    );

    return Promise.allSettled(promises).then(results =>
      results.map(result => 
        result.status === 'fulfilled' 
          ? result.value 
          : { status: 0, error: 'Request failed' }
      )
    );
  }

  /**
   * ヘルスチェック
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.apiBaseUrl}/healthz`, {
        method: 'GET',
        signal: AbortSignal.timeout(5000),
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * API設定の更新
   */
  updateConfig(newConfig: Partial<X402ClientConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * 現在の設定を取得
   */
  getConfig(): X402ClientConfig {
    return { ...this.config };
  }

  /**
   * 支払い要件の事前検証
   */
  async validatePaymentRequirements(path: string): Promise<{
    valid: boolean;
    requirements?: PaymentRequirements;
    error?: string;
  }> {
    try {
      const response = await this.accessResource(path);
      
      if (response.status === 402 && response.paymentRequired) {
        const isExpired = X402Parser.isPaymentRequirementsExpired(response.paymentRequired);
        const result: { valid: boolean; requirements?: PaymentRequirements; error?: string } = {
          valid: !isExpired,
          requirements: response.paymentRequired,
        };
        if (isExpired) {
          result.error = 'Payment requirements expired';
        }
        return result;
      }

      if (response.status === 200) {
        return {
          valid: true,
          error: 'Resource is already accessible',
        };
      }

      return {
        valid: false,
        error: response.error || `HTTP ${response.status}`,
      };
    } catch (error) {
      return {
        valid: false,
        error: error instanceof Error ? error.message : 'Validation failed',
      };
    }
  }
}

// デフォルトクライアントインスタンス
export const x402Client = new X402Client({
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001',
});

// 便利な関数エクスポート
export const createX402Client = (config: X402ClientConfig) => new X402Client(config);

export const quickAccess = async (
  path: string, 
  signPayment: (requirements: PaymentRequirements) => Promise<PaymentPayload>
): Promise<PaymentResult> => {
  return x402Client.executePaymentFlow(path, signPayment);
}; 