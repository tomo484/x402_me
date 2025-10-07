// ウォレット状態管理 - Zustandを使用したウォレット関連状態を担当
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { smartWallet, type SmartWalletState } from '../lib/wallet/smart-wallet';

interface WalletStore extends SmartWalletState {
  // アクション
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  switchChain: (chainId: number) => Promise<void>;
  
  // 状態
  isConnecting: boolean;
  error: string | null;
  
  // 内部メソッド
  _setConnecting: (connecting: boolean) => void;
  _setError: (error: string | null) => void;
  _updateState: (state: SmartWalletState) => void;
}

export const useWalletStore = create<WalletStore>()(
  devtools(
    (set, get) => ({
      // 初期状態
      isConnected: false,
      isConnecting: false,
      error: null,

      // ウォレット接続
      connect: async () => {
        const { _setConnecting, _setError } = get();
        
        try {
          _setConnecting(true);
          _setError(null);
          
          await smartWallet.connect();
          
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to connect wallet';
          _setError(errorMessage);
          console.error('Wallet connection failed:', error);
        } finally {
          _setConnecting(false);
        }
      },

      // ウォレット切断
      disconnect: async () => {
        try {
          await smartWallet.disconnect();
        } catch (error) {
          console.error('Wallet disconnection failed:', error);
        }
      },

      // チェーン切り替え
      switchChain: async (chainId: number) => {
        const { _setError } = get();
        
        try {
          _setError(null);
          await smartWallet.switchChain(chainId);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to switch chain';
          _setError(errorMessage);
          console.error('Chain switch failed:', error);
        }
      },

      // 内部状態更新メソッド
      _setConnecting: (connecting: boolean) => {
        set({ isConnecting: connecting }, false, 'wallet/_setConnecting');
      },

      _setError: (error: string | null) => {
        set({ error }, false, 'wallet/_setError');
      },

      _updateState: (walletState: SmartWalletState) => {
        const updateData: Partial<WalletStore> = {
          isConnected: walletState.isConnected,
        };

        if (walletState.address) {
          updateData.address = walletState.address;
        }

        if (walletState.chainId) {
          updateData.chainId = walletState.chainId;
        }

        if (walletState.client) {
          updateData.client = walletState.client;
        }

        set(updateData, false, 'wallet/_updateState');
      },
    }),
    { name: 'wallet-store' }
  )
);

// SmartWallet状態変更の監視設定
let unsubscribe: (() => void) | null = null;

export const initializeWalletStore = () => {
  // 既存の監視を解除
  if (unsubscribe) {
    unsubscribe();
  }

  // SmartWalletの状態変更を監視
  unsubscribe = smartWallet.subscribe((walletState) => {
    useWalletStore.getState()._updateState(walletState);
  });

  // 初期状態を同期
  const currentState = smartWallet.getState();
  useWalletStore.getState()._updateState(currentState);
};

// クリーンアップ
export const cleanupWalletStore = () => {
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }
}; 