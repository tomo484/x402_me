// ウォレットカスタムフック - ウォレット状態管理・接続管理を担当
'use client';

import { useEffect } from 'react';
import { useWalletStore, initializeWalletStore, cleanupWalletStore } from '../stores/wallet';
import { WALLET_CONFIG } from '../lib/wallet/config';

export const useWallet = () => {
  const store = useWalletStore();

  // 初期化とクリーンアップ
  useEffect(() => {
    initializeWalletStore();
    
    return () => {
      cleanupWalletStore();
    };
  }, []);

  // 便利な状態判定
  const canConnect = !store.isConnected && !store.isConnecting;
  const canDisconnect = store.isConnected && !store.isConnecting;
  const needsChainSwitch = store.isConnected && store.chainId !== WALLET_CONFIG.defaultChain.id;

  // チェーン情報
  const currentChain = WALLET_CONFIG.chains.find(chain => chain.id === store.chainId);
  const isOnSupportedChain = !!currentChain;

  return {
    // 状態
    ...store,
    
    // 計算された状態
    canConnect,
    canDisconnect,
    needsChainSwitch,
    currentChain,
    isOnSupportedChain,
    
    // 設定
    supportedChains: WALLET_CONFIG.chains,
    defaultChain: WALLET_CONFIG.defaultChain,
    
    // アクション（ストアから直接使用）
    connect: store.connect,
    disconnect: store.disconnect,
    switchChain: store.switchChain,
  };
};

// ウォレット接続状態のみを監視する軽量フック
export const useWalletConnection = () => {
  const { isConnected, isConnecting, address, error } = useWalletStore();
  
  return {
    isConnected,
    isConnecting,
    address,
    error,
  };
};

// チェーン情報のみを監視するフック
export const useWalletChain = () => {
  const { chainId, switchChain } = useWalletStore();
  const currentChain = WALLET_CONFIG.chains.find(chain => chain.id === chainId);
  
  return {
    chainId,
    currentChain,
    supportedChains: WALLET_CONFIG.chains,
    switchChain,
    isOnSupportedChain: !!currentChain,
  };
}; 