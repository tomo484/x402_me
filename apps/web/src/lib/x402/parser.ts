// 402応答パース機能 - X-PAYMENT-REQUIREDヘッダー解析を担当
import type { PaymentRequirements, PaymentPayload } from '@x402/shared';
import type { X402Response } from './types';

export class X402Parser {
  /**
   * 402応答からPaymentRequirementsを抽出
   */
  static parsePaymentRequired(response: Response): PaymentRequirements | null {
    console.log('🔍 X402Parser.parsePaymentRequired called');
    console.log('📊 Response status:', response.status);
    
    if (response.status !== 402) {
      console.log('❌ Status is not 402, returning null');
      return null;
    }

    const paymentRequiredHeader = response.headers.get('X-PAYMENT-REQUIRED');
    console.log('📋 X-PAYMENT-REQUIRED header:', paymentRequiredHeader);
    
    if (!paymentRequiredHeader) {
      console.log('❌ X-PAYMENT-REQUIRED header not found');
      const headers = Array.from(response.headers.entries());
      console.log('📋 Available headers:', headers);
      headers.forEach(([key, value]) => {
        console.log(`  ${key}: ${value}`);
      });
      return null;
    }

    try {
      console.log('🔓 Attempting Base64 decode...');
      // Base64デコード
      const decodedJson = atob(paymentRequiredHeader);
      console.log('📄 Decoded JSON:', decodedJson);
      
      const requirements = JSON.parse(decodedJson) as PaymentRequirements;
      console.log('📦 Parsed requirements:', requirements);
      
      // 基本的な検証
      if (!requirements.scheme || !requirements.nonce || !requirements.payTo) {
        console.warn('❌ Invalid payment requirements format:', {
          scheme: requirements.scheme,
          nonce: requirements.nonce,
          payTo: requirements.payTo
        });
        return null;
      }

      console.log('✅ Payment requirements parsed successfully');
      return requirements;
    } catch (error) {
      console.error('💥 Failed to parse X-PAYMENT-REQUIRED header:', error);
      console.error('📋 Header value was:', paymentRequiredHeader);
      return null;
    }
  }

  /**
   * PaymentPayloadをX-PAYMENTヘッダー形式にエンコード
   */
  static encodePaymentHeader(payload: PaymentPayload): string {
    try {
      const jsonString = JSON.stringify(payload);
      return btoa(jsonString);
    } catch (error) {
      console.error('Failed to encode payment payload:', error);
      throw new Error('Failed to encode payment payload');
    }
  }

  /**
   * X-PAYMENT-RESPONSEヘッダーをパース
   */
  static parsePaymentResponse(response: Response): string | null {
    return response.headers.get('X-PAYMENT-RESPONSE');
  }

  /**
   * 402エラーレスポンスの詳細情報を抽出
   */
  static async parseErrorDetails(response: Response): Promise<{
    message?: string;
    details?: any;
  }> {
    try {
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        const errorData = await response.json();
        return {
          message: errorData.message || errorData.error,
          details: errorData,
        };
      }
    } catch (error) {
      console.warn('Failed to parse error details:', error);
    }

    return {
      message: `HTTP ${response.status}: ${response.statusText}`,
    };
  }

  /**
   * レスポンスをX402Response形式に変換
   */
  static async parseResponse(response: Response): Promise<X402Response> {
    const x402Response: X402Response = {
      status: response.status,
    };

    if (response.status === 402) {
      // 402: Payment Required
      const paymentRequired = this.parsePaymentRequired(response);
      if (paymentRequired) {
        x402Response.paymentRequired = paymentRequired;
      }
      const errorDetails = await this.parseErrorDetails(response);
      if (errorDetails.message) {
        x402Response.error = errorDetails.message;
      }
    } else if (response.status === 200) {
      // 200: 支払い完了
      const paymentResponse = this.parsePaymentResponse(response);
      if (paymentResponse) {
        x402Response.paymentResponse = paymentResponse;
      }
      try {
        const contentType = response.headers.get('content-type');
        if (contentType?.includes('application/json')) {
          x402Response.data = await response.json();
        } else {
          x402Response.data = await response.text();
        }
      } catch (error) {
        console.warn('Failed to parse response data:', error);
      }
    } else {
      // その他のエラー
      const errorDetails = await this.parseErrorDetails(response);
      if (errorDetails.message) {
        x402Response.error = errorDetails.message;
      }
    }

    return x402Response;
  }

  /**
   * X-PAYMENT-REQUIREDヘッダーの検証
   */
  static validatePaymentRequirements(requirements: any): requirements is PaymentRequirements {
    if (!requirements || typeof requirements !== 'object') {
      return false;
    }

    const required = ['scheme', 'network', 'maxAmountRequired', 'asset', 'payTo', 'resource', 'nonce', 'validUntil'];
    return required.every(field => field in requirements && requirements[field] != null);
  }

  /**
   * 支払い要件の有効期限チェック
   */
  static isPaymentRequirementsExpired(requirements: PaymentRequirements): boolean {
    try {
      const validUntil = new Date(requirements.validUntil);
      return Date.now() > validUntil.getTime();
    } catch (error) {
      console.warn('Invalid validUntil format:', requirements.validUntil);
      return true; // 不正な形式は期限切れとして扱う
    }
  }

  /**
   * 支払い要件の表示用フォーマット
   */
  static formatPaymentRequirements(requirements: PaymentRequirements): {
    amount: string;
    currency: string;
    network: string;
    recipient: string;
    expires: string;
    resource: string;
  } {
    return {
      amount: requirements.maxAmountRequired,
      currency: requirements.asset,
      network: requirements.network,
      recipient: requirements.payTo,
      expires: new Date(requirements.validUntil).toLocaleString('ja-JP'),
      resource: requirements.resource,
    };
  }

  /**
   * エラーレスポンスの分類
   */
  static classifyError(response: X402Response): 'network' | 'payment_required' | 'validation' | 'server' | 'unknown' {
    if (response.status === 0) {
      return 'network';
    }
    
    if (response.status === 402) {
      return 'payment_required';
    }
    
    if (response.status >= 400 && response.status < 500) {
      return 'validation';
    }
    
    if (response.status >= 500) {
      return 'server';
    }
    
    return 'unknown';
  }
} 