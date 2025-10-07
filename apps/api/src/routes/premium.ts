// プレミアムコンテンツエンドポイント - x402ミドルウェアのデモ用
import { Router } from 'express';
import { X402Middleware } from '@x402/middleware';
import dotenv from 'dotenv';

// 環境変数の読み込みを確実にする
dotenv.config();

const router: Router = Router();

// 環境変数の確認（デバッグ用）
console.log('🔑 X402_FACILITATOR_API_KEY:', process.env.X402_FACILITATOR_API_KEY ? 'Set' : 'Not Set');
console.log('🌐 X402_FACILITATOR_API_URL:', process.env.X402_FACILITATOR_API_URL);

// x402ミドルウェア設定
const x402Middleware = new X402Middleware({
  payment: {
    amount: '10000',              // 0.01 USDC (6 decimals)
    currency: 'USDC',             // USDC
    decimals: 6,                  // USDC decimals
    networkName: 'base-sepolia',  // Base Sepolia
    chainId: 84532,               // Base Sepolia Chain ID
    receiverAddress: '0x742d35Cc6635C0532925a3b8D0C5e0b6F9b3F4E2', // テスト用アドレス
    nonceExpirationMs: 900000,    // 15分
  },
  facilitator: {
    apiUrl: process.env.X402_FACILITATOR_API_URL || 'https://api.developer.coinbase.com',
    apiKey: process.env.X402_FACILITATOR_API_KEY || '',
    timeout: 30000,
    retryAttempts: 3,
  },
  middleware: {
    enableLogging: true,
    skipPaths: ['/healthz', '/api/health'],
    onPaymentVerified: (req: any, result: any) => {
      console.log(`✅ Payment verified for ${req.originalUrl}`, {
        paymentId: result.paymentId,
        txHash: result.txHash,
      });
    },
    onPaymentFailed: (req: any, error: any) => {
      console.log(`❌ Payment failed for ${req.originalUrl}`, {
        reason: error.reason || error.message,
        error: error,
      });
    },
    onPaymentRequired: (req: any, requirements: any) => {
      console.log(`💰 Payment required for ${req.originalUrl}`, {
        requirements: requirements,
        hasPaymentHeader: !!req.headers['x-payment'],
      });
    },
  },
});

// プレミアムコンテンツエンドポイント（x402保護）
router.get('/premium', (req, res, next) => {
  console.log('🔍 Premium endpoint accessed');
  console.log('📋 Request headers:', req.headers);
  console.log('💳 X-PAYMENT header:', req.headers['x-payment']);
  console.log('🔧 Request method:', req.method);
  console.log('📍 Request URL:', req.originalUrl);
  next();
}, x402Middleware.getMiddleware(), (req, res) => {
  // 支払い完了後のみアクセス可能
  const premiumContent = {
    message: '🎉 プレミアムコンテンツへようこそ！',
    content: {
      title: 'x402決済システム完全ガイド',
      description: 'HTTP 402 Payment Requiredプロトコルを使用したマイクロペイメントの実装方法',
      features: [
        '⚡ 即座の支払い検証',
        '🔒 セキュアなnonce管理',
        '🌐 Base/Ethereum対応',
        '💰 極小手数料（$0.01〜）',
        '🚀 スケーラブルなアーキテクチャ'
      ],
      technicalDetails: {
        protocol: 'x402 (RFC準拠)',
        blockchain: 'Base Sepolia',
        token: 'USDC',
        signature: 'EIP-3009 transferWithAuthorization',
        security: 'nonce + timestamp validation'
      },
      nextSteps: [
        '1. 本番環境へのデプロイ',
        '2. 追加トークンサポート',
        '3. サブスクリプション機能',
        '4. 分析・レポート機能'
      ]
    },
    metadata: {
      accessTime: new Date().toISOString(),
      paymentVerified: true,
      version: '1.0.0'
    }
  };

  res.json(premiumContent);
});

// 無料コンテンツエンドポイント（比較用）
router.get('/free', (req, res) => {
  res.json({
    message: '📖 無料コンテンツです',
    content: 'これは誰でもアクセスできる無料のコンテンツです。',
    upgrade: {
      message: 'プレミアムコンテンツにアクセスするには支払いが必要です',
      price: '$0.01 USDC',
      endpoint: '/api/premium'
    }
  });
});

export default router; 