// 支払いフローUI - 支払い手順・進捗・結果表示を担当
'use client';

import { usePayment } from '../../hooks/usePayment';
import { X402Parser } from '../../lib/x402/parser';

interface PaymentFlowProps {
  resourcePath: string;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export default function PaymentFlow({ resourcePath, onSuccess, onError }: PaymentFlowProps) {
  const {
    step,
    progress,
    requirements,
    error,
    result,
    isProcessing,
    canMakePayment,
    localizedError,
    startPayment,
    resetPayment,
  } = usePayment();

  // 支払い実行
  const handlePayment = async () => {
    console.log('🚀 Payment started');
    console.log('📊 Current step:', step);
    console.log('🔗 Wallet connected:', canMakePayment);
    
    try {
      console.log('📤 Calling startPayment with path:', resourcePath);
      await startPayment(resourcePath);
      
      console.log('✅ startPayment completed');
      console.log('📋 Current result:', result);
      
      if (result?.success && onSuccess) {
        console.log('🎉 Payment successful, calling onSuccess');
        onSuccess(result.data);
      }
    } catch (err) {
      console.error('❌ Payment error:', err);
      const errorMessage = err instanceof Error ? err.message : '支払いに失敗しました';
      if (onError) {
        onError(errorMessage);
      }
    }
  };

  // ステップ表示用のアイコンとテキスト
  const getStepInfo = (currentStep: string) => {
    const steps = {
      idle: { icon: '🏁', label: '待機中', description: '支払いの準備ができています' },
      payment_required: { icon: '💳', label: '支払い要求', description: '支払い情報を確認中...' },
      signing: { icon: '✍️', label: '署名作成', description: 'ウォレットで署名を作成中...' },
      verifying: { icon: '🔍', label: '検証中', description: 'サーバーで支払いを検証中...' },
      completed: { icon: '✅', label: '完了', description: '支払いが正常に完了しました' },
      failed: { icon: '❌', label: '失敗', description: '支払いに失敗しました' },
    };
    return steps[currentStep as keyof typeof steps] || steps.idle;
  };

  const stepInfo = getStepInfo(step);

  // 進捗バー
  const ProgressBar = () => (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
      <div
        className={`h-2 rounded-full transition-all duration-500 ${
          step === 'failed' ? 'bg-red-500' : step === 'completed' ? 'bg-green-500' : 'bg-blue-500'
        }`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );

  // 支払い要件表示
  const PaymentRequirements = () => {
    if (!requirements) return null;

    const formatted = X402Parser.formatPaymentRequirements(requirements);

    return (
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <h4 className="font-medium text-gray-900 mb-3">支払い詳細</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">金額:</span>
            <span className="font-medium">{formatted.amount} {formatted.currency}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">ネットワーク:</span>
            <span className="font-medium">{formatted.network}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">送金先:</span>
            <span className="font-mono text-xs">{formatted.recipient}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">有効期限:</span>
            <span className="text-xs">{formatted.expires}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">{stepInfo.icon}</div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">
          {stepInfo.label}
        </h3>
        <p className="text-sm text-gray-600">{stepInfo.description}</p>
      </div>

      <ProgressBar />

      {/* エラー表示 */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-red-700">{localizedError}</p>
          </div>
        </div>
      )}

      {/* 支払い要件表示 */}
      <PaymentRequirements />

      {/* 成功時のデータ表示 */}
      {step === 'completed' && result?.data && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <h4 className="font-medium text-green-800 mb-2">取得したコンテンツ</h4>
          <pre className="text-sm text-green-700 whitespace-pre-wrap overflow-x-auto">
            {typeof result.data === 'string' ? result.data : JSON.stringify(result.data, null, 2)}
          </pre>
        </div>
      )}

      {/* アクションボタン */}
      <div className="flex space-x-3">
        {step === 'idle' && (
          <button
            onClick={handlePayment}
            disabled={!canMakePayment || isProcessing}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? '処理中...' : '支払いを開始'}
          </button>
        )}

        {(step === 'completed' || step === 'failed') && (
          <button
            onClick={resetPayment}
            className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-md font-medium hover:bg-gray-700"
          >
            リセット
          </button>
        )}

        {step === 'failed' && (
          <button
            onClick={handlePayment}
            disabled={!canMakePayment}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            再試行
          </button>
        )}
      </div>

      {/* 処理中のローディング表示 */}
      {isProcessing && step !== 'idle' && (
        <div className="mt-4 flex items-center justify-center text-sm text-gray-600">
          <svg className="animate-spin -ml-1 mr-3 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          処理中です。しばらくお待ちください...
        </div>
      )}
    </div>
  );
} 