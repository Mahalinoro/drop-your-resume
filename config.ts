import { createConfig, http } from 'wagmi'
import { polygonAmoy } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
    connectors: 
    [injected()],
  chains: [polygonAmoy],
  ssr: true,
  transports: {
    [polygonAmoy.id]: http(),
  },
})