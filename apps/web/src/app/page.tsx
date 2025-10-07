export default function HomePage(): JSX.Element {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          x402 Payment Middleware
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          モジュラー・レイヤードアーキテクチャによる決済ミドルウェア
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">
            🚀 開発環境セットアップ完了
          </h2>
          <p className="text-blue-800">
            x402決済ミドルウェアのWebクライアントが正常に動作しています。
          </p>
        </div>
      </div>
    </main>
  );
} 