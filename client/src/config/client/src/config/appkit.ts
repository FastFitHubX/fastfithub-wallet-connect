import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet } from 'wagmi/chains'

const projectId = 'f8ae1db529933f7e9413d85c6b9b8708'

const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [mainnet],
})

createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet],
  metadata: {
    name: 'FastFitHub',
    description: 'Fitness Wallet',
    url: 'https://hubxwallet.vercel.app',
    icons: [],
  },
})