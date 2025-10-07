// packages/x402-mw/src/cache/nonce-expiration-manager.ts
// Nonce期限切れ管理とクリーンアップ機能 
import { RedisHelpers } from './redis';
import { RedisKeys } from './keys';
import { NonceConfig } from './nonce-config';
import winston from 'winston';

export interface CleanupResult {
  deletedCount: number;
  scannedCount: number;
  duration: number;
  errors: string[];
}

export interface CleanupConfig {
  batchSize: number;
  maxScanCount: number;
  dryRun: boolean;
}

/**
 * Nonce期限切れ管理とクリーンアップ機能
 */
export class NonceExpirationManager {
  private static logger = NonceConfig.createLogger('NonceExpirationManager');

  private static readonly DEFAULT_CLEANUP_CONFIG: CleanupConfig = {
    ...NonceConfig.BATCH_CONFIG,
    dryRun: false,
  };

  /**
   * 期限切れnonceの自動削除
   */
  static async cleanupExpiredNonces(
    config: Partial<CleanupConfig> = {}
  ): Promise<CleanupResult> {
    const finalConfig = { ...this.DEFAULT_CLEANUP_CONFIG, ...config };
    const startTime = Date.now();
    
    this.logger.info('Starting nonce cleanup', {
      config: finalConfig,
    });

    return RedisHelpers.safeExecute(async (client) => {
      let deletedCount = 0;
      let scannedCount = 0;
      const errors: string[] = [];
      let cursor = '0';
      
      do {
        try {
          // SCANコマンドでnonce keyを取得
          const scanResult = await client.scan(parseInt(cursor), {
            MATCH: 'nonce:*',
            COUNT: finalConfig.batchSize,
          });
          
          cursor = scanResult.cursor.toString();
          const keys = scanResult.keys;
          scannedCount += keys.length;

          if (keys.length === 0) {
            continue;
          }

          // バッチでTTLチェック
          const pipeline = client.multi();
          keys.forEach(key => pipeline.ttl(key));
          const ttlResults = await pipeline.exec();

          const expiredKeys: string[] = [];
          
          for (let i = 0; i < keys.length; i++) {
            const ttl = ttlResults?.[i] as number;
            const key = keys[i];
            
            // TTL -1 (期限なし) または -2 (存在しない) の場合は削除対象
            if (ttl === -1 || ttl === -2) {
              if (key) {
                expiredKeys.push(key);
              }
            }
          }

          // 期限切れキーを削除
          if (expiredKeys.length > 0 && !finalConfig.dryRun) {
            const deleteResult = await client.del(expiredKeys);
            deletedCount += deleteResult;
            
            this.logger.debug('Deleted expired nonces', {
              keys: expiredKeys.length,
              deleted: deleteResult,
            });
          } else if (expiredKeys.length > 0 && finalConfig.dryRun) {
            deletedCount += expiredKeys.length;
            this.logger.debug('Would delete expired nonces (dry run)', {
              keys: expiredKeys.length,
            });
          }

        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          errors.push(errorMessage);
          this.logger.error('Error during nonce cleanup batch', {
            error: errorMessage,
            cursor,
            scannedCount,
          });
        }

        // 最大スキャン数制限
        if (scannedCount >= finalConfig.maxScanCount) {
          this.logger.warn('Reached maximum scan count limit', {
            scannedCount,
            maxScanCount: finalConfig.maxScanCount,
          });
          break;
        }

      } while (cursor !== '0');

      const duration = Date.now() - startTime;
      const result: CleanupResult = {
        deletedCount,
        scannedCount,
        duration,
        errors,
      };

      this.logger.info('Nonce cleanup completed', result);
      return result;

    }, {
      deletedCount: 0,
      scannedCount: 0,
      duration: Date.now() - startTime,
      errors: ['Redis connection failed'],
    } as CleanupResult);
  }

