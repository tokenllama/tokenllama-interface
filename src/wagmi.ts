import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "viem/chains";

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
