import { createConfig, http } from 'wagmi'
import { mainnet, sepolia, hardhat, polygonAmoy } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
    connectors: 
    [injected()],
  chains: [mainnet, sepolia, hardhat, polygonAmoy],
  ssr: true,
  transports: {
    [hardhat.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygonAmoy.id]: http(),
  },
})