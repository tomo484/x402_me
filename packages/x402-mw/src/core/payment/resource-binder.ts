// packages/x402-mw/src/core/payment/resource-binder.ts
import { Request } from 'express';
import winston from 'winston';

export interface ResourceConfig {
  path: string;
  amount: string;
  currency: string;
  description?: string;
  metadata?: Record<string, any>;
}

export interface BoundResource {
  resource: string;
  normalizedPath: string;
  config: ResourceConfig;
  matchedPattern: string;
}

/**
 * リソースバインディング機能
 * URLパスと支払い設定をマッピング
 */
export class ResourceBinder {
  private static logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
  });

  private static resourceConfigs: Map<string, ResourceConfig> = new Map();

  /**
   * リソース設定を登録
   */
  static registerResource(pattern: string, config: ResourceConfig): void {
    this.resourceConfigs.set(pattern, config);
    this.logger.info('Resource registered', { pattern, config });
  }

  /**
   * リソース設定を一括登録
   */
  static registerResources(configs: Record<string, ResourceConfig>): void {
    Object.entries(configs).forEach(([pattern, config]) => {
      this.registerResource(pattern, config);
    });
  }

  /**
   * リクエストのリソースパスに対応する設定を取得
   */
  static getResourceConfig(req: Request): BoundResource | null {
    const resourcePath = req.originalUrl || req.url;
    const normalizedPath = this.normalizePath(resourcePath);

    // 完全一致チェック
    for (const [pattern, config] of this.resourceConfigs.entries()) {
      if (this.matchesPattern(normalizedPath, pattern)) {
        return {
          resource: resourcePath,
          normalizedPath,
          config,
          matchedPattern: pattern,
        };
      }
    }

    this.logger.debug('No resource config found', { resourcePath, normalizedPath });
    return null;
  }

  /**
   * パスの正規化
   */
  private static normalizePath(path: string): string {
    // クエリパラメータとハッシュを除去
    const cleanPath = path.split('?')[0]?.split('#')[0] || path;
    
    // 末尾のスラッシュを除去（ルート以外）
    return cleanPath === '/' ? cleanPath : cleanPath.replace(/\/$/, '');
  }

  /**
   * パターンマッチング
   * 簡単なワイルドカードサポート（*, **）
   */
  private static matchesPattern(path: string, pattern: string): boolean {
    // 完全一致
    if (path === pattern) {
      return true;
    }

    // ワイルドカードパターン変換
    const regexPattern = pattern
      .replace(/\*\*/g, '.*') // ** は任意の文字列
      .replace(/\*/g, '[^/]*') // * はスラッシュ以外の任意の文字列
      .replace(/\//g, '\\/'); // スラッシュをエスケープ

    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(path);
  }

  /**
   * デフォルト設定を適用
   */
  static getDefaultConfig(): ResourceConfig {
    return {
      path: '*',
      amount: process.env.X402_DEFAULT_AMOUNT || '1000000', // 1 USDC (6 decimals)
      currency: process.env.X402_DEFAULT_CURRENCY || 'USDC',
      description: 'Access to protected resource',
    };
  }

  /**
   * 登録済みリソース一覧を取得
   */
  static listResources(): Array<{ pattern: string; config: ResourceConfig }> {
    return Array.from(this.resourceConfigs.entries()).map(([pattern, config]) => ({
      pattern,
      config,
    }));
  }

  /**
   * リソース設定をクリア
   */
  static clearResources(): void {
    this.resourceConfigs.clear();
    this.logger.info('All resource configs cleared');
  }
}