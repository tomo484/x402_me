// packages/x402-mw/src/core/payment/header-parser.ts
import { Request } from 'express';
import { PaymentPayload, PaymentPayloadSchema } from '@x402/shared';
import winston from 'winston';

export interface ParsedPaymentHeader {
  payload: PaymentPayload;
  rawHeader: string;
  isValid: boolean;
  errors?: string[];
}

/**
 * X-PAYMENT ヘッダーパース機能
 */
export class HeaderParser {
  private static logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
  });

  /**
   * X-PAYMENT ヘッダーをパースして PaymentPayload に変換
   */
  static parsePaymentHeader(req: Request): ParsedPaymentHeader | null {
    const paymentHeader = req.get('X-PAYMENT');
    
    if (!paymentHeader) {
      return null;
    }

    try {
      // Base64デコード
      const decodedJson = Buffer.from(paymentHeader, 'base64').toString('utf-8');
      const payloadData = JSON.parse(decodedJson);

      // スキーマ検証
      const validationResult = PaymentPayloadSchema.safeParse(payloadData);
      
      if (!validationResult.success) {
        const errors = validationResult.error.issues.map(issue => 
          `${issue.path.join('.')}: ${issue.message}`
        );
        
        this.logger.warn('Invalid X-PAYMENT header format', {
          errors,
          rawHeader: paymentHeader.substring(0, 100), // ログに一部だけ記録
        });

        return {
          payload: payloadData,
          rawHeader: paymentHeader,
          isValid: false,
          errors,
        };
      }

      this.logger.info('X-PAYMENT header parsed successfully', {
        txHash: validationResult.data.txHash,
        from: validationResult.data.from,
        nonce: validationResult.data.nonce,
      });

      return {
        payload: validationResult.data,
        rawHeader: paymentHeader,
        isValid: true,
      };

    } catch (error) {
      this.logger.error('Failed to parse X-PAYMENT header', {
        error: error instanceof Error ? error.message : 'Unknown error',
        rawHeader: paymentHeader.substring(0, 100),
      });

      return {
        payload: {} as PaymentPayload, // エラー時は空オブジェクト
        rawHeader: paymentHeader,
        isValid: false,
        errors: ['Failed to parse or decode X-PAYMENT header'],
      };
    }
  }

  /**
   * リクエストに有効な支払い情報が含まれているかチェック
   */
  static hasValidPayment(req: Request): boolean {
    const parsed = this.parsePaymentHeader(req);
    return parsed !== null && parsed.isValid;
  }

  /**
   * 特定のnonceに対応する支払い情報を取得
   */
  static getPaymentForNonce(req: Request, expectedNonce: string): PaymentPayload | null {
    const parsed = this.parsePaymentHeader(req);
    
    if (!parsed || !parsed.isValid) {
      return null;
    }

    if (parsed.payload.nonce !== expectedNonce) {
      this.logger.warn('Nonce mismatch in payment header', {
        expectedNonce,
        receivedNonce: parsed.payload.nonce,
        txHash: parsed.payload.txHash,
      });
      return null;
    }

    return parsed.payload;
  }

  /**
   * X-PAYMENT-RESPONSE ヘッダー生成
   */
  static generatePaymentResponseHeader(paymentId: string, status: 'verified' | 'settled' | 'failed'): string {
    const responseData = {
      paymentId,
      status,
      timestamp: new Date().toISOString(),
    };

    return Buffer.from(JSON.stringify(responseData)).toString('base64');
  }
}