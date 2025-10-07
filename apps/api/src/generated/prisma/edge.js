
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/edge.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.PaymentScalarFieldEnum = {
  id: 'id',
  txHash: 'txHash',
  fromAddress: 'fromAddress',
  toAddress: 'toAddress',
  amount: 'amount',
  currency: 'currency',
  decimals: 'decimals',
  resource: 'resource',
  nonce: 'nonce',
  networkName: 'networkName',
  chainId: 'chainId',
  blockNumber: 'blockNumber',
  blockHash: 'blockHash',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  settledAt: 'settledAt',
  metadata: 'metadata'
};

exports.Prisma.PaymentNonceScalarFieldEnum = {
  id: 'id',
  value: 'value',
  resource: 'resource',
  used: 'used',
  createdAt: 'createdAt',
  expiresAt: 'expiresAt',
  usedAt: 'usedAt',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent'
};

exports.Prisma.RateLimitScalarFieldEnum = {
  id: 'id',
  identifier: 'identifier',
  identifierType: 'identifierType',
  requestCount: 'requestCount',
  windowStart: 'windowStart',
  windowEnd: 'windowEnd',
  resource: 'resource',
  blocked: 'blocked',
  blockedUntil: 'blockedUntil',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AuditLogScalarFieldEnum = {
  id: 'id',
  eventType: 'eventType',
  eventData: 'eventData',
  paymentId: 'paymentId',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent',
  success: 'success',
  errorCode: 'errorCode',
  errorMsg: 'errorMsg',
  createdAt: 'createdAt'
};

exports.Prisma.SystemConfigScalarFieldEnum = {
  id: 'id',
  key: 'key',
  value: 'value',
  description: 'description',
  version: 'version',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.PaymentStatus = exports.$Enums.PaymentStatus = {
  PENDING: 'PENDING',
  VERIFIED: 'VERIFIED',
  SETTLED: 'SETTLED',
  FAILED: 'FAILED',
  EXPIRED: 'EXPIRED',
  REFUNDED: 'REFUNDED'
};

exports.RateLimitType = exports.$Enums.RateLimitType = {
  IP: 'IP',
  WALLET: 'WALLET'
};

exports.AuditEventType = exports.$Enums.AuditEventType = {
  PAYMENT_REQUIRED: 'PAYMENT_REQUIRED',
  PAYMENT_RECEIVED: 'PAYMENT_RECEIVED',
  PAYMENT_VERIFIED: 'PAYMENT_VERIFIED',
  PAYMENT_SETTLED: 'PAYMENT_SETTLED',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  NONCE_GENERATED: 'NONCE_GENERATED',
  NONCE_VALIDATED: 'NONCE_VALIDATED',
  RATE_LIMIT_HIT: 'RATE_LIMIT_HIT',
  SECURITY_VIOLATION: 'SECURITY_VIOLATION'
};

exports.Prisma.ModelName = {
  Payment: 'Payment',
  PaymentNonce: 'PaymentNonce',
  RateLimit: 'RateLimit',
  AuditLog: 'AuditLog',
  SystemConfig: 'SystemConfig'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/home/tomotomo/workspace/x402_me/apps/api/src/generated/prisma",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "debian-openssl-3.0.x",
        "native": true
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "/home/tomotomo/workspace/x402_me/apps/api/prisma/schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../../../prisma",
  "clientVersion": "5.22.0",
  "engineVersion": "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "// x402 Payment Middleware - Database Schema\n// Generator and datasource configuration\n\ngenerator client {\n  provider = \"prisma-client-js\"\n  output   = \"../src/generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\n// ============================================================================\n// Core Payment Tables\n// ============================================================================\n\n/// 決済記録テーブル\nmodel Payment {\n  id          String @id @default(uuid()) @db.Uuid\n  txHash      String @unique @map(\"tx_hash\") @db.VarChar(66) // 0x + 64文字\n  fromAddress String @map(\"from_address\") @db.VarChar(42) // 0x + 40文字\n  toAddress   String @map(\"to_address\") @db.VarChar(42) // 0x + 40文字\n\n  // 金額情報\n  amount   String @db.VarChar(78) // bigint文字列 (最大78桁)\n  currency String @db.VarChar(10) // USDC, ETH, etc.\n  decimals Int    @db.SmallInt // 通貨の小数点桁数\n\n  // リソース・nonce\n  resource String @db.VarChar(500) // 保護されたリソースのパス\n  nonce    String @db.VarChar(32) // 32文字のnonce\n\n  // ネットワーク情報\n  networkName String  @map(\"network_name\") @db.VarChar(50)\n  chainId     Int     @map(\"chain_id\")\n  blockNumber BigInt? @map(\"block_number\")\n  blockHash   String? @map(\"block_hash\") @db.VarChar(66)\n\n  // 状態管理\n  status PaymentStatus @default(PENDING)\n\n  // タイムスタンプ\n  createdAt DateTime  @default(now()) @map(\"created_at\") @db.Timestamptz(3)\n  updatedAt DateTime  @updatedAt @map(\"updated_at\") @db.Timestamptz(3)\n  settledAt DateTime? @map(\"settled_at\") @db.Timestamptz(3)\n\n  // メタデータ（JSON形式）\n  metadata Json? @db.JsonB\n\n  // リレーション\n  auditLogs AuditLog[]\n\n  @@index([txHash], name: \"idx_payments_tx_hash\")\n  @@index([fromAddress], name: \"idx_payments_from_address\")\n  @@index([status], name: \"idx_payments_status\")\n  @@index([createdAt], name: \"idx_payments_created_at\")\n  @@index([networkName, chainId], name: \"idx_payments_network\")\n  @@index([resource], name: \"idx_payments_resource\")\n  @@map(\"payments\")\n}\n\n/// 決済状態の列挙型\nenum PaymentStatus {\n  PENDING // 処理中\n  VERIFIED // 検証済み\n  SETTLED // 決済完了\n  FAILED // 失敗\n  EXPIRED // 期限切れ\n  REFUNDED // 返金済み\n\n  @@map(\"payment_status\")\n}\n\n// ============================================================================\n// Security Tables\n// ============================================================================\n\n/// nonce管理テーブル（リプレイ防止）\nmodel PaymentNonce {\n  id       String  @id @default(uuid()) @db.Uuid\n  value    String  @unique @db.VarChar(32) // 32文字のnonce\n  resource String  @db.VarChar(500) // 関連リソース\n  used     Boolean @default(false) // 使用済みフラグ\n\n  // 有効期限\n  createdAt DateTime  @default(now()) @map(\"created_at\") @db.Timestamptz(3)\n  expiresAt DateTime  @map(\"expires_at\") @db.Timestamptz(3)\n  usedAt    DateTime? @map(\"used_at\") @db.Timestamptz(3)\n\n  // 関連情報\n  ipAddress String? @map(\"ip_address\") @db.Inet\n  userAgent String? @map(\"user_agent\") @db.Text\n\n  @@index([value], name: \"idx_nonces_value\")\n  @@index([expiresAt], name: \"idx_nonces_expires_at\")\n  @@index([resource], name: \"idx_nonces_resource\")\n  @@index([createdAt], name: \"idx_nonces_created_at\")\n  @@map(\"payment_nonces\")\n}\n\n/// レート制限テーブル\nmodel RateLimit {\n  id             String        @id @default(uuid()) @db.Uuid\n  identifier     String        @db.VarChar(100) // IP address or wallet address\n  identifierType RateLimitType // IP or WALLET\n\n  // カウント情報\n  requestCount Int      @default(0) @map(\"request_count\")\n  windowStart  DateTime @map(\"window_start\") @db.Timestamptz(3)\n  windowEnd    DateTime @map(\"window_end\") @db.Timestamptz(3)\n\n  // リソース別制限\n  resource String? @db.VarChar(500)\n\n  // 状態\n  blocked      Boolean   @default(false)\n  blockedUntil DateTime? @map(\"blocked_until\") @db.Timestamptz(3)\n\n  // タイムスタンプ\n  createdAt DateTime @default(now()) @map(\"created_at\") @db.Timestamptz(3)\n  updatedAt DateTime @updatedAt @map(\"updated_at\") @db.Timestamptz(3)\n\n  @@unique([identifier, identifierType, resource], name: \"unique_rate_limit\")\n  @@index([identifier], name: \"idx_rate_limits_identifier\")\n  @@index([windowEnd], name: \"idx_rate_limits_window_end\")\n  @@index([blocked], name: \"idx_rate_limits_blocked\")\n  @@map(\"rate_limits\")\n}\n\n/// レート制限の識別子タイプ\nenum RateLimitType {\n  IP // IPアドレス\n  WALLET // ウォレットアドレス\n\n  @@map(\"rate_limit_type\")\n}\n\n// ============================================================================\n// Audit and Logging Tables\n// ============================================================================\n\n/// 監査ログテーブル\nmodel AuditLog {\n  id        String         @id @default(uuid()) @db.Uuid\n  // イベント情報\n  eventType AuditEventType @map(\"event_type\")\n  eventData Json           @map(\"event_data\") @db.JsonB\n\n  // 関連エンティティ\n  paymentId String?  @map(\"payment_id\") @db.Uuid\n  payment   Payment? @relation(fields: [paymentId], references: [id], onDelete: Cascade)\n\n  // リクエスト情報\n  ipAddress String? @map(\"ip_address\") @db.Inet\n  userAgent String? @map(\"user_agent\") @db.Text\n\n  // 結果\n  success   Boolean @default(true)\n  errorCode String? @map(\"error_code\") @db.VarChar(50)\n  errorMsg  String? @map(\"error_message\") @db.Text\n\n  // タイムスタンプ\n  createdAt DateTime @default(now()) @map(\"created_at\") @db.Timestamptz(3)\n\n  @@index([eventType], name: \"idx_audit_logs_event_type\")\n  @@index([paymentId], name: \"idx_audit_logs_payment_id\")\n  @@index([createdAt], name: \"idx_audit_logs_created_at\")\n  @@index([success], name: \"idx_audit_logs_success\")\n  @@map(\"audit_logs\")\n}\n\n// 監査イベントタイプ\nenum AuditEventType {\n  PAYMENT_REQUIRED // 402応答生成\n  PAYMENT_RECEIVED // 支払い情報受信\n  PAYMENT_VERIFIED // 支払い検証\n  PAYMENT_SETTLED // 決済完了\n  PAYMENT_FAILED // 支払い失敗\n  NONCE_GENERATED // nonce生成\n  NONCE_VALIDATED // nonce検証\n  RATE_LIMIT_HIT // レート制限到達\n  SECURITY_VIOLATION // セキュリティ違反\n\n  @@map(\"audit_event_type\")\n}\n\n// ============================================================================\n// Configuration Tables\n// ============================================================================\n\n/// システム設定テーブル\nmodel SystemConfig {\n  id          String  @id @default(uuid()) @db.Uuid\n  key         String  @unique @db.VarChar(100)\n  value       Json    @db.JsonB\n  description String? @db.Text\n\n  // バージョニング\n  version Int @default(1)\n\n  // タイムスタンプ\n  createdAt DateTime @default(now()) @map(\"created_at\") @db.Timestamptz(3)\n  updatedAt DateTime @updatedAt @map(\"updated_at\") @db.Timestamptz(3)\n\n  @@index([key], name: \"idx_system_configs_key\")\n  @@map(\"system_configs\")\n}\n",
  "inlineSchemaHash": "11dfdd961600e07224baf90bf6a4845e2b9d63d3e3bd8e0ca7fe7721ba7e4a95",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"Payment\":{\"dbName\":\"payments\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"txHash\",\"dbName\":\"tx_hash\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fromAddress\",\"dbName\":\"from_address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"toAddress\",\"dbName\":\"to_address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"amount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"currency\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"decimals\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"resource\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nonce\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"networkName\",\"dbName\":\"network_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chainId\",\"dbName\":\"chain_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"blockNumber\",\"dbName\":\"block_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"blockHash\",\"dbName\":\"block_hash\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"PaymentStatus\",\"default\":\"PENDING\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"settledAt\",\"dbName\":\"settled_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"metadata\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"auditLogs\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AuditLog\",\"relationName\":\"AuditLogToPayment\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"決済記録テーブル\"},\"PaymentNonce\":{\"dbName\":\"payment_nonces\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"value\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"resource\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"used\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expiresAt\",\"dbName\":\"expires_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"usedAt\",\"dbName\":\"used_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ipAddress\",\"dbName\":\"ip_address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userAgent\",\"dbName\":\"user_agent\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"nonce管理テーブル（リプレイ防止）\"},\"RateLimit\":{\"dbName\":\"rate_limits\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"identifier\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"identifierType\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RateLimitType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestCount\",\"dbName\":\"request_count\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"windowStart\",\"dbName\":\"window_start\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"windowEnd\",\"dbName\":\"window_end\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"resource\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"blocked\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"blockedUntil\",\"dbName\":\"blocked_until\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[[\"identifier\",\"identifierType\",\"resource\"]],\"uniqueIndexes\":[{\"name\":\"unique_rate_limit\",\"fields\":[\"identifier\",\"identifierType\",\"resource\"]}],\"isGenerated\":false,\"documentation\":\"レート制限テーブル\"},\"AuditLog\":{\"dbName\":\"audit_logs\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"eventType\",\"dbName\":\"event_type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AuditEventType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"eventData\",\"dbName\":\"event_data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"paymentId\",\"dbName\":\"payment_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"payment\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Payment\",\"relationName\":\"AuditLogToPayment\",\"relationFromFields\":[\"paymentId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ipAddress\",\"dbName\":\"ip_address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userAgent\",\"dbName\":\"user_agent\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"success\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"errorCode\",\"dbName\":\"error_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"errorMsg\",\"dbName\":\"error_message\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"監査ログテーブル\"},\"SystemConfig\":{\"dbName\":\"system_configs\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"value\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"version\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"システム設定テーブル\"}},\"enums\":{\"PaymentStatus\":{\"values\":[{\"name\":\"PENDING\",\"dbName\":null},{\"name\":\"VERIFIED\",\"dbName\":null},{\"name\":\"SETTLED\",\"dbName\":null},{\"name\":\"FAILED\",\"dbName\":null},{\"name\":\"EXPIRED\",\"dbName\":null},{\"name\":\"REFUNDED\",\"dbName\":null}],\"dbName\":\"payment_status\",\"documentation\":\"決済状態の列挙型\"},\"RateLimitType\":{\"values\":[{\"name\":\"IP\",\"dbName\":null},{\"name\":\"WALLET\",\"dbName\":null}],\"dbName\":\"rate_limit_type\",\"documentation\":\"レート制限の識別子タイプ\"},\"AuditEventType\":{\"values\":[{\"name\":\"PAYMENT_REQUIRED\",\"dbName\":null},{\"name\":\"PAYMENT_RECEIVED\",\"dbName\":null},{\"name\":\"PAYMENT_VERIFIED\",\"dbName\":null},{\"name\":\"PAYMENT_SETTLED\",\"dbName\":null},{\"name\":\"PAYMENT_FAILED\",\"dbName\":null},{\"name\":\"NONCE_GENERATED\",\"dbName\":null},{\"name\":\"NONCE_VALIDATED\",\"dbName\":null},{\"name\":\"RATE_LIMIT_HIT\",\"dbName\":null},{\"name\":\"SECURITY_VIOLATION\",\"dbName\":null}],\"dbName\":\"audit_event_type\"}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

