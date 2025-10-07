// packages/x402-mw/src/facilitator/types.ts
import { PaymentPayload, PaymentRequirements, PaymentRequirementsSchema } from '@x402/shared';

/**
 * Facilitator API設定
 */
export interface FacilitatorConfig {
  apiUrl: string; // 例: "https://api.developer.coinbase.com"
  apiKey: string; // Base64エンコードされたAPIキー
  timeout?: number; // デフォルト: 30秒
  retryAttempts?: number; // デフォルト: 3回
}

/**
 * Facilitator API 共通レスポンス
 */
export interface FacilitatorResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}

/**
 * POST /v2/x402/verify リクエスト
 */
export interface VerifyRequest {
  paymentPayload: PaymentPayload;
  requirements: PaymentRequirements;
}

/**
 * POST /v2/x402/verify レスポンス
 */
export interface VerifyResponse {
  valid: boolean;
  paymentId: string;
  reason?: 'insufficient_amount' | 'invalid_signature' | 'network_mismatch' | 'expired_nonce' | 'other';
  blockNumber?: number;
  confirmations?: number;
  gasUsed?: string;
}

/**
 * POST /v2/x402/settle リクエスト
 */
export interface SettleRequest {
  paymentId: string;
  finalAmount?: string; // 実際の決済額（オプション）
}

/**
 * POST /v2/x402/settle レスポンス
 */
export interface SettleResponse {
  settled: boolean;
  finalAmount: string;
  settleTime: string;
  receipts?: {
    paymentReceipt: string;
    facilitatorFee?: string;
    networkFee?: string;
  };
}

/**
 * Facilitator エラー種別
 */
export type FacilitatorErrorType = 
  | 'network_error'
  | 'api_key_invalid'
  | 'rate_limit'
  | 'validation_error'
  | 'insufficient_funds'
  | 'timeout'
  | 'unknown';

/**
 * Circuit Breaker 状態
 */
export type CircuitBreakerState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

/**
 * Circuit Breaker 統計
 */
export interface CircuitBreakerStats {
  state: CircuitBreakerState;
  failureCount: number;
  successCount: number;
  nextAttempt?: Date;
  lastFailure?: Date;
}