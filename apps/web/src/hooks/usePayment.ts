// 支払いカスタムフック - 支払い状態管理・API呼び出しを担当
'use client';

import { useCallback } from 'react';
import { usePaymentStore, usePaymentSelectors } from '../stores/payment';
import { useWallet } from './useWallet';
import { smartWallet } from '../lib/wallet/smart-wallet';
import { getTokenConfig } from '../lib/wallet/config';
import type { PaymentRequirements, PaymentPayload } from '@x402/shared';

export const usePayment = () => {
  const store = usePaymentStore();
  const selectors = usePaymentSelectors();
  const { isConnected, address, chainId } = useWallet();

  // 支払い署名作成関数
  const createPaymentSignature = useCallback(async (requirements: PaymentRequirements): Promise<PaymentPayload> => {
    if (!isConnected || !address || !chainId) {
      throw new Error('Wallet not connected');
    }

    const tokenConfig = getTokenConfig(chainId, 'USDC');
    if (!tokenConfig) {
      throw new Error('USDC not supported on this chain');
    }

    // 金額をBigIntに変換（USDCは6桁の小数点）
    const amount = BigInt(parseFloat(requirements.maxAmountRequired) * Math.pow(10, tokenConfig.decimals));
    
    // 有効期限設定（現在時刻から30分後）
    const validAfter = BigInt(0);
    const validBefore = BigInt(Math.floor(Date.now() / 1000) + 30 * 60);
    
    // nonce をbytes32形式に変換
    const nonceBytes32 = `0x${requirements.nonce.padStart(64, '0')}`;

    // EIP-3009署名作成
    const signature = await smartWallet.signTransferWithAuthorization({
      from: address,
      to: requirements.payTo,
      value: amount,
      validAfter,
      validBefore,
      nonce: nonceBytes32,
    });

    // PaymentPayload構築
    const payload: PaymentPayload = {
      scheme: requirements.scheme,
      txHash: '0x0000000000000000000000000000000000000000000000000000000000000000', // 仮のtxHash
      from: address,
      to: requirements.payTo,
      value: amount.toString(),
      asset: requirements.asset,
      nonce: requirements.nonce,
      signature,
    };

    return payload;
  }, [isConnected, address, chainId]);

  // 支払いフロー開始
  const startPayment = useCallback(async (resourcePath: string) => {
    console.log('🔄 usePayment.startPayment called with:', resourcePath);
    console.log('🔗 Wallet connection status:', { isConnected, address, chainId });
    
    if (!isConnected) {
      console.error('❌ Wallet not connected');
      throw new Error('Wallet not connected');
    }

    console.log('📞 Calling store.startPaymentFlow');
    await store.startPaymentFlow(resourcePath, createPaymentSignature);
    console.log('✅ store.startPaymentFlow completed');
  }, [store.startPaymentFlow, createPaymentSignature, isConnected]);

  // 支払い可能かチェック
  const canMakePayment = isConnected && !store.isProcessing && store.step === 'idle';

  // エラーメッセージの日本語化
  const getLocalizedError = (error: string | null | undefined): string | null => {
    if (!error) return null;

    const errorMap: Record<string, string> = {
      'Wallet not connected': 'ウォレットが接続されていません',
      'Payment failed': '支払いに失敗しました',
      'Payment requirements have expired': '支払い要件の有効期限が切れています',
      'USDC not supported on this chain': 'このチェーンではUSDCがサポートされていません',
      'User rejected the request': 'ユーザーがリクエストを拒否しました',
    };

    return errorMap[error] || error;
  };

  return {
    // 状態
    ...store,
    ...selectors,
    
    // 計算された状態
    canMakePayment,
    localizedError: getLocalizedError(store.error),
    
    // アクション
    startPayment,
    resetPayment: store.resetPaymentFlow,
    
    // ヘルパー
    createPaymentSignature,
  };
};

// 支払い状態のみを監視する軽量フック
export const usePaymentStatus = () => {
  const { step, isProcessing, error } = usePaymentStore();
  const { progress, hasError, isSuccess } = usePaymentSelectors();
  
  return {
    step,
    isProcessing,
    error,
    progress,
    hasError,
    isSuccess,
  };
};

// 支払い要件のみを監視するフック
export const usePaymentRequirements = () => {
  const { requirements } = usePaymentStore();
  
  return {
    requirements,
    hasRequirements: !!requirements,
  };
}; 