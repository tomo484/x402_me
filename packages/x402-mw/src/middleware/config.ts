// packages/x402-mw/src/middleware/config.ts
import { X402Config } from '../core/payment';
import { FacilitatorConfig } from '../facilitator';

/**
 * ミドルウェア設定インターフェース
 */
export interface X402MiddlewareConfig {
  // 支払い設定
  payment: {
    amount: string; // wei単位
    currency: string; // "USDC", "ETH", etc.
    decimals: number;
    networkName: string; // "base-sepolia", "base-mainnet"
    chainId: number;
    receiverAddress: string;
    nonceExpirationMs?: number; // デフォルト: 15分
  };

  // Facilitator設定
  facilitator: {
    apiUrl: string;
    apiKey: string;
    timeout?: number;
    retryAttempts?: number;
  };

  // ミドルウェア動作設定
  middleware: {
    skipPaths?: string[]; // スキップするパス (例: ['/health', '/metrics'])
    enableLogging?: boolean; // デフォルト: true
    customHeaders?: Record<string, string>;
    onPaymentRequired?: (req: any, paymentRequirements: any) => void;
    onPaymentVerified?: (req: any, paymentResult: any) => void;
    onPaymentFailed?: (req: any, error: any) => void;
  };

  // Circuit Breaker設定
  circuitBreaker?: {
    failureThreshold?: number;
    successThreshold?: number;
    timeout?: number;
    monitoringPeriod?: number;
  };
}

/**
 * デフォルト設定
 */
export const DEFAULT_MIDDLEWARE_CONFIG = {
  payment: {
    nonceExpirationMs: 15 * 60 * 1000, // 15分
  },
  facilitator: {
    timeout: 30000, // 30秒
    retryAttempts: 3,
  },
  middleware: {
    enableLogging: true,
    skipPaths: ['/health', '/metrics', '/favicon.ico'] as string[],
  },
  circuitBreaker: {
    failureThreshold: 5,
    successThreshold: 3,
    timeout: 60000, // 60秒
    monitoringPeriod: 600000, // 10分
  },
} as const;

/**
 * 設定検証
 */
export function validateConfig(config: X402MiddlewareConfig): void {
  // 必須フィールドチェック
  if (!config.payment.amount) {
    throw new Error('payment.amount is required');
  }
  if (!config.payment.currency) {
    throw new Error('payment.currency is required');
  }
  if (!config.payment.receiverAddress) {
    throw new Error('payment.receiverAddress is required');
  }
  if (!config.facilitator.apiUrl) {
    throw new Error('facilitator.apiUrl is required');
  }
  if (!config.facilitator.apiKey) {
    throw new Error('facilitator.apiKey is required');
  }

  // 金額形式チェック
  if (!/^\d+$/.test(config.payment.amount)) {
    throw new Error('payment.amount must be a valid number string');
  }

  // アドレス形式チェック
  if (!/^0x[a-fA-F0-9]{40}$/.test(config.payment.receiverAddress)) {
    throw new Error('payment.receiverAddress must be a valid Ethereum address');
  }

  // URL形式チェック
  try {
    new URL(config.facilitator.apiUrl);
  } catch {
    throw new Error('facilitator.apiUrl must be a valid URL');
  }
}

/**
 * 設定をX402Config形式に変換
 */
export function toX402Config(config: X402MiddlewareConfig): X402Config {
  return {
    amount: config.payment.amount,
    currency: config.payment.currency,
    decimals: config.payment.decimals,
    networkName: config.payment.networkName,
    chainId: config.payment.chainId,
    receiverAddress: config.payment.receiverAddress,
    facilitatorApiUrl: config.facilitator.apiUrl,
    ...(config.payment.nonceExpirationMs !== undefined && { 
      nonceExpirationMs: config.payment.nonceExpirationMs 
    }),
  };
}

/**
 * 設定をFacilitatorConfig形式に変換
 */
export function toFacilitatorConfig(config: X402MiddlewareConfig): FacilitatorConfig {
  return {
    apiUrl: config.facilitator.apiUrl,
    apiKey: config.facilitator.apiKey,
    ...(config.facilitator.timeout !== undefined && { timeout: config.facilitator.timeout }),
    ...(config.facilitator.retryAttempts !== undefined && { retryAttempts: config.facilitator.retryAttempts }),
  };
}

/**
 * 環境変数から設定を構築
 */
export function configFromEnv(): Partial<X402MiddlewareConfig> {
  return {
    payment: {
      amount: process.env.X402_AMOUNT || '1000000', // 1 USDC
      currency: process.env.X402_CURRENCY || 'USDC',
      decimals: parseInt(process.env.X402_DECIMALS || '6'),
      networkName: process.env.X402_NETWORK || 'base-sepolia',
      chainId: parseInt(process.env.X402_CHAIN_ID || '84532'),
      receiverAddress: process.env.X402_RECEIVER_ADDRESS || '',
      nonceExpirationMs: parseInt(process.env.X402_NONCE_EXPIRATION_MS || '900000'),
    },
    facilitator: {
      apiUrl: process.env.X402_FACILITATOR_API_URL || 'https://api.developer.coinbase.com',
      apiKey: process.env.X402_FACILITATOR_API_KEY || '',
      timeout: parseInt(process.env.X402_FACILITATOR_TIMEOUT || '30000'),
      retryAttempts: parseInt(process.env.X402_FACILITATOR_RETRY_ATTEMPTS || '3'),
    },
    middleware: {
      enableLogging: process.env.X402_ENABLE_LOGGING !== 'false',
      ...(process.env.X402_SKIP_PATHS && { skipPaths: process.env.X402_SKIP_PATHS.split(',') }),
    },
  };
}
