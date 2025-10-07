// packages/x402-mw/src/facilitator/circuit-breaker.ts
import winston from 'winston';
import { CircuitBreakerState, CircuitBreakerStats } from './types';

export interface CircuitBreakerConfig {
  failureThreshold: number; // 連続失敗回数の閾値（デフォルト: 5）
  successThreshold: number; // 成功回数の閾値（デフォルト: 3）
  timeout: number; // オープン状態の持続時間（ms）（デフォルト: 60秒）
  monitoringPeriod: number; // 監視期間（ms）（デフォルト: 10分）
}

/**
 * Circuit Breaker パターン実装
 * 外部API呼び出しの失敗を監視し、一定の閾値を超えた場合に呼び出しを停止
 */
export class CircuitBreaker {
  private static logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
  });

  private state: CircuitBreakerState = 'CLOSED';
  private failureCount = 0;
  private successCount = 0;
  private nextAttempt: Date | undefined;
  private lastFailure: Date | undefined;
  private readonly config: CircuitBreakerConfig;

  constructor(config: Partial<CircuitBreakerConfig> = {}) {
    this.config = {
      failureThreshold: 5,
      successThreshold: 3,
      timeout: 60000, // 60秒
      monitoringPeriod: 600000, // 10分
      ...config,
    };

    CircuitBreaker.logger.info('Circuit Breaker initialized', {
      config: this.config,
    });
  }

  /**
   * 関数を実行（Circuit Breaker経由）
   */
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (this.shouldAttemptReset()) {
        this.state = 'HALF_OPEN';
        CircuitBreaker.logger.info('Circuit Breaker state changed to HALF_OPEN');
      } else {
        throw new Error('Circuit Breaker is OPEN - calls are blocked');
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  /**
   * 成功時の処理
   */
  private onSuccess(): void {
    this.failureCount = 0;
    
    if (this.state === 'HALF_OPEN') {
      this.successCount++;
      
      if (this.successCount >= this.config.successThreshold) {
        this.state = 'CLOSED';
        this.successCount = 0;
        CircuitBreaker.logger.info('Circuit Breaker state changed to CLOSED');
      }
    }
  }

  /**
   * 失敗時の処理
   */
  private onFailure(): void {
    this.failureCount++;
    this.lastFailure = new Date();
    
    if (this.state === 'HALF_OPEN') {
      this.state = 'OPEN';
      this.successCount = 0;
      this.nextAttempt = new Date(Date.now() + this.config.timeout);
      CircuitBreaker.logger.warn('Circuit Breaker state changed to OPEN (from HALF_OPEN)');
    } else if (this.failureCount >= this.config.failureThreshold) {
      this.state = 'OPEN';
      this.nextAttempt = new Date(Date.now() + this.config.timeout);
      CircuitBreaker.logger.warn('Circuit Breaker state changed to OPEN', {
        failureCount: this.failureCount,
        threshold: this.config.failureThreshold,
      });
    }
  }

  /**
   * リセット試行を行うべきかチェック
   */
  private shouldAttemptReset(): boolean {
    return this.nextAttempt ? new Date() >= this.nextAttempt : false;
  }

  /**
   * Circuit Breaker統計取得
   */
  getStats(): CircuitBreakerStats {
    return {
      state: this.state,
      failureCount: this.failureCount,
      successCount: this.successCount,
      ...(this.nextAttempt && { nextAttempt: this.nextAttempt }),
      ...(this.lastFailure && { lastFailure: this.lastFailure }),
    };
  }

  /**
   * Circuit Breakerリセット（手動）
   */
  reset(): void {
    this.state = 'CLOSED';
    this.failureCount = 0;
    this.successCount = 0;
    this.nextAttempt = undefined;
    this.lastFailure = undefined;
    
    CircuitBreaker.logger.info('Circuit Breaker manually reset to CLOSED state');
  }

  /**
   * 強制的にOPEN状態にする（メンテナンス用）
   */
  forceOpen(timeoutMs?: number): void {
    this.state = 'OPEN';
    this.nextAttempt = new Date(Date.now() + (timeoutMs || this.config.timeout));
    
    CircuitBreaker.logger.warn('Circuit Breaker forced to OPEN state', {
      timeout: timeoutMs || this.config.timeout,
    });
  }

  /**
   * 設定更新
   */
  updateConfig(newConfig: Partial<CircuitBreakerConfig>): void {
    Object.assign(this.config, newConfig);
    
    CircuitBreaker.logger.info('Circuit Breaker config updated', {
      newConfig: this.config,
    });
  }
}
 