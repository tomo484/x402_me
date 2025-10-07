// x402クライアント専用型定義
import type { PaymentRequirements, PaymentPayload } from '@x402/shared';

export interface X402Response {
  status: number;
  data?: any;
  paymentRequired?: PaymentRequirements;
  paymentResponse?: string;
  error?: string;
}

export interface PaymentFlowState {
  step: 'idle' | 'payment_required' | 'signing' | 'verifying' | 'completed' | 'failed';
  requirements?: PaymentRequirements;
  payload?: PaymentPayload;
  error?: string;
  txHash?: string;
}

export interface X402ClientConfig {
  apiBaseUrl: string;
  timeout?: number;
  retryCount?: number;
}

export interface PaymentResult {
  success: boolean;
  data?: any;
  paymentResponse?: string;
  error?: string;
} 