#!/bin/bash

# x402 Payment Middleware - Database Initialization Script

set -e

echo "🗄️  x402 Database 初期化開始"
echo "================================"

# APIディレクトリに移動
cd apps/api

# Prisma Client 生成
echo "📦 Prisma Client を生成しています..."
pnpm prisma generate

# データベースのリセット（開発環境のみ）
if [ "$NODE_ENV" != "production" ]; then
    echo "🔄 データベースをリセットしています（開発環境）..."
    pnpm prisma db push --force-reset
else
    echo "📊 マイグレーションを実行しています（本番環境）..."
    pnpm prisma migrate deploy
fi

# シードデータの投入
echo "🌱 シードデータを投入しています..."
pnpm prisma db seed

echo ""
echo "✅ データベース初期化が完了しました！"
echo ""
echo "📋 確認用コマンド:"
echo "- pnpm prisma studio  # データベースGUI"
echo "- pnpm prisma db pull # スキーマ同期"
echo "- pnpm prisma migrate status # マイグレーション状態"