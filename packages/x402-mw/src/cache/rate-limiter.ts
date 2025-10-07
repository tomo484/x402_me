// packages/x402-mw/src/cache/rate-limiter.ts
import { RedisManager, RedisHelpers } from './redis';
import { RedisKeys } from './keys';

export interface RateLimitConfig {
  windowMs: number;    // ウィンドウサイズ（ミリ秒）
  maxRequests: number; // ウィンドウ内の最大リクエスト数
  blockDurationMs?: number; // ブロック期間（ミリ秒）
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  totalHits: number;
}

/**
 * スライディングウィンドウレート制限実装
 */
export class RateLimiter {
  /**
   * IP別レート制限チェック
   */
  static async checkByIP(
    ip: string, 
    config: RateLimitConfig
  ): Promise<RateLimitResult> {
    const windowStart = Math.floor(Date.now() / config.windowMs) * config.windowMs;
    const key = RedisKeys.rateLimitByIP(ip, windowStart);
    
    return this.performRateLimitCheck(key, config, windowStart);
  }

  /**
   * ウォレットアドレス別レート制限チェック
   */
  static async checkByWallet(
    walletAddress: string,
    config: RateLimitConfig
  ): Promise<RateLimitResult> {
    const windowStart = Math.floor(Date.now() / config.windowMs) * config.windowMs;
    const key = RedisKeys.rateLimitByWallet(walletAddress, windowStart);
    
    return this.performRateLimitCheck(key, config, windowStart);
  }

  /**
   * リソース別レート制限チェック
   */
  static async checkByResource(
    resource: string,
    config: RateLimitConfig
  ): Promise<RateLimitResult> {
    const windowStart = Math.floor(Date.now() / config.windowMs) * config.windowMs;
    const key = RedisKeys.rateLimitByResource(resource, windowStart);
    
    return this.performRateLimitCheck(key, config, windowStart);
  }

  /**
   * レート制限チェックの実際の処理
   */
  private static async performRateLimitCheck(
    key: string,
    config: RateLimitConfig,
    windowStart: number
  ): Promise<RateLimitResult> {
    return RedisHelpers.safeExecute(async (client) => {
      // 現在のカウントを取得
      const currentCount = await client.get(key);
      const hits = currentCount ? parseInt(currentCount) : 0;
      
      const resetTime = windowStart + config.windowMs;
      const remaining = Math.max(0, config.maxRequests - hits - 1);
      
      // 制限チェック
      if (hits >= config.maxRequests) {
        // ブロック設定がある場合は追加でブロックキーを設定
        if (config.blockDurationMs) {
          const blockKey = `${key}:blocked`;
          await client.setEx(blockKey, Math.ceil(config.blockDurationMs / 1000), '1');
        }
        
        return {
          allowed: false,
          remaining: 0,
          resetTime,
          totalHits: hits
        };
      }

      // カウントを増加
      await client.multi()
        .incr(key)
        .expire(key, Math.ceil(config.windowMs / 1000))
        .exec();

      return {
        allowed: true,
        remaining,
        resetTime,
        totalHits: hits + 1
      };
    }, {
      allowed: true, // Redis接続失敗時はデフォルトで許可
      remaining: config.maxRequests - 1,
      resetTime: windowStart + config.windowMs,
      totalHits: 1
    });
  }

  /**
   * IPブロック状態チェック
   */
  static async isIPBlocked(ip: string): Promise<boolean> {
    return RedisHelpers.safeExecute(async (client) => {
      const blockKey = RedisKeys.blockedIP(ip);
      const blocked = await client.get(blockKey);
      return blocked === '1';
    }, false);
  }

  /**
   * IPブロック設定
   */
  static async blockIP(ip: string, durationMs: number): Promise<void> {
    await RedisHelpers.safeExecute(async (client) => {
      const blockKey = RedisKeys.blockedIP(ip);
      await client.setEx(blockKey, Math.ceil(durationMs / 1000), '1');
      console.log(`🚫 IP ${ip} を ${Math.ceil(durationMs / 1000)}秒間ブロックしました`);
    }, undefined);
  }

  /**
   * IPブロック解除
   */
  static async unblockIP(ip: string): Promise<void> {
    await RedisHelpers.safeExecute(async (client) => {
      const blockKey = RedisKeys.blockedIP(ip);
      await client.del(blockKey);
      console.log(`✅ IP ${ip} のブロックを解除しました`);
    }, undefined);
  }
}