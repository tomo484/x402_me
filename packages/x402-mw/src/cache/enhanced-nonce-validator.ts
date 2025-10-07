// packages/x402-mw/src/cache/enhanced-nonce-validator.ts
// 強化されたnonce検証機能（有効期限・重複チェック改善） 
import { RedisHelpers } from './redis';
import { RedisKeys } from './keys';
import { NonceConfig } from './nonce-config';
import winston from 'winston';
import { randomBytes } from 'crypto';

export interface EnhancedNonceValidationResult {
  valid: boolean;
  reason?: 'expired' | 'already_used' | 'invalid_format' | 'redis_error' | 'timestamp_invalid';
  timestamp?: number;
  remainingTtl?: number;
}

/**
 * 強化されたNonce検証クラス
 * タイムスタンプベースの有効期限チェックと改善された重複検証
 */
export class EnhancedNonceValidator {
  private static logger = NonceConfig.createLogger('EnhancedNonceValidator');
  private static readonly DEFAULT_TTL = NonceConfig.DEFAULT_TTL; // 30分
  private static readonly NONCE_TIMESTAMP_PREFIX = 'TS';

  /**
   * タイムスタンプ付きNonce生成
   */
  static generateTimestampedNonce(length: number = 32): string {
    const timestamp = Date.now();
    const randomLength = Math.max(8, length - 16);
    const randomPart = randomBytes(randomLength).toString('hex').substring(0, randomLength);
    
    // フォーマット: TS{timestamp}_{randomPart}
    return `${this.NONCE_TIMESTAMP_PREFIX}${timestamp}_${randomPart}`;
  }

  /**
   * Nonceからタイムスタンプを抽出
   */
  static extractTimestamp(nonce: string): number | null {
    if (!nonce.startsWith(this.NONCE_TIMESTAMP_PREFIX)) {
      return null;
    }

    const timestampMatch = nonce.match(/^TS(\d+)_/);
    if (!timestampMatch || !timestampMatch[1]) {
      return null;
    }

    return parseInt(timestampMatch[1], 10);
  }

  /**
   * 強化されたNonce検証
   */
  static async validateEnhancedNonce(
    walletAddress: string,
    nonce: string,
    maxAgeMs: number = this.DEFAULT_TTL * 1000
  ): Promise<EnhancedNonceValidationResult> {
    try {
      // 1. フォーマット検証
      if (!this.isValidNonceFormat(nonce)) {
        return { valid: false, reason: 'invalid_format' };
      }

      // 2. タイムスタンプ抽出・検証
      const timestamp = this.extractTimestamp(nonce);
      if (timestamp === null) {
        return { valid: false, reason: 'timestamp_invalid' };
      }

      // 3. 有効期限チェック
      const now = Date.now();
      const age = now - timestamp;
      
      if (age > maxAgeMs) {
        this.logger.warn('Nonce expired by timestamp', {
          nonce: nonce.substring(0, 20) + '...',
          age: Math.round(age / 1000),
          maxAge: Math.round(maxAgeMs / 1000),
          walletAddress,
        });
        return { 
          valid: false, 
          reason: 'expired',
          timestamp,
          remainingTtl: 0
        };
      }

      // 4. Redis重複チェック（改善版）
      return await this.checkAndMarkNonceUsed(walletAddress, nonce, timestamp, maxAgeMs);

    } catch (error) {
      this.logger.error('Enhanced nonce validation failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
        nonce: nonce.substring(0, 20) + '...',
        walletAddress,
      });

      return { valid: false, reason: 'redis_error' };
    }
  }

  /**
   * Redis重複チェック（改善版）
   */
  private static async checkAndMarkNonceUsed(
    walletAddress: string,
    nonce: string,
    timestamp: number,
    maxAgeMs: number
  ): Promise<EnhancedNonceValidationResult> {
    return RedisHelpers.safeExecute(async (client) => {
      const key = RedisKeys.nonce(walletAddress, nonce);
      
      // アトミックな存在確認と設定
      const multi = client.multi();
      multi.exists(key);
      multi.setEx(key, Math.ceil(maxAgeMs / 1000), JSON.stringify({
        timestamp,
        usedAt: Date.now(),
        walletAddress,
      }));
      
      const results = await multi.exec();
      const exists = results?.[0] as number;
      
      if (exists === 1) {
        this.logger.warn('Nonce already used', {
          nonce: nonce.substring(0, 20) + '...',
          walletAddress,
          timestamp,
        });
        return { valid: false, reason: 'already_used' };
      }

      const remainingTtl = Math.max(0, maxAgeMs - (Date.now() - timestamp));
      
      this.logger.info('Nonce validated and marked as used', {
        nonce: nonce.substring(0, 20) + '...',
        walletAddress,
        timestamp,
        remainingTtl: Math.round(remainingTtl / 1000),
      });

      return { 
        valid: true,
        timestamp,
        remainingTtl: Math.round(remainingTtl / 1000)
      };
    }, { valid: false, reason: 'redis_error' } as EnhancedNonceValidationResult);
  }

  /**
   * Nonceフォーマット検証
   */
  private static isValidNonceFormat(nonce: string): boolean {
    // タイムスタンプ付きフォーマット: TS{timestamp}_{randomPart}
    return /^TS\d+_[a-zA-Z0-9]+$/.test(nonce) && nonce.length >= 20 && nonce.length <= 64;
  }

  /**
   * ウォレット別Nonce統計（強化版）
   */
  static async getEnhancedNonceStatistics(walletAddress: string): Promise<{
    totalUsed: number;
    oldestTimestamp: number | null;
    newestTimestamp: number | null;
    expiredCount: number;
  }> {
    return RedisHelpers.safeExecute(async (client) => {
      const pattern = RedisKeys.nonce(walletAddress, '*');
      const keys = await client.keys(pattern);
      
      if (keys.length === 0) {
        return { totalUsed: 0, oldestTimestamp: null, newestTimestamp: null, expiredCount: 0 };
      }

      const now = Date.now();
      const timestamps: number[] = [];
      let expiredCount = 0;

      for (const key of keys) {
        const nonceValue = await client.get(key);
        if (nonceValue) {
          try {
            const data = JSON.parse(nonceValue);
            timestamps.push(data.timestamp);
            
            // 期限切れチェック
            if (now - data.timestamp > this.DEFAULT_TTL * 1000) {
              expiredCount++;
            }
          } catch (error) {
            // 古い形式のnonce（JSON以外）の場合はスキップ
          }
        }
      }

      timestamps.sort((a, b) => a - b);

      return {
        totalUsed: keys.length,
        oldestTimestamp: timestamps.length > 0 ? timestamps[0] ?? null : null,
        newestTimestamp: timestamps.length > 0 ? timestamps[timestamps.length - 1] ?? null : null,
        expiredCount,
      };
    }, { totalUsed: 0, oldestTimestamp: null, newestTimestamp: null, expiredCount: 0 });
  }
}