  /**
   * 特定ウォレットの期限切れnonce削除
   */
  static async cleanupWalletExpiredNonces(
    walletAddress: string,
    config: Partial<CleanupConfig> = {}
  ): Promise<CleanupResult> {
    const finalConfig = { ...this.DEFAULT_CLEANUP_CONFIG, ...config };
    const startTime = Date.now();

    this.logger.info('Starting wallet nonce cleanup', {
      walletAddress,
      config: finalConfig,
    });

    return RedisHelpers.safeExecute(async (client) => {
      const pattern = RedisKeys.nonce(walletAddress, '*');
      const keys = await client.keys(pattern);
      
      let deletedCount = 0;
      const errors: string[] = [];

      if (keys.length === 0) {
        return {
          deletedCount: 0,
          scannedCount: 0,
          duration: Date.now() - startTime,
          errors: [],
        };
      }

      // バッチ処理
      for (let i = 0; i < keys.length; i += finalConfig.batchSize) {
        const batch = keys.slice(i, i + finalConfig.batchSize);
        
        try {
          // TTLチェック
          const pipeline = client.multi();
          batch.forEach(key => pipeline.ttl(key));
          const ttlResults = await pipeline.exec();

          const expiredKeys = batch.filter((_, index) => {
            const ttl = ttlResults?.[index] as number;
            return ttl === -1 || ttl === -2;
          });

          // 削除実行
          if (expiredKeys.length > 0 && !finalConfig.dryRun) {
            const deleteResult = await client.del(expiredKeys);
            deletedCount += deleteResult;
          } else if (expiredKeys.length > 0 && finalConfig.dryRun) {
            deletedCount += expiredKeys.length;
          }

        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          errors.push(errorMessage);
          this.logger.error('Error during wallet nonce cleanup batch', {
            error: errorMessage,
            walletAddress,
            batch: batch.length,
          });
        }
      }

      const result: CleanupResult = {
        deletedCount,
        scannedCount: keys.length,
        duration: Date.now() - startTime,
        errors,
      };

      this.logger.info('Wallet nonce cleanup completed', {
        walletAddress,
        ...result,
      });

      return result;

    }, {
      deletedCount: 0,
      scannedCount: 0,
      duration: Date.now() - startTime,
      errors: ['Redis connection failed'],
    } as CleanupResult);
  }

  /**
   * 定期クリーンアップスケジューラー
   */
  static startPeriodicCleanup(
    intervalMs: number = 30 * 60 * 1000, // 30分
    config: Partial<CleanupConfig> = {}
  ): NodeJS.Timeout {
    this.logger.info('Starting periodic nonce cleanup', {
      intervalMinutes: Math.round(intervalMs / 60000),
      config,
    });

    return setInterval(async () => {
      try {
        await this.cleanupExpiredNonces(config);
      } catch (error) {
        this.logger.error('Periodic cleanup failed', {
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }, intervalMs);
  }

  /**
   * クリーンアップ統計取得
   */
  static async getCleanupStatistics(): Promise<{
    totalNonces: number;
    expiredNonces: number;
    oldestNonce: string | null;
    newestNonce: string | null;
    estimatedCleanupTime: number;
  }> {
    return RedisHelpers.safeExecute(async (client) => {
      const keys = await client.keys('nonce:*');
      let expiredCount = 0;
      const timestamps: Array<{ key: string; timestamp: number }> = [];

      if (keys.length === 0) {
        return {
          totalNonces: 0,
          expiredNonces: 0,
          oldestNonce: null,
          newestNonce: null,
          estimatedCleanupTime: 0,
        };
      }

      // バッチでTTLチェック
      const batchSize = 100;
      for (let i = 0; i < keys.length; i += batchSize) {
        const batch = keys.slice(i, i + batchSize);
        const pipeline = client.multi();
        
        batch.forEach(key => {
          pipeline.ttl(key);
          pipeline.get(key);
        });
        
        const results = await pipeline.exec();
        
        for (let j = 0; j < batch.length; j++) {
          const ttl = results?.[j * 2] as number;
          const value = results?.[j * 2 + 1] as string;
          
          if (ttl === -1 || ttl === -2) {
            expiredCount++;
          }

          // タイムスタンプ抽出試行
          if (value) {
            try {
              const data = JSON.parse(value);
              const batchKey = batch[j];
              if (data.timestamp && batchKey) {
                timestamps.push({
                  key: batchKey,
                  timestamp: data.timestamp,
                });
              }
            } catch {
              // 古い形式のnonceの場合はスキップ
            }
          }
        }
      }

      timestamps.sort((a, b) => a.timestamp - b.timestamp);

      return {
        totalNonces: keys.length,
        expiredNonces: expiredCount,
        oldestNonce: timestamps.length > 0 ? timestamps[0]?.key || null : null,
        newestNonce: timestamps.length > 0 ? timestamps[timestamps.length - 1]?.key || null : null,
        estimatedCleanupTime: Math.ceil(keys.length / 100) * 100, // ms
      };

    }, {
      totalNonces: 0,
      expiredNonces: 0,
      oldestNonce: null,
      newestNonce: null,
      estimatedCleanupTime: 0,
    });
  }
}

