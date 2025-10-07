// packages/x402-mw/src/facilitator/settle-service.ts
import { FacilitatorClient } from './facilitator-client';
import { CircuitBreaker } from './circuit-breaker';
import { SettleRequest, SettleResponse, FacilitatorResponse } from './types';
import winston from 'winston';

export interface PaymentSettlementResult {
  isSettled: boolean;
  paymentId: string;
  finalAmount?: string;
  settleTime?: string;
  receipts?: {
    paymentReceipt: string;
    facilitatorFee?: string;
    networkFee?: string;
  };
  facilitatorResponse?: FacilitatorResponse<SettleResponse>;
  reason?: string;
}

/**
 * 支払い確定サービス
 */
export class SettleService {
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
   * 支払いを確定
   */
  async settlePayment(
    paymentId: string,
    finalAmount?: string
  ): Promise<PaymentSettlementResult> {
    try {
      SettleService.logger.info('Starting payment settlement', {
        paymentId,
        finalAmount,
      });

      const settleRequest: SettleRequest = {
        paymentId,
        ...(finalAmount !== undefined && { finalAmount }),
      };

      // Circuit Breaker経由でFacilitator API呼び出し
      const result = await this.circuitBreaker.execute(async () => {
        const response = await this.facilitatorClient.settle(settleRequest);
        
        if (!response.success) {
          throw new Error(`Facilitator settlement failed: ${response.error?.message}`);
        }

        return response;
      });

      if (!result.success) {
        SettleService.logger.error('Payment settlement failed', {
          paymentId,
          error: result.error?.message,
        });

        return {
          isSettled: false,
          paymentId,
          reason: 'facilitator_error',
          facilitatorResponse: result as FacilitatorResponse<SettleResponse>,
        };
      }

      const settleData = result.data;
      if (!settleData?.settled) {
        return {
          isSettled: false,
          paymentId,
          reason: 'settlement_rejected',
          facilitatorResponse: result,
        };
      }

      SettleService.logger.info('Payment settlement successful', {
        paymentId,
        finalAmount: settleData.finalAmount,
        settleTime: settleData.settleTime,
      });

      return {
        isSettled: true,
        paymentId,
        finalAmount: settleData.finalAmount,
        settleTime: settleData.settleTime,
        ...(settleData.receipts !== undefined && { receipts: settleData.receipts }),
        facilitatorResponse: result,
      };

    } catch (error) {
      SettleService.logger.error('Payment settlement error', {
        error: error instanceof Error ? error.message : 'Unknown error',
        paymentId,
      });

      return {
        isSettled: false,
        paymentId,
        reason: 'settlement_error',
      };
    }
  }

  /**
   * バッチ確定（複数の支払いを一度に確定）
   */
  async settleBatch(
    settlements: Array<{ paymentId: string; finalAmount?: string }>
  ): Promise<PaymentSettlementResult[]> {
    const results = await Promise.allSettled(
      settlements.map(({ paymentId, finalAmount }) => 
        this.settlePayment(paymentId, finalAmount)
      )
    );

    return results.map(result => 
      result.status === 'fulfilled' 
        ? result.value 
        : { 
            isSettled: false, 
            paymentId: 'unknown', 
            reason: 'batch_settlement_error' 
          }
    );
  }

  /**
   * 支払い状態確認
   */
  async getPaymentStatus(paymentId: string): Promise<{
    exists: boolean;
    status?: 'pending' | 'verified' | 'settled' | 'failed';
    amount?: string;
    lastUpdated?: string;
  }> {
    try {
      // TODO: Facilitator APIに状態確認エンドポイントがある場合に実装
      // 現在は簡易実装
      return {
        exists: true,
        status: 'pending',
      };
    } catch (error) {
      SettleService.logger.error('Payment status check failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
        paymentId,
      });

      return {
        exists: false,
      };
    }
  }
}