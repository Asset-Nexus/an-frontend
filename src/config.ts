import { http, createConfig } from 'wagmi'
import { bscTestnet, bsc } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'

export const config = createConfig({
  chains: [bscTestnet, bsc],
  connectors: [
    metaMask(),
  ],
  transports: {
    [bscTestnet.id]: http(),
    [bsc.id]: http(),
  },
})