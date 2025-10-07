// プレミアムコンテンツ - 有料コンテンツ表示・アクセス制御を担当
'use client';

import { useState } from 'react';
import WalletConnect from '../wallet/WalletConnect';
import PaymentFlow from '../payment/PaymentFlow';
import { useWallet } from '../../hooks/useWallet';

interface PremiumContentProps {
  title: string;
  description: string;
  resourcePath: string;
  price: string;
}

export default function PremiumContent({ 
  title, 
  description, 
  resourcePath, 
  price 
}: PremiumContentProps) {
  const { isConnected } = useWallet();
  const [contentData, setContentData] = useState<any>(null);
  const [showPaymentFlow, setShowPaymentFlow] = useState(false);

  // 支払い成功時の処理
  const handlePaymentSuccess = (data: any) => {
    setContentData(data);
    setShowPaymentFlow(false);
  };

  // 支払いエラー時の処理
  const handlePaymentError = (error: string) => {
    console.error('Payment failed:', error);
  };

  // コンテンツアクセス開始
  const handleAccessContent = () => {
    setShowPaymentFlow(true);
    setContentData(null);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* ヘッダー */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          {description}
        </p>
        <div className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          💰 {price}
        </div>
      </div>

      {/* ウォレット接続 */}
      <div className="mb-6">
        <WalletConnect />
      </div>

      {/* メインコンテンツ */}
      <div className="space-y-6">
        {/* 取得済みコンテンツ表示 */}
        {contentData && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <h3 className="text-lg font-medium text-green-800">
                プレミアムコンテンツ
              </h3>
            </div>
            <div className="bg-white rounded-lg p-4 border">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap overflow-x-auto">
                {typeof contentData === 'string' ? contentData : JSON.stringify(contentData, null, 2)}
              </pre>
            </div>
            <div className="mt-4">
              <button
                onClick={() => setContentData(null)}
                className="text-sm text-green-700 hover:text-green-800 underline"
              >
                コンテンツを非表示
              </button>
            </div>
          </div>
        )}

        {/* 支払いフロー */}
        {showPaymentFlow && isConnected && (
          <PaymentFlow
            resourcePath={resourcePath}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        )}

        {/* アクセスボタン */}
        {!showPaymentFlow && !contentData && (
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-8 mb-6">
              <div className="text-6xl mb-4">🔒</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                プレミアムコンテンツ
              </h3>
              <p className="text-gray-600 mb-4">
                このコンテンツにアクセスするには支払いが必要です
              </p>
              <div className="text-sm text-gray-500">
                x402 Payment Required プロトコルによる安全な決済
              </div>
            </div>
            
            <button
              onClick={handleAccessContent}
              disabled={!isConnected}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isConnected ? 'コンテンツにアクセス' : 'ウォレットを接続してください'}
            </button>
            
            {!isConnected && (
              <p className="text-sm text-gray-500 mt-2">
                支払いを行うにはウォレットの接続が必要です
              </p>
            )}
          </div>
        )}

        {/* 戻るボタン */}
        {showPaymentFlow && (
          <div className="text-center">
            <button
              onClick={() => setShowPaymentFlow(false)}
              className="text-gray-600 hover:text-gray-800 underline"
            >
              ← 戻る
            </button>
          </div>
        )}
      </div>

      {/* 説明セクション */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          x402決済システムについて
        </h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
              <span className="text-blue-600 font-bold text-xs">1</span>
            </div>
            <div>
              <strong>402 Payment Required:</strong> サーバーが支払い要件を返します
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
              <span className="text-blue-600 font-bold text-xs">2</span>
            </div>
            <div>
              <strong>EIP-3009署名:</strong> ウォレットでUSDC転送を署名します
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
              <span className="text-blue-600 font-bold text-xs">3</span>
            </div>
            <div>
              <strong>検証・決済:</strong> サーバーで署名を検証し、コンテンツを提供
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 