import { bsc, mainnet, polygon } from 'viem/chains';

export const getTokenScanLink = (chainId: number, address: string) => {
  switch (chainId) {
    case mainnet.id:
      return `https://etherscan.io/token/${address}`;
    case bsc.id:
      return `https://bscscan.com/token/${address}`;
    case polygon.id:
      return `https://polygonscan.com/token/${address}`;
    default:
      return `https://etherscan.io/token/${address}`;
  }
};
