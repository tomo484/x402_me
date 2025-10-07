# フェーズ1 実装コードサマリー

## 概要
フェーズ1「プロジェクト基盤構築」で実装されたコード関連ファイルの内容をまとめています。
設定ファイル（tsconfig.json、package.json等）は除き、実装されたビジネスロジックや型定義を記録します。

---

## 1. 共通型定義 (packages/shared)

### 1.1 決済関連型定義 (`packages/shared/src/types/PaymentTypes.ts`)

```typescript
import { z } from 'zod';

// ======================================================================
// Payment Value Objects (DDD軽量版)
// ======================================================================

/**
 * 支払い金額の値オブジェクト
 */
export const PaymentAmountSchema = z.object({
  amount: z.string().regex(/^\d+$/), // bigint文字列表現
  currency: z.string().min(1),
  decimals: z.number().int().min(0).max(18),
});

export type PaymentAmount = z.infer<typeof PaymentAmountSchema>;

/**
 * ネットワーク設定
 */
export const NetworkSchema = z.object({
  name: z.enum(['base-sepolia', 'base-mainnet', 'ethereum', 'polygon']),
  chainId: z.number().int(),
  rpcUrl: z.string().url(),
  receiverAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  nativeCurrency: z.object({
    name: z.string(),
    symbol: z.string(),
    decimals: z.number().int(),
  }),
});

export type Network = z.infer<typeof NetworkSchema>;

// ======================================================================
// x402 Payment Requirements (RFC準拠)
// ======================================================================

/**
 * x402 Payment Requirements (402応答)
 */
export const PaymentRequirementsSchema = z.object({
  scheme: z.literal('https://rfc.x402.org/schemes/eip3009'),
  network: z.string(),
  maxAmountRequired: z.string(), // wei単位の文字列
  asset: z.string(),
  payTo: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  resource: z.string(),
  nonce: z.string(),
  validUntil: z.string().datetime(), // ISO8601
});

export type PaymentRequirements = z.infer<typeof PaymentRequirementsSchema>;

/**
 * x402 Payment Payload (クライアントからの支払い情報)
 */
export const PaymentPayloadSchema = z.object({
  scheme: z.literal('https://rfc.x402.org/schemes/eip3009'),
  txHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/),
  from: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  to: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  value: z.string(), // wei単位の文字列
  asset: z.string(),
  nonce: z.string(),
  signature: z.string(),
  blockNumber: z.number().int().optional(),
  blockHash: z.string().optional(),
});

export type PaymentPayload = z.infer<typeof PaymentPayloadSchema>;

// ======================================================================
// Payment Processing States
// ======================================================================

/**
 * 支払い状態
 */
export const PaymentStatusSchema = z.enum([
  'pending',    // 処理中
  'verified',   // 検証済み
  'settled',    // 決済完了
  'failed',     // 失敗
  'expired',    // 期限切れ
  'refunded',   // 返金済み
]);

export type PaymentStatus = z.infer<typeof PaymentStatusSchema>;

/**
 * 支払い記録
 */
export const PaymentRecordSchema = z.object({
  id: z.string().uuid(),
  txHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/),
  from: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  to: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  amount: PaymentAmountSchema,
  resource: z.string(),
  nonce: z.string(),
  status: PaymentStatusSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  metadata: z.record(z.any()).optional(),
});

export type PaymentRecord = z.infer<typeof PaymentRecordSchema>;

// ======================================================================
// Facilitator Integration Types
// ======================================================================

/**
 * Facilitator検証リクエスト
 */
export const FacilitatorVerifyRequestSchema = z.object({
  paymentPayload: PaymentPayloadSchema,
  requirements: PaymentRequirementsSchema,
});

export type FacilitatorVerifyRequest = z.infer<typeof FacilitatorVerifyRequestSchema>;

/**
 * Facilitator検証レスポンス
 */
export const FacilitatorVerifyResponseSchema = z.object({
  valid: z.boolean(),
  transactionHash: z.string().optional(),
  blockNumber: z.number().int().optional(),
  blockHash: z.string().optional(),
  error: z.string().optional(),
});

export type FacilitatorVerifyResponse = z.infer<typeof FacilitatorVerifyResponseSchema>;

/**
 * Facilitator決済リクエスト
 */
export const FacilitatorSettleRequestSchema = z.object({
  verificationResult: FacilitatorVerifyResponseSchema,
  paymentPayload: PaymentPayloadSchema,
});

export type FacilitatorSettleRequest = z.infer<typeof FacilitatorSettleRequestSchema>;

/**
 * Facilitator決済レスポンス
 */
export const FacilitatorSettleResponseSchema = z.object({
  settled: z.boolean(),
  paymentId: z.string().uuid().optional(),
  transactionHash: z.string().optional(),
  error: z.string().optional(),
});

export type FacilitatorSettleResponse = z.infer<typeof FacilitatorSettleResponseSchema>;
```

