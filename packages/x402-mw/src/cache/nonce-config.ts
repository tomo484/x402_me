// packages/x402-mw/src/cache/nonce-config.ts
// Nonce管理の共通設定

import winston from 'winston';

/**
 * Nonce管理の共通設定
 */
export class NonceConfig {
  static readonly DEFAULT_TTL = 1800; // 30分（秒）
  static readonly DEFAULT_TTL_MS = NonceConfig.DEFAULT_TTL * 1000; // 30分（ミリ秒）
  
  /**
   * 共通Logger設定
   */
  static createLogger(label?: string): winston.Logger {
    return winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        label ? winston.format.label({ label }) : winston.format.json()
      ),
      transports: [new winston.transports.Console()],
    });
  }

  /**
   * バッチ処理のデフォルト設定
   */
  static readonly BATCH_CONFIG = {
    batchSize: 100,
    maxScanCount: 1000,
  } as const;
} 