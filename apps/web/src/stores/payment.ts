// 支払い状態管理 - Zustandを使用した支払い関連状態を担当
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { PaymentRequirements, PaymentPayload } from '@x402/shared';
import type { PaymentFlowState, PaymentResult } from '../lib/x402/types';
import { x402Client } from '../lib/x402/client';

interface PaymentStore extends PaymentFlowState {
  // 追加状態
  isProcessing: boolean;
  result: PaymentResult | null;
  
  // アクション
  startPaymentFlow: (path: string, signPayment: (requirements: PaymentRequirements) => Promise<PaymentPayload>) => Promise<void>;
  resetPaymentFlow: () => void;
  
  // 内部状態更新
  _setStep: (step: PaymentFlowState['step']) => void;
  _setRequirements: (requirements: PaymentRequirements) => void;
  _setPayload: (payload: PaymentPayload) => void;
  _setError: (error: string | null) => void;
  _setProcessing: (processing: boolean) => void;
  _setResult: (result: PaymentResult | null) => void;
}

export const usePaymentStore = create<PaymentStore>()(
  devtools(
    (set, get) => ({
      // 初期状態
      step: 'idle',
      isProcessing: false,
      result: null,

      // 支払いフロー開始
      startPaymentFlow: async (path: string, signPayment: (requirements: PaymentRequirements) => Promise<PaymentPayload>) => {
        console.log('🏪 PaymentStore.startPaymentFlow called with path:', path);
        const { _setStep, _setRequirements, _setPayload, _setError, _setProcessing, _setResult } = get();
        
        try {
          console.log('⚙️ Setting processing state');
          _setProcessing(true);
          _setError(null);
          _setResult(null);
          _setStep('payment_required');

          console.log('📡 Calling x402Client.executePaymentFlow');
          const result = await x402Client.executePaymentFlow(
            path,
            async (requirements: PaymentRequirements) => {
              console.log('📋 Payment requirements received:', requirements);
              _setRequirements(requirements);
              _setStep('signing');
              
              console.log('✍️ Creating payment signature');
              const payload = await signPayment(requirements);
              console.log('📦 Payment payload created:', payload);
              _setPayload(payload);
              _setStep('verifying');
              
              return payload;
            }
          );

          console.log('📊 Payment flow result:', result);
          _setResult(result);
          
          if (result.success) {
            console.log('✅ Payment successful');
            _setStep('completed');
          } else {
            console.log('❌ Payment failed:', result.error);
            _setStep('failed');
            _setError(result.error || 'Payment failed');
          }

        } catch (error) {
          console.error('💥 Payment flow error:', error);
          const errorMessage = error instanceof Error ? error.message : 'Payment flow error';
          _setError(errorMessage);
          _setStep('failed');
          _setResult({ success: false, error: errorMessage });
        } finally {
          console.log('🏁 Payment flow finished, setting processing to false');
          _setProcessing(false);
        }
      },

      // 支払いフローリセット
      resetPaymentFlow: () => {
        const resetData: Partial<PaymentStore> = {
          step: 'idle',
          isProcessing: false,
          result: null,
        };
        
        // オプショナルプロパティは削除
        set(resetData, false, 'payment/reset');
      },

      // 内部状態更新メソッド
      _setStep: (step: PaymentFlowState['step']) => {
        set({ step }, false, 'payment/_setStep');
      },

      _setRequirements: (requirements: PaymentRequirements) => {
        set({ requirements }, false, 'payment/_setRequirements');
      },

      _setPayload: (payload: PaymentPayload) => {
        set({ payload, txHash: payload.txHash }, false, 'payment/_setPayload');
      },

      _setError: (error: string | null) => {
        if (error) {
          set({ error }, false, 'payment/_setError');
        } else {
          // errorをundefinedにリセット（プロパティを削除）
          set((state) => {
            const { error: _, ...newState } = state;
            return newState;
          }, false, 'payment/_setError');
        }
      },

      _setProcessing: (processing: boolean) => {
        set({ isProcessing: processing }, false, 'payment/_setProcessing');
      },

      _setResult: (result: PaymentResult | null) => {
        set({ result }, false, 'payment/_setResult');
      },
    }),
    { name: 'payment-store' }
  )
);

// 支払い状態の便利な選択子
export const usePaymentSelectors = () => {
  const store = usePaymentStore();
  
  return {
    // 状態判定
    isIdle: store.step === 'idle',
    isPaymentRequired: store.step === 'payment_required',
    isSigning: store.step === 'signing',
    isVerifying: store.step === 'verifying',
    isCompleted: store.step === 'completed',
    isFailed: store.step === 'failed',
    
    // 進行状況
    progress: getPaymentProgress(store.step),
    
    // エラー状態
    hasError: !!store.error,
    
    // 完了状態
    isSuccess: store.step === 'completed' && store.result?.success,
  };
};

// 進行状況計算
function getPaymentProgress(step: PaymentFlowState['step']): number {
  switch (step) {
    case 'idle': return 0;
    case 'payment_required': return 25;
    case 'signing': return 50;
    case 'verifying': return 75;
    case 'completed': return 100;
    case 'failed': return 0;
    default: return 0;
  }
} 