### 1.2 x402プロトコル型定義 (`packages/shared/src/types/X402Types.ts`)

```typescript
import { z } from 'zod';

// ======================================================================
// x402 Protocol Types
// ======================================================================

/**
 * x402 HTTPヘッダー
 */
export const X402HeadersSchema = z.object({
  'X-PAYMENT': z.string().optional(),
  'X-PAYMENT-RESPONSE': z.string().optional(),
  'X-PAYMENT-REQUIRED': z.string().optional(),
});

export type X402Headers = z.infer<typeof X402HeadersSchema>;

/**
 * x402 エラーレスポンス
 */
export const X402ErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.record(z.any()).optional(),
  timestamp: z.string().datetime(),
});

export type X402Error = z.infer<typeof X402ErrorSchema>;

/**
 * nonce管理
 */
export const NonceSchema = z.object({
  value: z.string().length(32), // 32文字のランダム文字列
  createdAt: z.string().datetime(),
  expiresAt: z.string().datetime(),
  used: z.boolean(),
  resource: z.string(),
});

export type Nonce = z.infer<typeof NonceSchema>;

/**
 * レート制限設定
 */
export const RateLimitConfigSchema = z.object({
  windowMs: z.number().int().positive(),
  maxRequests: z.number().int().positive(),
  skipSuccessfulRequests: z.boolean().default(false),
  skipFailedRequests: z.boolean().default(false),
});

export type RateLimitConfig = z.infer<typeof RateLimitConfigSchema>;

/**
 * レート制限状態
 */
export const RateLimitStateSchema = z.object({
  identifier: z.string(), // IP or wallet address
  count: z.number().int().nonnegative(),
  resetTime: z.string().datetime(),
  blocked: z.boolean(),
});

export type RateLimitState = z.infer<typeof RateLimitStateSchema>;
```

### 1.3 API型定義 (`packages/shared/src/types/ApiTypes.ts`)

```typescript
import { z } from 'zod';

// ======================================================================
// API Request/Response Types
// ======================================================================

/**
 * 基本APIレスポンス
 */
export const BaseApiResponseSchema = z.object({
  success: z.boolean(),
  timestamp: z.string().datetime(),
  message: z.string().optional(),
});

export type BaseApiResponse = z.infer<typeof BaseApiResponseSchema>;

/**
 * エラーAPIレスポンス
 */
export const ErrorApiResponseSchema = BaseApiResponseSchema.extend({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.record(z.any()).optional(),
  }),
});

export type ErrorApiResponse = z.infer<typeof ErrorApiResponseSchema>;

/**
 * ヘルスチェックレスポンス
 */
export const HealthCheckResponseSchema = z.object({
  status: z.enum(['healthy', 'unhealthy']),
  timestamp: z.string().datetime(),
  uptime: z.number().optional(),
  environment: z.string().optional(),
  version: z.string().optional(),
  services: z.record(z.string()).optional(),
});

export type HealthCheckResponse = z.infer<typeof HealthCheckResponseSchema>;

/**
 * ページネーション設定
 */
export const PaginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type Pagination = z.infer<typeof PaginationSchema>;

/**
 * ページネーション付きレスポンス
 */
export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  BaseApiResponseSchema.extend({
    success: z.literal(true),
    data: z.array(dataSchema),
    pagination: z.object({
      page: z.number().int(),
      limit: z.number().int(),
      total: z.number().int(),
      pages: z.number().int(),
      hasNext: z.boolean(),
      hasPrev: z.boolean(),
    }),
  });

/**
 * CSV エクスポートリクエスト
 */
export const CsvExportRequestSchema = z.object({
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  currency: z.string().optional(),
  includeRefunds: z.boolean().default(false),
});

export type CsvExportRequest = z.infer<typeof CsvExportRequestSchema>;
```

