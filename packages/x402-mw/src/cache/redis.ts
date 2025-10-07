// packages/x402-mw/src/cache/redis.ts
import { createClient, RedisClientType } from 'redis';
import { RedisKeys } from './keys';

/**
 * Redis クライアント管理
 * シングルトンパターンで接続を管理
 */
export class RedisManager {
  private static instance: RedisClientType;
  private static isConnected = false;

  /**
   * Redis クライアントインスタンス取得
   */
  static getInstance(): RedisClientType {
    if (!RedisManager.instance) {
              const baseConfig = {
          url: process.env.REDIS_URL || 'redis://localhost:6379',
          socket: {
            connectTimeout: 60000,
          },
        };

        const productionConfig = process.env.NODE_ENV === 'production' 
          ? {
              ...(process.env.REDIS_PASSWORD && { password: process.env.REDIS_PASSWORD }),
              database: parseInt(process.env.REDIS_DB || '0'),
            }
          : {};

        console.log('🔧 Redis config debug:');
        console.log('📍 NODE_ENV:', process.env.NODE_ENV);
        console.log('🔑 REDIS_PASSWORD:', process.env.REDIS_PASSWORD);
        console.log('📋 baseConfig:', baseConfig);
        console.log('⚙️ productionConfig:', productionConfig);
        
        const finalConfig = {
          ...baseConfig,
          ...productionConfig,
        };
        console.log('🎯 Final Redis config:', finalConfig);

        RedisManager.instance = createClient(finalConfig);

      // エラーハンドリング
      RedisManager.instance.on('error', (err) => {
        console.error('Redis接続エラー:', err);
        RedisManager.isConnected = false;
      });

      RedisManager.instance.on('connect', () => {
        console.log('✅ Redis接続成功');
        RedisManager.isConnected = true;
      });

      RedisManager.instance.on('end', () => {
        console.log('Redis接続終了');
        RedisManager.isConnected = false;
      });
    }

    return RedisManager.instance;
  }

  /**
   * Redis接続確立
   */
  static async connect(): Promise<void> {
    const client = RedisManager.getInstance();
    if (!RedisManager.isConnected) {
      await client.connect();
    }
  }

  /**
   * Redis接続切断
   */
  static async disconnect(): Promise<void> {
    if (RedisManager.instance && RedisManager.isConnected) {
      await RedisManager.instance.quit();
      RedisManager.isConnected = false;
    }
  }

  /**
   * ヘルスチェック
   */
  static async healthCheck(): Promise<{ healthy: boolean; latency?: number; error?: string }> {
    try {
      const client = RedisManager.getInstance();
      const startTime = Date.now();
      
      await client.ping();
      const latency = Date.now() - startTime;
      
      return { healthy: true, latency };
    } catch (error) {
      console.error('Redis ヘルスチェック失敗:', error);
      return { 
        healthy: false, 
        error: error instanceof Error ? error.message : 'Unknown Redis error'
      };
    }
  }

  /**
   * 接続状態確認
   */
  static isRedisConnected(): boolean {
    return RedisManager.isConnected;
  }
}

/**
 * Redis操作のヘルパー関数
 */
export class RedisHelpers {
  /**
   * 安全なRedis操作実行
   */
  static async safeExecute<T>(
    operation: (client: RedisClientType) => Promise<T>,
    fallbackValue: T
  ): Promise<T> {
    try {
      const client = RedisManager.getInstance();
      
      if (!RedisManager.isRedisConnected()) {
        await RedisManager.connect();
      }
      
      return await operation(client);
    } catch (error) {
      console.error('Redis操作エラー:', error);
      return fallbackValue;
    }
  }

  /**
   * 期限切れキーの一括削除
   */
  static async cleanupExpiredKeys(): Promise<number> {
    return RedisHelpers.safeExecute(async (client) => {
      let deletedCount = 0;
      const patterns = RedisKeys.getPatterns();
      
      for (const pattern of Object.values(patterns)) {
        const keys = await client.keys(pattern);
        if (keys.length > 0) {
          const deleted = await client.del(keys);
          deletedCount += deleted;
        }
      }
      
      console.log(`✅ Redis期限切れキー削除完了: ${deletedCount}件`);
      return deletedCount;
    }, 0);
  }

  /**
   * Redis統計情報取得
   */
  static async getStatistics(): Promise<{
    connectedClients: number;
    usedMemory: string;
    totalKeys: number;
    hitRate: number;
  }> {
    return RedisHelpers.safeExecute(async (client) => {
      const info = await client.info();
      const dbSize = await client.dbSize();
      
      // INFO コマンドの結果をパース
      const lines = info.split('\r\n');
      const stats: Record<string, string> = {};
      
      lines.forEach(line => {
        if (line.includes(':')) {
          const parts = line.split(':');
          const key = parts[0];
          const value = parts.slice(1).join(':');
          if (key) {
            stats[key] = value;
          }
        }
      });

      return {
        connectedClients: parseInt(stats.connected_clients || '0'),
        usedMemory: stats.used_memory_human || '0B',
        totalKeys: dbSize,
        hitRate: parseFloat(stats.keyspace_hit_rate || '0') * 100
      };
    }, {
      connectedClients: 0,
      usedMemory: '0B',
      totalKeys: 0,
      hitRate: 0
    });
  }
}