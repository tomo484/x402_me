// packages/x402-mw/src/core/payment/index.ts - エクスポート用 

// メインクラス・サービスのエクスポート
export { X402Generator } from './x402-generator';
export { HeaderParser } from './header-parser';
export { ResourceBinder } from './resource-binder';

// インターフェース・型定義のエクスポート
export type { X402Config, X402GeneratorOptions } from './x402-generator';
export type { ParsedPaymentHeader } from './header-parser';
export type { 
  ResourceConfig, 
  BoundResource 
} from './resource-binder';

// 便利な再エクスポート（@x402/shared から）
export type { 
  PaymentRequirements, 
  PaymentPayload,
  PaymentRequirementsSchema,
  PaymentPayloadSchema
} from '@x402/shared'; 