---

## 2. ユーティリティ関数 (packages/shared)

### 2.1 暗号化ユーティリティ (`packages/shared/src/utils/crypto.ts`)

```typescript
import { randomBytes, createHash, timingSafeEqual } from 'crypto';

/**
 * セキュアなランダムnonceを生成
 */
export function generateNonce(length: number = 32): string {
  return randomBytes(length / 2).toString('hex');
}

/**
 * ランダムなJWTシークレットを生成
 */
export function generateJwtSecret(): string {
  return randomBytes(64).toString('base64');
}

/**
 * SHA256ハッシュを生成
 */
export function sha256(data: string): string {
  return createHash('sha256').update(data, 'utf8').digest('hex');
}

/**
 * タイミング攻撃に安全な文字列比較
 */
export function safeStringCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  
  const bufferA = Buffer.from(a, 'utf8');
  const bufferB = Buffer.from(b, 'utf8');
  
  return timingSafeEqual(bufferA, bufferB);
}

/**
 * Base64エンコード/デコード
 */
export const base64 = {
  encode: (data: string): string => Buffer.from(data, 'utf8').toString('base64'),
  decode: (data: string): string => Buffer.from(data, 'base64').toString('utf8'),
  urlEncode: (data: string): string => 
    Buffer.from(data, 'utf8').toString('base64url'),
  urlDecode: (data: string): string => 
    Buffer.from(data, 'base64url').toString('utf8'),
};

/**
 * UUIDv4生成（シンプル版）
 */
export function generateUuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
```

### 2.2 ネットワーク定数 (`packages/shared/src/constants/networks.ts`)

```typescript
import type { Network } from '../types/PaymentTypes';

/**
 * サポートされているネットワーク設定
 */
export const NETWORKS: Record<string, Network> = {
  'base-sepolia': {
    name: 'base-sepolia',
    chainId: 84532,
    rpcUrl: 'https://sepolia.base.org',
    receiverAddress: '0x0000000000000000000000000000000000000000', // 実際の設定が必要
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  'base-mainnet': {
    name: 'base-mainnet',
    chainId: 8453,
    rpcUrl: 'https://mainnet.base.org',
    receiverAddress: '0x0000000000000000000000000000000000000000', // 実際の設定が必要
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  ethereum: {
    name: 'ethereum',
    chainId: 1,
    rpcUrl: 'https://mainnet.infura.io/v3/', // API KEY が必要
    receiverAddress: '0x0000000000000000000000000000000000000000', // 実際の設定が必要
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  polygon: {
    name: 'polygon',
    chainId: 137,
    rpcUrl: 'https://polygon-rpc.com/',
    receiverAddress: '0x0000000000000000000000000000000000000000', // 実際の設定が必要
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
} as const;

/**
 * デフォルトネットワーク
 */
export const DEFAULT_NETWORK = NETWORKS['base-sepolia'];

/**
 * サポートされている資産
 */
export const SUPPORTED_ASSETS = {
  USDC: {
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    addresses: {
      'base-sepolia': '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
      'base-mainnet': '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
      ethereum: '0xA0b86a33E6441d62B37e0fF0dE2a7A6AD3a9C9A1',
      polygon: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    },
  },
  ETH: {
    symbol: 'ETH',
    name: 'Ethereum',
    decimals: 18,
    addresses: {
      'base-sepolia': '0x0000000000000000000000000000000000000000',
      'base-mainnet': '0x0000000000000000000000000000000000000000',
      ethereum: '0x0000000000000000000000000000000000000000',
      polygon: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
    },
  },
} as const;
```

