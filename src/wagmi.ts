import { createConfig, http } from 'wagmi';
import { bsc, mainnet, polygon, sepolia } from 'viem/chains';

export const config = createConfig({
  chains: [mainnet, bsc, polygon],
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [polygon.id]: http(),
  },
});
