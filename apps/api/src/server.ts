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
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3002'], // フロントエンドのURL
  credentials: true,
  exposedHeaders: ['X-PAYMENT-REQUIRED', 'X-PAYMENT-RESPONSE'] // x402ヘッダーを公開
})); // CORS設定
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

// ルート設定
import premiumRoutes from './routes/premium';

// 基本的なAPIルート
app.get('/api/health', (req, res) => {
  res.json({ message: 'x402 Payment Middleware API is running!' });
});

// プレミアムコンテンツルート
app.use('/api', premiumRoutes);

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