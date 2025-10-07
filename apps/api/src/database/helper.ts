// apps/api/src/database/helper.ts
import { PrismaClient } from '@prisma/client';

// Prisma Client シングルトン
class DatabaseManager {
  private static instance: PrismaClient;

  static getInstance(): PrismaClient {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
      });
    }
    return DatabaseManager.instance;
  }

  static async disconnect(): Promise<void> {
    if (DatabaseManager.instance) {
      await DatabaseManager.instance.$disconnect();
    }
  }
}

// エクスポート用
export const getDb = (): PrismaClient => DatabaseManager.getInstance();

// ヘルパー関数
export class DatabaseHelpers {
  /**
   * ヘルスチェック - データベース接続確認
   */
  static async healthCheck(): Promise<{ healthy: boolean; latency?: number; error?: string }> {
    try {
      const db = getDb();
      const startTime = Date.now();
      await db.$queryRaw`SELECT 1`;
      const latency = Date.now() - startTime;
      
      return { healthy: true, latency };
    } catch (error) {
      console.error('Database health check failed:', error);
      return { 
        healthy: false, 
        error: error instanceof Error ? error.message : 'Unknown database error'
      };
    }
  }

  /**
   * データベース接続テスト（Prismaクライアント生成前でも動作）
   */
  static async testConnection(): Promise<boolean> {
    try {
      const db = getDb();
      await db.$connect();
      console.log('✅ データベース接続成功');
      return true;
    } catch (error) {
      console.error('❌ データベース接続失敗:', error);
      return false;
    }
  }

  /**
   * 期限切れデータのクリーンアップ
   */
  static async cleanupExpiredData(): Promise<void> {
    try {
      const db = getDb();
      const now = new Date();
      
      // 期限切れnonce削除
      const deletedNonces = await db.paymentNonce.deleteMany({
        where: {
          expiresAt: {
            lt: now
          }
        }
      });

      // 古いレート制限レコード削除
      const deletedRateLimits = await db.rateLimit.deleteMany({
        where: {
          windowEnd: {
            lt: new Date(now.getTime() - 24 * 60 * 60 * 1000) // 24時間前
          }
        }
      });

      console.log(`✅ クリーンアップ完了: nonces=${deletedNonces.count}, rate_limits=${deletedRateLimits.count}`);
    } catch (error) {
      console.error('❌ クリーンアップエラー:', error);
      throw error;
    }
  }

  /**
   * データベース統計情報取得
   */
  static async getStatistics(): Promise<{
    totalPayments: number;
    activeNonces: number;
    blockedIPs: number;
    recentAuditLogs: number;
  }> {
    try {
      const db = getDb();
      const [totalPayments, activeNonces, blockedIPs, recentAuditLogs] = await Promise.all([
        db.payment.count(),
        db.paymentNonce.count({
          where: {
            expiresAt: { gt: new Date() },
            used: false
          }
        }),
        db.rateLimit.count({
          where: {
            blocked: true,
            blockedUntil: { gt: new Date() }
          }
        }),
        db.auditLog.count({
          where: {
            createdAt: {
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // 24時間以内
            }
          }
        })
      ]);

      return {
        totalPayments,
        activeNonces,
        blockedIPs,
        recentAuditLogs
      };
    } catch (error) {
      console.error('❌ 統計情報取得エラー:', error);
      return {
        totalPayments: 0,
        activeNonces: 0,
        blockedIPs: 0,
        recentAuditLogs: 0
      };
    }
  }
}

export default DatabaseManager;