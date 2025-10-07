-- x402 Payment Middleware - PostgreSQL初期化スクリプト
-- データベースの基本設定とエクステンションのインストール

-- 必要なエクステンションの有効化
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- タイムゾーンの設定
SET timezone = 'UTC';

-- 基本的な権限設定
GRANT ALL PRIVILEGES ON DATABASE x402_middleware TO x402_user;

-- 初期化完了のログ
SELECT 'x402 Payment Middleware database initialized successfully!' as message; 