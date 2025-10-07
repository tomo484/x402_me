// packages/x402-mw/src/cache/nonce-manager.ts
import { RedisHelpers } from './redis';
import { RedisKeys } from './keys';
import { NonceConfig } from './nonce-config';
import { EnhancedNonceValidator, EnhancedNonceValidationResult } from './enhanced-nonce-validator';
import { NonceExpirationManager, CleanupResult } from './nonce-expiration-manager';
import winston from 'winston';



export interface UnifiedNonceStatistics {
  totalUsed: number;
  expiredCount: number;
  oldestNonce: string | null;
  newestNonce: string | null;
  oldestTimestamp: number | null;
  newestTimestamp: number | null;
  estimatedCleanupTime: number;
}

/**
 * 統一されたNonce管理クラス
 * - 強化されたnonce機能への統一インターフェース
 * - クリーンアップ機能の統合管理
 * - 統合統計・監視機能
 */
export class NonceManager {
  private static logger = NonceConfig.createLogger('NonceManager');

    // ========================================
  // Core Nonce Operations
  // ========================================

  /**
   * 強化nonce検証
   * タイムスタンプベースの有効期限チェックと改善された重複検証
   */
  static async validateEnhancedNonce(
    walletAddress: string,
    nonce: string,
    maxAgeMs: number = NonceConfig.DEFAULT_TTL_MS
  ): Promise<EnhancedNonceValidationResult> {
    return EnhancedNonceValidator.validateEnhancedNonce(walletAddress, nonce, maxAgeMs);
  }

    // ========================================
  // Nonce Generation
  // ========================================

  /**
   * 強化nonce生成
   * タイムスタンプ付きで期限切れチェックが可能
   */
  static generateEnhancedNonce(length: number = 32): string {
    return EnhancedNonceValidator.generateTimestampedNonce(length);
  }

  /**
   * デフォルトnonce生成
   */
  static generateNonce(length: number = 32): string {
    return this.generateEnhancedNonce(length);
  }

  // ========================================
  // Utility Functions
  // ========================================

  /**
   * Nonceが既に使用済みかチェック
   */
  static async isNonceUsed(walletAddress: string, nonce: string): Promise<boolean> {
    return RedisHelpers.safeExecute(async (client) => {
      const key = RedisKeys.nonce(walletAddress, nonce);
      const exists = await client.exists(key);
      return exists === 1;
    }, false);
  }

  /**
   * ウォレットアドレスの使用済みNonce数を取得
   */
  static async getUsedNonceCount(walletAddress: string): Promise<number> {
    return RedisHelpers.safeExecute(async (client) => {
      const pattern = RedisKeys.nonce(walletAddress, '*');
      const keys = await client.keys(pattern);
      return keys.length;
    }, 0);
  }

  // ========================================
  // Cleanup Operations
  // ========================================

  /**
   * 期限切れnonce自動削除
   */
  static async cleanupExpiredNonces(): Promise<CleanupResult> {
    return NonceExpirationManager.cleanupExpiredNonces();
  }

  /**
   * 特定ウォレットの期限切れnonce削除
   */
  static async cleanupWalletExpiredNonces(walletAddress: string): Promise<CleanupResult> {
    return NonceExpirationManager.cleanupWalletExpiredNonces(walletAddress);
  }

  /**
   * 定期クリーンアップ開始
   */
  static startPeriodicCleanup(intervalMs: number = 30 * 60 * 1000): NodeJS.Timeout {
    return NonceExpirationManager.startPeriodicCleanup(intervalMs);
  }

  // ========================================
  // Statistics & Monitoring
  // ========================================

  /**
   * 統合nonce統計取得
   * 強化統計 + クリーンアップ統計を統合
   */
  static async getUnifiedStatistics(walletAddress?: string): Promise<UnifiedNonceStatistics> {
    try {
      const [enhancedStats, cleanupStats] = await Promise.all([
        walletAddress ? EnhancedNonceValidator.getEnhancedNonceStatistics(walletAddress) : Promise.resolve(null),
        NonceExpirationManager.getCleanupStatistics(),
      ]);

      return {
        totalUsed: cleanupStats.totalNonces,
        expiredCount: cleanupStats.expiredNonces,
        oldestNonce: cleanupStats.oldestNonce,
        newestNonce: cleanupStats.newestNonce,
        oldestTimestamp: enhancedStats?.oldestTimestamp || null,
        newestTimestamp: enhancedStats?.newestTimestamp || null,
        estimatedCleanupTime: cleanupStats.estimatedCleanupTime,
      };

    } catch (error) {
      this.logger.error('Failed to get unified statistics', {
        error: error instanceof Error ? error.message : 'Unknown error',
        walletAddress,
      });

      return {
        totalUsed: 0,
        expiredCount: 0,
        oldestNonce: null,
        newestNonce: null,
        oldestTimestamp: null,
        newestTimestamp: null,
        estimatedCleanupTime: 0,
      };
    }
  }



}