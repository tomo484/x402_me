// デモページ - 完全な支払い体験デモを担当
import PremiumContent from '../../components/demo/PremiumContent';

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <PremiumContent
        title="x402 決済デモ"
        description="HTTP 402 Payment Required プロトコルを使用したマイクロペイメントのデモンストレーション"
        resourcePath="/api/premium"
        price="$0.01 USDC"
      />
    </main>
  );
} 