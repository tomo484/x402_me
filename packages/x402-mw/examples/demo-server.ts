// packages/x402-mw/examples/demo-server.ts 
// packages/x402-mw/examples/demo-server.ts
import express from 'express';
import { createX402Middleware } from '../src/middleware';
import type { X402MiddlewareConfig } from '../src/middleware';

const app = express();
const PORT = process.env.PORT || 3000;

// ミドルウェア設定
const x402Config: X402MiddlewareConfig = {
  payment: {
    amount: '1000000', // 1 USDC (6 decimals)
    currency: 'USDC',
    decimals: 6,
    networkName: 'base-sepolia',
    chainId: 84532,
    receiverAddress: process.env.X402_RECEIVER_ADDRESS || '0x1234567890123456789012345678901234567890',
  },
  facilitator: {
    apiUrl: process.env.X402_FACILITATOR_API_URL || 'https://api.developer.coinbase.com',
    apiKey: process.env.X402_FACILITATOR_API_KEY || 'your-api-key-here',
  },
  middleware: {
    enableLogging: true,
    skipPaths: ['/health', '/metrics'],
    onPaymentRequired: (req, paymentRequirements) => {
      console.log(`💰 Payment required for ${req.originalUrl}`, {
        amount: paymentRequirements.maxAmountRequired,
        currency: paymentRequirements.asset,
      });
    },
    onPaymentVerified: (req, paymentResult) => {
      console.log(`✅ Payment verified for ${req.originalUrl}`, {
        paymentId: paymentResult.verificationResult.paymentId,
        txHash: paymentResult.verificationResult.facilitatorResponse?.data?.txHash,
      });
    },
    onPaymentFailed: (req, error) => {
      console.log(`❌ Payment failed for ${req.originalUrl}`, {
        reason: error.reason,
      });
    },
  },
};

// x402 ミドルウェア作成
const x402Middleware = createX402Middleware(x402Config);

// 基本ミドルウェア
app.use(express.json());

// ヘルスチェック（支払い不要）
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'x402-demo-server'
  });
});

// 保護されたエンドポイント
app.use('/api/premium', x402Middleware);

app.get('/api/premium/data', (req, res) => {
  // ここに到達 = 支払い完了済み
  res.json({
    message: 'Welcome to premium content!',
    data: {
      secretValue: 42,
      premiumFeature: 'This is only available after payment',
      timestamp: new Date().toISOString(),
      userAgent: req.get('User-Agent'),
    },
    payment: {
      status: 'verified',
      responseHeader: req.get('X-PAYMENT-RESPONSE'),
    },
  });
});

app.get('/api/premium/analytics', x402Middleware, (req, res) => {
  // 別の保護されたエンドポイント
  res.json({
    message: 'Premium Analytics Dashboard',
    data: {
      totalUsers: 1234,
      revenue: '$5,678.90',
      conversionRate: '3.45%',
      timestamp: new Date().toISOString(),
    },
  });
});

// 無料エンドポイント（支払い不要）
app.get('/api/public/info', (req, res) => {
  res.json({
    message: 'This is free public information',
    availablePremiumEndpoints: [
      '/api/premium/data',
      '/api/premium/analytics',
    ],
    paymentRequired: {
      amount: x402Config.payment.amount,
      currency: x402Config.payment.currency,
      network: x402Config.payment.networkName,
    },
  });
});

// Circuit Breaker統計（デバッグ用）
app.get('/debug/circuit-breaker', (req, res) => {
  // 実際の実装では認証が必要
  res.json({
    circuitBreaker: 'stats would be here',
    timestamp: new Date().toISOString(),
  });
});

// エラーハンドリング
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'internal_server_error',
    message: 'Something went wrong',
    timestamp: new Date().toISOString(),
  });
});

// 404ハンドリング
app.use((req, res) => {
  res.status(404).json({
    error: 'not_found',
    message: `Endpoint ${req.method} ${req.path} not found`,
    timestamp: new Date().toISOString(),
  });
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`🚀 X402 Demo Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🔓 Public info: http://localhost:${PORT}/api/public/info`);
  console.log(`🔒 Premium data: http://localhost:${PORT}/api/premium/data`);
  console.log(`💰 Payment required: ${x402Config.payment.amount} ${x402Config.payment.currency}`);
  console.log(`🌐 Network: ${x402Config.payment.networkName}`);
});

export default app;