import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage } from 'wagmi'
import { defineChain } from 'viem'

// 1. Get projectId from https://cloud.walletconnect.com
export const projectId = 'f8ae1db529933f7e9413d85c6b9b8708'

// 2. Define DogeOS Testnet
export const dogeosTestnet = defineChain({
  id: 6281971,
  name: 'DogeOS Testnet',
  nativeCurrency: {
    name: 'DOGE',
    symbol: 'DOGE',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.testnet.dogeos.com'],
    },
  },
  blockExplorers: {
    default: { name: 'DogeOS Explorer', url: 'https://explorer.testnet.dogeos.com' },
  },
  testnet: true,
})

// 3. Create wagmiConfig
const metadata = {
  name: 'FastFitHub Wallet',
  description: 'FastFitHub Wallet Connection',
  url: 'https://fastfithub.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

export const config = defaultWagmiConfig({
  chains: [dogeosTestnet],
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
})
