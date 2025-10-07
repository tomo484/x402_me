// Coinbase Smart Wallet SDK統合 - ウォレット接続・署名を担当
import { createWalletClient, custom, type WalletClient } from 'viem';
import { WALLET_CONFIG, getTokenConfig } from './config';

export interface SmartWalletState {
  isConnected: boolean;
  address?: string;
  chainId?: number;
  client?: WalletClient;
}

export class SmartWalletManager {
  private state: SmartWalletState = { isConnected: false };
  private listeners: Array<(state: SmartWalletState) => void> = [];

  // 状態変更通知
  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }

  // 状態監視
  subscribe(listener: (state: SmartWalletState) => void) {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) this.listeners.splice(index, 1);
    };
  }

  // ウォレット接続
  async connect(): Promise<void> {
    try {
      if (typeof window === 'undefined' || !window.ethereum) {
        throw new Error('Ethereum provider not found');
      }

      // MetaMask/Coinbase Wallet接続要求
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts returned');
      }

      // チェーンID取得
      const chainId = await window.ethereum.request({
        method: 'eth_chainId',
      });

      // Wallet Client作成
      const client = createWalletClient({
        chain: WALLET_CONFIG.defaultChain,
        transport: custom(window.ethereum),
      });

      this.state = {
        isConnected: true,
        address: accounts[0],
        chainId: parseInt(chainId, 16),
        client,
      };

      this.notifyListeners();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  }

  // ウォレット切断
  async disconnect(): Promise<void> {
    this.state = { isConnected: false };
    this.notifyListeners();
  }

  // 現在の状態取得
  getState(): SmartWalletState {
    return { ...this.state };
  }

  // EIP-3009署名作成
  async signTransferWithAuthorization(params: {
    from: string;
    to: string;
    value: bigint;
    validAfter: bigint;
    validBefore: bigint;
    nonce: string;
  }): Promise<string> {
    if (!this.state.client || !this.state.address) {
      throw new Error('Wallet not connected');
    }

    const tokenConfig = getTokenConfig(this.state.chainId!, 'USDC');
    if (!tokenConfig) {
      throw new Error('Token not supported on this chain');
    }

    // EIP-3009のtypeHashとドメイン設定
    const domain = {
      name: tokenConfig.name,
      version: '2',
      chainId: this.state.chainId!,
      verifyingContract: tokenConfig.address,
    };

    const types = {
      TransferWithAuthorization: [
        { name: 'from', type: 'address' },
        { name: 'to', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'validAfter', type: 'uint256' },
        { name: 'validBefore', type: 'uint256' },
        { name: 'nonce', type: 'bytes32' },
      ],
    };

    // 署名実行
    const signature = await this.state.client.signTypedData({
      account: this.state.address as `0x${string}`,
      domain,
      types,
      primaryType: 'TransferWithAuthorization',
      message: params,
    });

    return signature;
  }

  // チェーン切り替え
  async switchChain(chainId: number): Promise<void> {
    if (!window.ethereum) {
      throw new Error('Ethereum provider not found');
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });

      this.state.chainId = chainId;
      this.notifyListeners();
    } catch (error: any) {
      // チェーンが追加されていない場合は追加
      if (error.code === 4902) {
        const chain = WALLET_CONFIG.chains.find(c => c.id === chainId);
        if (chain) {
          await this.addChain(chain);
        }
      }
      throw error;
    }
  }

  private async addChain(chain: any): Promise<void> {
    if (!window.ethereum) return;

    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: `0x${chain.id.toString(16)}`,
        chainName: chain.name,
        nativeCurrency: chain.nativeCurrency,
        rpcUrls: chain.rpcUrls.default.http,
        blockExplorerUrls: chain.blockExplorers?.default?.url ? [chain.blockExplorers.default.url] : [],
      }],
    });
  }
}

// グローバルインスタンス
export const smartWallet = new SmartWalletManager();

// TypeScript型定義拡張
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, handler: (...args: any[]) => void) => void;
      removeListener: (event: string, handler: (...args: any[]) => void) => void;
    };
  }
} 
