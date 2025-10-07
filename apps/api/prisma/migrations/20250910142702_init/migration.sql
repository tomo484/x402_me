-- CreateEnum
CREATE TYPE "payment_status" AS ENUM ('PENDING', 'VERIFIED', 'SETTLED', 'FAILED', 'EXPIRED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "rate_limit_type" AS ENUM ('IP', 'WALLET');

-- CreateEnum
CREATE TYPE "audit_event_type" AS ENUM ('PAYMENT_REQUIRED', 'PAYMENT_RECEIVED', 'PAYMENT_VERIFIED', 'PAYMENT_SETTLED', 'PAYMENT_FAILED', 'NONCE_GENERATED', 'NONCE_VALIDATED', 'RATE_LIMIT_HIT', 'SECURITY_VIOLATION');

-- CreateTable
CREATE TABLE "payments" (
    "id" UUID NOT NULL,
    "tx_hash" VARCHAR(66) NOT NULL,
    "from_address" VARCHAR(42) NOT NULL,
    "to_address" VARCHAR(42) NOT NULL,
    "amount" VARCHAR(78) NOT NULL,
    "currency" VARCHAR(10) NOT NULL,
    "decimals" SMALLINT NOT NULL,
    "resource" VARCHAR(500) NOT NULL,
    "nonce" VARCHAR(32) NOT NULL,
    "network_name" VARCHAR(50) NOT NULL,
    "chain_id" INTEGER NOT NULL,
    "block_number" BIGINT,
    "block_hash" VARCHAR(66),
    "status" "payment_status" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "settled_at" TIMESTAMPTZ(3),
    "metadata" JSONB,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_nonces" (
    "id" UUID NOT NULL,
    "value" VARCHAR(32) NOT NULL,
    "resource" VARCHAR(500) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMPTZ(3) NOT NULL,
    "used_at" TIMESTAMPTZ(3),
    "ip_address" INET,
    "user_agent" TEXT,

    CONSTRAINT "payment_nonces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rate_limits" (
    "id" UUID NOT NULL,
    "identifier" VARCHAR(100) NOT NULL,
    "identifierType" "rate_limit_type" NOT NULL,
    "request_count" INTEGER NOT NULL DEFAULT 0,
    "window_start" TIMESTAMPTZ(3) NOT NULL,
    "window_end" TIMESTAMPTZ(3) NOT NULL,
    "resource" VARCHAR(500),
    "blocked" BOOLEAN NOT NULL DEFAULT false,
    "blocked_until" TIMESTAMPTZ(3),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "rate_limits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" UUID NOT NULL,
    "event_type" "audit_event_type" NOT NULL,
    "event_data" JSONB NOT NULL,
    "payment_id" UUID,
    "ip_address" INET,
    "user_agent" TEXT,
    "success" BOOLEAN NOT NULL DEFAULT true,
    "error_code" VARCHAR(50),
    "error_message" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_configs" (
    "id" UUID NOT NULL,
    "key" VARCHAR(100) NOT NULL,
    "value" JSONB NOT NULL,
    "description" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "system_configs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payments_tx_hash_key" ON "payments"("tx_hash");

-- CreateIndex
CREATE INDEX "idx_payments_tx_hash" ON "payments"("tx_hash");

-- CreateIndex
CREATE INDEX "idx_payments_from_address" ON "payments"("from_address");

-- CreateIndex
CREATE INDEX "idx_payments_status" ON "payments"("status");

-- CreateIndex
CREATE INDEX "idx_payments_created_at" ON "payments"("created_at");

-- CreateIndex
CREATE INDEX "idx_payments_network" ON "payments"("network_name", "chain_id");

-- CreateIndex
CREATE INDEX "idx_payments_resource" ON "payments"("resource");

-- CreateIndex
CREATE UNIQUE INDEX "payment_nonces_value_key" ON "payment_nonces"("value");

-- CreateIndex
CREATE INDEX "idx_nonces_value" ON "payment_nonces"("value");

-- CreateIndex
CREATE INDEX "idx_nonces_expires_at" ON "payment_nonces"("expires_at");

-- CreateIndex
CREATE INDEX "idx_nonces_resource" ON "payment_nonces"("resource");

-- CreateIndex
CREATE INDEX "idx_nonces_created_at" ON "payment_nonces"("created_at");

-- CreateIndex
CREATE INDEX "idx_rate_limits_identifier" ON "rate_limits"("identifier");

-- CreateIndex
CREATE INDEX "idx_rate_limits_window_end" ON "rate_limits"("window_end");

-- CreateIndex
CREATE INDEX "idx_rate_limits_blocked" ON "rate_limits"("blocked");

-- CreateIndex
CREATE UNIQUE INDEX "rate_limits_identifier_identifierType_resource_key" ON "rate_limits"("identifier", "identifierType", "resource");

-- CreateIndex
CREATE INDEX "idx_audit_logs_event_type" ON "audit_logs"("event_type");

-- CreateIndex
CREATE INDEX "idx_audit_logs_payment_id" ON "audit_logs"("payment_id");

-- CreateIndex
CREATE INDEX "idx_audit_logs_created_at" ON "audit_logs"("created_at");

-- CreateIndex
CREATE INDEX "idx_audit_logs_success" ON "audit_logs"("success");

-- CreateIndex
CREATE UNIQUE INDEX "system_configs_key_key" ON "system_configs"("key");

-- CreateIndex
CREATE INDEX "idx_system_configs_key" ON "system_configs"("key");

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
