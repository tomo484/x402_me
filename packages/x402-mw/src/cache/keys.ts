// packages/x402-mw/src/cache/keys.ts

/**
 * Redis キー設計
 * レート制限、nonce管理、キャッシュで使用するキーの生成関数
 */

export class RedisKeys {
    /**
   * レート制限キー生成
   * パターン: rate_limit:{type}:{identifier}:{window}
   */
  static rateLimit(type:'ip' | 'wallet' | 'resource', identifier: string, windowStart: number): string {
    return `rate_limit:${type}:${identifier}:${windowStart}`;
  } 
  /**
   * IP別レート制限キー
   * 例: rate_limit:ip:192.168.1.1:1704067200
   */
  static rateLimitByIP(ip: string, windowStart: number): string {
    return this.rateLimit('ip', ip, windowStart)
  }
  
  /**
   * ウォレットアドレス別レート制限キー
   * 例: rate_limit:wallet:0x123...:1704067200
   */
  static rateLimitByWallet(walletAddress: string, windowStart: number): string {
    return this.rateLimit('wallet', walletAddress.toLowerCase(), windowStart);
  }

  /**
   * リソース別レート制限キー
   * 例: rate_limit:resource:/api/premium:1704067200
   */
  static rateLimitByResource(resource: string, windowStart: number): string {
    const sanitizedResource = resource.replace(/[^a-zA-Z0-9/_-]/g, '_');
    return this.rateLimit('resource', sanitizedResource, windowStart);
  }

  /**
   * Nonce管理キー生成
   * パターン: nonce:{walletAddress}:{nonce}
   */
  static nonce(walletAddress: string, nonce: string): string {
    return `nonce:${walletAddress.toLowerCase()}:${nonce}`;
  }

  /**
   * 支払い検証キャッシュキー
   * パターン: payment_cache:{paymentHash}
   */
  static paymentCache(paymentHash: string): string {
    return `payment_cache:${paymentHash}`;
  }

  /**
   * セッションキー（将来対応）
   * パターン: session:{sessionId}
   */
  static session(sessionId: string): string {
    return `session:${sessionId}`;
  }

  /**
   * 設定キャッシュキー
   * パターン: config:{configKey}
   */
  static config(configKey: string): string {
    return `config:${configKey}`;
  }

  /**
   * ブロック済みIPキー
   * パターン: blocked_ip:{ip}
   */
  static blockedIP(ip: string): string {
    return `blocked_ip:${ip}`;
  }

  /**
   * 複数キーの一括削除用パターン取得
   */
  static getPatterns() {
    return {
      rateLimits: 'rate_limit:*',
      nonces: 'nonce:*',
      paymentCache: 'payment_cache:*',
      sessions: 'session:*',
      configs: 'config:*',
      blockedIPs: 'blocked_ip:*'
    };
  }

  /**
   * キーの有効期限設定（秒）
   */
  static getTTL() {
    return {
      rateLimit: 3600, // 1時間
      nonce: 1800,     // 30分
      paymentCache: 300, // 5分
      session: 86400,  // 24時間
      config: 3600,    // 1時間
      blockedIP: 86400 // 24時間
    };
  }
}