---

## 3. APIサーバー実装 (apps/api)

### 3.1 メインサーバー (`apps/api/src/server.ts`)

```typescript
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';

// 環境変数の読み込み
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

// ミドルウェアの設定
app.use(helmet()); // セキュリティヘッダー
app.use(cors()); // CORS設定
app.use(compression()); // レスポンス圧縮
app.use(morgan('combined')); // アクセスログ
app.use(express.json({ limit: '10mb' })); // JSON解析
app.use(express.urlencoded({ extended: true })); // URL-encoded解析

// ヘルスチェックエンドポイント
app.get('/healthz', async (req, res) => {
  try {
    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: '0.1.0',
      services: {
        database: 'pending', // TODO: 実際のDB接続チェック
        redis: 'pending',    // TODO: 実際のRedis接続チェック
        facilitator: 'pending' // TODO: Facilitator接続チェック
      }
    };

    res.status(200).json(healthStatus);
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// 基本的なAPIルート
app.get('/api/health', (req, res) => {
  res.json({ message: 'x402 Payment Middleware API is running!' });
});

// 404ハンドラー
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString()
  });
});

// エラーハンドラー
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
    timestamp: new Date().toISOString()
  });
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`🚀 x402 Payment Middleware API Server started on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/healthz`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
```

---

## 4. Webクライアント実装 (apps/web)

### 4.1 ルートレイアウト (`apps/web/src/app/layout.tsx`)

```typescript
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'x402 Payment Middleware',
  description: 'モジュラー・レイヤードアーキテクチャによる決済ミドルウェア',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
```

### 4.2 メインページ (`apps/web/src/app/page.tsx`)

```typescript
export default function HomePage(): JSX.Element {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          x402 Payment Middleware
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          モジュラー・レイヤードアーキテクチャによる決済ミドルウェア
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">
            🚀 開発環境セットアップ完了
          </h2>
          <p className="text-blue-800">
            x402決済ミドルウェアのWebクライアントが正常に動作しています。
          </p>
        </div>
      </div>
    </main>
  );
}
```

### 4.3 ヘルスチェックAPI (`apps/web/src/app/api/health/route.ts`)

```typescript
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  try {
    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'x402-web-client',
      version: '0.1.0',
      environment: process.env.NODE_ENV || 'development'
    };

    return NextResponse.json(healthStatus);
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 503 }
    );
  }
}
```

---

## 5. パッケージエクスポート設定

### 5.1 共通パッケージエクスポート (`packages/shared/src/index.ts`)

```typescript
// ======================================================================
// x402 Shared Package - Main Exports
// ======================================================================

// Types
export * from './types/PaymentTypes';
export * from './types/X402Types';
export * from './types/ApiTypes';

// Utils
export * from './utils/crypto';

// Constants
export * from './constants/networks';

// Re-export commonly used utilities
export { z } from 'zod';
```

---

## 6. 開発環境確認

### 6.1 実装完了状況
- ✅ 型安全な決済関連型定義（Zod schema）
- ✅ x402プロトコル準拠の型定義
- ✅ セキュアな暗号化ユーティリティ
- ✅ ネットワーク設定の定数管理
- ✅ Express APIサーバーとヘルスチェック
- ✅ Next.js Webクライアントとヘルスチェック
- ✅ モノレポ構成での型共有

### 6.2 動作確認済み
- ✅ pnpm workspaceでの依存関係管理
- ✅ TypeScriptコンパイル（all packages）
- ✅ APIサーバー起動とヘルスチェック応答
- ✅ Docker開発環境（PostgreSQL、Redis）

---

**作成日**: 2025年8月31日  
**フェーズ**: Phase 1 - プロジェクト基盤構築  
**次フェーズ**: Phase 2 - データベース・キャッシュ設計 