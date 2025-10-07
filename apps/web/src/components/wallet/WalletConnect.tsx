// ウォレット接続UI - 接続・切断・状態表示を担当
'use client';

import { useWallet } from '../../hooks/useWallet';

export default function WalletConnect() {
  const {
    isConnected,
    isConnecting,
    address,
    chainId,
    currentChain,
    needsChainSwitch,
    defaultChain,
    error,
    connect,
    disconnect,
    switchChain,
  } = useWallet();

  // アドレスの短縮表示
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // エラー表示
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="text-red-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              ウォレットエラー
            </h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={connect}
            disabled={isConnecting}
            className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-50"
          >
            再接続
          </button>
        </div>
      </div>
    );
  }

  // 未接続状態
  if (!isConnected) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            ウォレットを接続
          </h3>
          <p className="text-gray-600 mb-6">
            支払いを行うにはウォレットの接続が必要です
          </p>
          <button
            onClick={connect}
            disabled={isConnecting}
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConnecting ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                接続中...
              </div>
            ) : (
              'ウォレットを接続'
            )}
          </button>
        </div>
      </div>
    );
  }

  // 接続済み状態
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-green-800">
              {address && formatAddress(address)}
            </p>
            <p className="text-xs text-green-600">
              {currentChain?.name || `Chain ID: ${chainId}`}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          {needsChainSwitch && (
            <button
              onClick={() => switchChain(defaultChain.id)}
              className="bg-yellow-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-yellow-700"
            >
              {defaultChain.name}に切替
            </button>
          )}
          <button
            onClick={disconnect}
            className="bg-gray-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-gray-700"
          >
            切断
          </button>
        </div>
      </div>
    </div>
  );
} 