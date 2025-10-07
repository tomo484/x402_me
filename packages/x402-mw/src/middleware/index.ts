// packages/x402-mw/src/middleware/index.ts

// メインミドルウェアのエクスポート
export { 
  X402Middleware, 
  createX402Middleware, 
  createX402MiddlewareFromEnv 
} from './x402-middleware';

// 設定関連のエクスポート
export type { MiddlewareResult } from './x402-middleware';
export type { X402MiddlewareConfig } from './config';
export { 
  DEFAULT_MIDDLEWARE_CONFIG,
  validateConfig,
  toX402Config,
  toFacilitatorConfig,
  configFromEnv
} from './config';

// 便利な再エクスポート
export type {
  PaymentVerificationResult,
  PaymentSettlementResult,
  CircuitBreakerStats
} from '../facilitator';