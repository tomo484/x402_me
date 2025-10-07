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