// packages/x402-mw/src/facilitator/facilitator-client.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import winston from 'winston';
import { CDPJwtUtils } from './jwt-utils';
import { 
  FacilitatorConfig, 
  FacilitatorResponse, 
  FacilitatorErrorType,
  VerifyRequest,
  VerifyResponse,
  SettleRequest,
  SettleResponse
} from './types';

/**
 * CDP Facilitator API クライアント
 */
export class FacilitatorClient {
  private static logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
  });

  private axiosInstance: AxiosInstance;
  private config: FacilitatorConfig;

  constructor(config: FacilitatorConfig) {
    this.config = {
      timeout: 30000, // 30秒
      retryAttempts: 3,
      ...config,
    };

    // 初期設定（JWTは後で動的に生成）
    this.axiosInstance = axios.create({
      baseURL: this.config.apiUrl,
      ...(this.config.timeout && { timeout: this.config.timeout }),
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'x402-middleware/1.0.0',
      },
    });

    // リクエスト/レスポンスインターセプター設定
    this.setupInterceptors();
  }

  /**
   * 支払い検証API呼び出し
   */
  async verify(request: VerifyRequest): Promise<FacilitatorResponse<VerifyResponse>> {
    try {
      // JWT動的生成（CDP SDK使用）
      const jwtToken = await this.generateJWT();
      
      console.log('🔍 Facilitator API Debug - CDP SDK使用:');
      console.log('📍 Base URL:', this.axiosInstance.defaults.baseURL);
      console.log('🔗 Full URL:', `${this.axiosInstance.defaults.baseURL}/v2/x402/verify`);
      console.log('🔑 Generated JWT preview:', jwtToken.substring(0, 50) + '...');
      
      // リクエストペイロードの確認
      console.log('📦 Request payload:', JSON.stringify(request, null, 2));

      FacilitatorClient.logger.info('Calling Facilitator verify API', {
        nonce: request.paymentPayload.nonce,
        txHash: request.paymentPayload.txHash,
        amount: request.requirements.maxAmountRequired,
      });

      const response = await this.axiosInstance.post<VerifyResponse>('/v2/x402/verify', request, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        }
      });
      
      return {
        success: true,
        data: response.data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      // 型安全なエラーハンドリング
      const axiosError = error as AxiosError;
      
      console.log('❌ API Call Failed - 詳細エラー分析:');
      console.log('📊 Error type:', axiosError?.constructor?.name);
      console.log('📊 Error message:', axiosError?.message);
      console.log('📊 HTTP Status:', axiosError?.response?.status);
      console.log('📊 HTTP Status Text:', axiosError?.response?.statusText);
      console.log('📊 Response Headers:', axiosError?.response?.headers);
      console.log('📊 Response Data:', axiosError?.response?.data);
      console.log('📊 Request Config:', {
        url: axiosError?.config?.url,
        method: axiosError?.config?.method,
        headers: axiosError?.config?.headers,
        baseURL: axiosError?.config?.baseURL
      });
      
      // 認証関連エラーの特定
      if (axiosError?.response?.status === 401) {
        console.log('🔐 Authentication Error Detected!');
        console.log('🔐 Current auth header:', axiosError?.config?.headers?.Authorization);
        console.log('🔐 Current X-CC-Api-Key:', axiosError?.config?.headers?.['X-CC-Api-Key']);
      }
      
      // 404エラーの詳細分析
      if (axiosError?.response?.status === 404) {
        console.log('🔍 404 Error Analysis:');
        console.log('🔍 Requested URL:', axiosError?.config?.url);
        console.log('🔍 Base URL:', axiosError?.config?.baseURL);
        console.log('🔍 Full URL:', `${axiosError?.config?.baseURL}${axiosError?.config?.url}`);
        console.log('🔍 Method:', axiosError?.config?.method);
        console.log('🔍 Response body:', axiosError?.response?.data);
        
        // 404の可能性分析
        console.log('🤔 404 Error Possible Causes:');
        console.log('1️⃣ Endpoint does not exist (/v2/x402/verify)');
        console.log('2️⃣ Authentication required but invalid (JWT signature issue)');
        console.log('3️⃣ API Key type mismatch (using wrong key type)');
        console.log('4️⃣ Base URL incorrect (should be different subdomain?)');
        console.log('5️⃣ API version issue (v2 vs v1 or different version)');
        
        // Cloudflareの情報確認
        const cfRay = axiosError?.response?.headers?.['cf-ray'];
        if (cfRay) {
          console.log('☁️ Cloudflare Ray ID:', cfRay);
          console.log('☁️ Request reached Cloudflare but not backend service');
        }
      }
      
      return this.handleError('verify', axiosError);
    }
  }

  /**
   * 支払い確定API呼び出し
   */
  async settle(request: SettleRequest): Promise<FacilitatorResponse<SettleResponse>> {
    try {
      FacilitatorClient.logger.info('Calling Facilitator settle API', {
        paymentId: request.paymentId,
        finalAmount: request.finalAmount,
      });

      const response = await this.axiosInstance.post<SettleResponse>('/v2/x402/settle', request);
      
      return {
        success: true,
        data: response.data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return this.handleError('settle', error as AxiosError);
    }
  }

  /**
   * ヘルスチェック
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.axiosInstance.get('/health');
      return response.status === 200;
    } catch (error) {
      FacilitatorClient.logger.warn('Facilitator health check failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      return false;
    }
  }

  /**
   * エラーハンドリング
   */
  private handleError(operation: string, error: AxiosError | any): FacilitatorResponse {
    const errorType = this.classifyError(error);
    const errorMessage = error.response?.data?.message || error.message || 'Unknown error';

    FacilitatorClient.logger.error(`Facilitator ${operation} API error`, {
      errorType,
      statusCode: error.response?.status,
      message: errorMessage,
      apiUrl: this.config.apiUrl,
    });

    return {
      success: false,
      error: {
        code: errorType,
        message: errorMessage,
        details: {
          statusCode: error.response?.status,
          responseData: error.response?.data,
        },
      },
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * エラー分類
   */
  private classifyError(error: AxiosError | any): FacilitatorErrorType {
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
      return 'timeout';
    }

    if (!error.response) {
      return 'network_error';
    }

    const statusCode = error.response.status;
    
    if (statusCode === 401) return 'api_key_invalid';
    if (statusCode === 429) return 'rate_limit';
    if (statusCode >= 400 && statusCode < 500) return 'validation_error';
    if (statusCode >= 500) return 'network_error';

    return 'unknown';
  }

  /**
   * リクエスト/レスポンスインターセプター設定
   */
  private setupInterceptors(): void {
    // リクエストログ
    this.axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      FacilitatorClient.logger.debug('Facilitator API Request', {
        method: config.method?.toUpperCase(),
        url: config.url,
        headers: { ...config.headers, Authorization: '[REDACTED]' },
      });
      return config;
    });

    // レスポンスログ
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        FacilitatorClient.logger.debug('Facilitator API Response', {
          status: response.status,
          url: response.config.url,
          responseTime: response.headers['x-response-time'],
        });
        return response;
      },
      (error: AxiosError) => {
        // エラーレスポンスもログに記録
        if (error.response) {
          FacilitatorClient.logger.warn('Facilitator API Error Response', {
            status: error.response.status,
            url: error.config?.url,
            data: error.response.data,
          });
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * JWT生成（非同期）
   */
  private async generateJWT(): Promise<string> {
    console.log('🔐 FacilitatorClient JWT generation');
    
    const apiSecret = process.env.X402_FACILITATOR_API_SECRET || process.env.CDP_API_SECRET;
    const apiKeyId = process.env.CDP_API_KEY_ID || this.config.apiKey;
    
    if (!apiSecret) {
      console.error('❌ API Secret not found in environment variables');
      throw new Error('CDP_API_SECRET or X402_FACILITATOR_API_SECRET environment variable is required');
    }
    
    if (!apiKeyId) {
      console.error('❌ API Key ID not found');
      throw new Error('CDP_API_KEY_ID environment variable is required');
    }
    
    console.log('✅ API Secret found in environment');
    console.log('✅ API Key ID found in environment');
    
    return await CDPJwtUtils.generateJWT(apiKeyId, apiSecret, 'POST', '/platform/v2/x402/verify');
  }

  /**
   * 設定の更新
   */
  updateConfig(newConfig: Partial<FacilitatorConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    // 新しい設定でaxiosインスタンスを再作成
    if (newConfig.apiUrl || newConfig.apiKey || newConfig.timeout) {
      const jwtToken = this.generateJWT();
      
      this.axiosInstance = axios.create({
        baseURL: this.config.apiUrl,
        ...(this.config.timeout && { timeout: this.config.timeout }),
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
          'User-Agent': 'x402-middleware/1.0.0',
        },
      });
      this.setupInterceptors();
    }
  }
}