// ウォレット設定 - ネットワーク・Paymaster設定を担当
import { base, baseSepolia } from 'viem/chains';
import type { Chain } from 'viem';

export interface WalletConfig {
  chains: Chain[];
  defaultChain: Chain;
  projectId: string;
  paymasterUrl?: string;
  bundlerUrl?: string;
}

export const WALLET_CONFIG: WalletConfig = {
  chains: [baseSepolia, base],
  defaultChain: baseSepolia, // 開発環境ではSepolia
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
  ...(process.env.NEXT_PUBLIC_PAYMASTER_URL && { paymasterUrl: process.env.NEXT_PUBLIC_PAYMASTER_URL }),
  ...(process.env.NEXT_PUBLIC_BUNDLER_URL && { bundlerUrl: process.env.NEXT_PUBLIC_BUNDLER_URL }),
};

export const SUPPORTED_TOKENS = {
  [baseSepolia.id]: {
    USDC: {
      address: '0x036CbD53842c5426634e7929541eC2318f3dCF7e' as const, // Base Sepolia USDC
      decimals: 6,
      symbol: 'USDC',
      name: 'USD Coin',
    },
  },
  [base.id]: {
    USDC: {
      address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as const, // Base Mainnet USDC
      decimals: 6,
      symbol: 'USDC',
      name: 'USD Coin',
    },
  },
} as const;

export function getTokenConfig(chainId: number, symbol: string) {
  return SUPPORTED_TOKENS[chainId as keyof typeof SUPPORTED_TOKENS]?.[symbol as 'USDC'];
} 
