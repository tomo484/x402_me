import type { Network } from '../types/PaymentTypes';

/**
 * サポートされているネットワーク設定
 */
export const NETWORKS: Record<string, Network> = {
  'base-sepolia': {
    name: 'base-sepolia',
    chainId: 84532,
    rpcUrl: 'https://sepolia.base.org',
    receiverAddress: '0x0000000000000000000000000000000000000000', // 実際の設定が必要
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  'base-mainnet': {
    name: 'base-mainnet',
    chainId: 8453,
    rpcUrl: 'https://mainnet.base.org',
    receiverAddress: '0x0000000000000000000000000000000000000000', // 実際の設定が必要
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  ethereum: {
    name: 'ethereum',
    chainId: 1,
    rpcUrl: 'https://mainnet.infura.io/v3/', // API KEY が必要
    receiverAddress: '0x0000000000000000000000000000000000000000', // 実際の設定が必要
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  polygon: {
    name: 'polygon',
    chainId: 137,
    rpcUrl: 'https://polygon-rpc.com/',
    receiverAddress: '0x0000000000000000000000000000000000000000', // 実際の設定が必要
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
} as const;

/**
 * デフォルトネットワーク
 */
export const DEFAULT_NETWORK = NETWORKS['base-sepolia'];

/**
 * サポートされている資産
 */
export const SUPPORTED_ASSETS = {
  USDC: {
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    addresses: {
      'base-sepolia': '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
      'base-mainnet': '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
      ethereum: '0xA0b86a33E6441d62B37e0fF0dE2a7A6AD3a9C9A1',
      polygon: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    },
  },
  ETH: {
    symbol: 'ETH',
    name: 'Ethereum',
    decimals: 18,
    addresses: {
      'base-sepolia': '0x0000000000000000000000000000000000000000',
      'base-mainnet': '0x0000000000000000000000000000000000000000',
      ethereum: '0x0000000000000000000000000000000000000000',
      polygon: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
    },
  },
} as const; 