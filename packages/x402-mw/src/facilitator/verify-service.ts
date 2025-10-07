// packages/x402-mw/src/facilitator/verify-service.ts
import { PaymentPayload, PaymentRequirements } from '@x402/shared';
import { NonceManager } from '../cache/nonce-manager';
import { FacilitatorClient } from './facilitator-client';
import { CircuitBreaker } from './circuit-breaker';
import { VerifyRequest, VerifyResponse, FacilitatorResponse } from './types';
import winston from 'winston';

export interface PaymentVerificationResult {
  isValid: boolean;
  paymentId?: string;
  reason?: string;
  facilitatorResponse?: FacilitatorResponse<VerifyResponse>;
  blockNumber?: number;
  confirmations?: number;
}

/**
 * 支払い検証サービス
 */
export class VerifyService {
  private static logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
  });

  private facilitatorClient: FacilitatorClient;
  private circuitBreaker: CircuitBreaker;

  constructor(facilitatorClient: FacilitatorClient, circuitBreaker: CircuitBreaker) {
    this.facilitatorClient = facilitatorClient;
    this.circuitBreaker = circuitBreaker;
  }

  /**
   * 支払い情報を検証
   */
  async verifyPayment(
    paymentPayload: PaymentPayload,
    requirements: PaymentRequirements
  ): Promise<PaymentVerificationResult> {
    try {
      // 1. 基本検証
      const basicValidation = await this.performBasicValidation(paymentPayload, requirements);
      if (!basicValidation.isValid) {
        return basicValidation;
      }

      // 2. Nonce検証
      const nonceValidation = await this.validateNonce(paymentPayload, requirements);
      if (!nonceValidation.isValid) {
        return nonceValidation;
      }

      // 3. Facilitator API検証（Circuit Breaker経由）
      const facilitatorValidation = await this.callFacilitatorWithCircuitBreaker(
        paymentPayload,
        requirements
      );

      if (!facilitatorValidation.isValid) {
        return facilitatorValidation;
      }

      // 4. Nonce使用済みマーク
      if (facilitatorValidation.paymentId) {
        await NonceManager.validateEnhancedNonce(
          paymentPayload.from,
          paymentPayload.nonce
        );
      }

      VerifyService.logger.info('Payment verification successful', {
        paymentId: facilitatorValidation.paymentId,
        txHash: paymentPayload.txHash,
        from: paymentPayload.from,
        amount: paymentPayload.value,
      });

      return facilitatorValidation;

    } catch (error) {
      VerifyService.logger.error('Payment verification failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
        txHash: paymentPayload.txHash,
        nonce: paymentPayload.nonce,
      });

      return {
        isValid: false,
        reason: 'verification_error',
      };
    }
  }

  /**
   * 基本検証（ローカル）
   */
  private async performBasicValidation(
    paymentPayload: PaymentPayload,
    requirements: PaymentRequirements
  ): Promise<PaymentVerificationResult> {
    // スキーム一致チェック
    if (paymentPayload.scheme !== requirements.scheme) {
      return {
        isValid: false,
        reason: 'scheme_mismatch',
      };
    }

    // アセット一致チェック
    if (paymentPayload.asset !== requirements.asset) {
      return {
        isValid: false,
        reason: 'asset_mismatch',
      };
    }

    // 受取アドレス一致チェック
    if (paymentPayload.to.toLowerCase() !== requirements.payTo.toLowerCase()) {
      return {
        isValid: false,
        reason: 'recipient_mismatch',
      };
    }

    // 金額チェック
    const paymentAmount = BigInt(paymentPayload.value);
    const requiredAmount = BigInt(requirements.maxAmountRequired);
    
    if (paymentAmount < requiredAmount) {
      return {
        isValid: false,
        reason: 'insufficient_amount',
      };
    }

    // 有効期限チェック
    const validUntil = new Date(requirements.validUntil);
    const now = new Date();
    
    if (now > validUntil) {
      return {
        isValid: false,
        reason: 'payment_expired',
      };
    }

    return { isValid: true };
  }

  /**
   * Nonce検証
   */
  private async validateNonce(
    paymentPayload: PaymentPayload,
    requirements: PaymentRequirements
  ): Promise<PaymentVerificationResult> {
    console.log('🔍 Nonce validation details:');
    console.log('📦 Payment payload nonce:', paymentPayload.nonce);
    console.log('📋 Requirements nonce:', requirements.nonce);
    console.log('🔄 Nonces match:', paymentPayload.nonce === requirements.nonce);
    
    // Nonce一致チェック
    if (paymentPayload.nonce !== requirements.nonce) {
      console.log('❌ Nonce mismatch detected!');
      console.log('📦 Expected (from payload):', paymentPayload.nonce);
      console.log('📋 Received (from requirements):', requirements.nonce);
      return {
        isValid: false,
        reason: 'nonce_mismatch',
      };
    }
    
    console.log('✅ Nonce validation passed!');
    console.log('🔑 Validated nonce:', paymentPayload.nonce);

    // Nonce使用済みチェック
    const isUsed = await NonceManager.isNonceUsed(paymentPayload.from, paymentPayload.nonce);
    if (isUsed) {
      return {
        isValid: false,
        reason: 'nonce_already_used',
      };
    }

    return { isValid: true };
  }

  /**
   * Circuit Breaker経由でFacilitator API呼び出し
   */
  private async callFacilitatorWithCircuitBreaker(
    paymentPayload: PaymentPayload,
    requirements: PaymentRequirements
  ): Promise<PaymentVerificationResult> {
    const verifyRequest: VerifyRequest = {
      paymentPayload,
      requirements,
    };

    const result = await this.circuitBreaker.execute(async () => {
      const response = await this.facilitatorClient.verify(verifyRequest);
      
      if (!response.success) {
        throw new Error(`Facilitator verification failed: ${response.error?.message}`);
      }

      return response;
    });

    if (!result.success) {
      return {
        isValid: false,
        reason: 'facilitator_error',
        facilitatorResponse: result as FacilitatorResponse<VerifyResponse>,
      };
    }

    const verifyData = result.data;
    if (!verifyData?.valid) {
      return {
        isValid: false,
        reason: verifyData?.reason || 'facilitator_rejected',
        facilitatorResponse: result,
      };
    }

    return {
      isValid: true,
      paymentId: verifyData.paymentId,
      facilitatorResponse: result,
      ...(verifyData.blockNumber !== undefined && { blockNumber: verifyData.blockNumber }),
      ...(verifyData.confirmations !== undefined && { confirmations: verifyData.confirmations }),
    };
  }

  /**
   * バッチ検証（複数の支払いを一度に検証）
   */
  async verifyBatch(
    payments: Array<{ payload: PaymentPayload; requirements: PaymentRequirements }>
  ): Promise<PaymentVerificationResult[]> {
    const results = await Promise.allSettled(
      payments.map(({ payload, requirements }) => 
        this.verifyPayment(payload, requirements)
      )
    );

    return results.map(result => 
      result.status === 'fulfilled' 
        ? result.value 
        : { isValid: false, reason: 'batch_verification_error' }
    );
  }
}