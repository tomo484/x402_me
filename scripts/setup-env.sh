#!/bin/bash

# x402 Payment Middleware - Environment Setup Script

set -e

echo "🚀 x402 Payment Middleware 環境設定セットアップ"
echo "================================================"

# プロジェクトルートディレクトリの確認
if [ ! -f "package.json" ]; then
    echo "❌ エラー: プロジェクトルートディレクトリから実行してください"
    exit 1
fi

# .envファイルの作成（存在しない場合）
if [ ! -f ".env" ]; then
    echo "📝 ルート.envファイルを作成しています..."
    cp env.example .env
    echo "✅ .env ファイルが作成されました"
else
    echo "⚠️  .env ファイルが既に存在します"
fi

# apps/api/.envファイルの作成
echo "📝 API サーバー用.envファイルを作成しています..."
mkdir -p apps/api
cat > apps/api/.env << 'EOF'
# API Server Environment Variables

# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
DATABASE_URL="postgresql://x402_user:x402_password@localhost:5432/x402_middleware?schema=public"

# Redis Configuration
REDIS_URL="redis://:x402_redis_password@localhost:6379"

# x402 Configuration
X402_MODE="facilitator"
X402_NETWORK="base-sepolia"
X402_ASSET="USDC"
RECEIVER_ADDRESS="0x..."

# CDP Facilitator Configuration
CDP_API_KEY="your_cdp_api_key"
CDP_BASE_URL="https://api.coinbase.com/api/v2"

# Security Configuration
JWT_SECRET="your-super-secret-jwt-key"
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging Configuration
LOG_LEVEL="info"
LOG_FORMAT="json"
EOF

# apps/web/.envファイルの作成
echo "📝 Web クライアント用.envファイルを作成しています..."
mkdir -p apps/web
cat > apps/web/.env.local << 'EOF'
# Web Client Environment Variables

# API Configuration
NEXT_PUBLIC_API_BASE_URL="http://localhost:3001"

# Blockchain Configuration
NEXT_PUBLIC_CHAIN_ID="84532"  # Base Sepolia
NEXT_PUBLIC_PROJECT_ID="your_walletconnect_project_id"

# Development Configuration
NODE_ENV=development
EOF

echo ""
echo "✅ 環境設定セットアップが完了しました！"
echo ""
echo "📋 次のステップ:"
echo "1. .env ファイルを編集して適切な値を設定してください"
echo "2. apps/api/.env ファイルを確認してください"
echo "3. apps/web/.env.local ファイルを確認してください"
echo ""
echo "🔧 設定が必要な主要項目:"
echo "- RECEIVER_ADDRESS: 支払いを受け取るウォレットアドレス"
echo "- CDP_API_KEY: Coinbase Developer Platform APIキー"
echo "- NEXT_PUBLIC_PROJECT_ID: WalletConnect Project ID"
echo "- JWT_SECRET: JWT署名用のシークレットキー" 