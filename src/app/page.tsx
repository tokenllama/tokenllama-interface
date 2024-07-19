'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Token } from '@/types/token';
import { ellipseAddress } from '@/utils/display';
import { CopyIcon } from '@radix-ui/react-icons';
import { ChainBNBIcon, ChainEthereumIcon, ChainPolygonIcon, EtherscanIcon, MetamaskIcon } from 'web3-icons';
import { watchAsset } from 'viem/actions';
import { config } from '@/wagmi';
import { toast } from 'sonner';
import Link from 'next/link';
import { getTokenScanLink } from '@/utils/link';
import { bsc, mainnet, polygon } from 'viem/chains';
import { useTheme } from 'next-themes';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { NumberParam, useQueryParam, withDefault } from 'use-query-params';

export default function Home() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [chainId, setChainId] = useQueryParam('chain_id', withDefault(NumberParam, mainnet.id));

  useEffect(() => {
    if (chainId === polygon.id) {
      fetch('https://tokens.uniswap.org')
        .then((r) => r.json())
        .then((r) => {
          console.log(r);
          setTokens(r.tokens.filter((t: Token) => t.chainId === polygon.id).filter((t: Token) => !t.logoURI.includes('ipfs://')));
        });
    }

    if (chainId === bsc.id) {
      fetch('https://tokens.pancakeswap.finance/pancakeswap-extended.json')
        .then((r) => r.json())
        .then((r) => {
          console.log(r);
          setTokens(r.tokens);
        });
    }

    if (chainId === mainnet.id) {
      fetch('https://tokens.coingecko.com/uniswap/all.json')
        .then((r) => r.json())
        .then((r) => {
          console.log(r);
          setTokens(r.tokens.slice(0, 100));
        });
    }
  }, [chainId]);

  const { setTheme } = useTheme();

  return (
    <>
      <header className={'bg-white dark:bg-background bg-opacity-60 backdrop-blur fixed top-0 w-full h-[72px] flex items-center'}>
        <div className="container mx-auto flex items-center px-6">
          <div className="flex items-center gap-2">
            <Image src={'/logo.png'} alt={'logo'} width={42} height={42} />
            <div className={'font-extrabold italic text-xl'}>TokenLlama</div>
          </div>
          <div className="ml-auto">
            <button onClick={() => setTheme('dark')}>Dark</button>
          </div>
        </div>
      </header>
      <div className="px-6">
        <div className="w-[1000px] max-w-full mx-auto mt-28 pb-20">
          <div className="flex justify-end mb-6">
            <Select defaultValue={mainnet.id.toString()} value={chainId.toString()} onValueChange={(id: string) => setChainId(Number(id))}>
              <SelectTrigger className="w-[180px]" defaultValue={'ethereum'}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={mainnet.id.toString()}>
                  <div className="flex items-center gap-2">
                    <ChainEthereumIcon /> Ethereum
                  </div>
                </SelectItem>
                <SelectItem value={bsc.id.toString()}>
                  <div className="flex items-center gap-2">
                    <ChainBNBIcon /> BNB
                  </div>
                </SelectItem>
                <SelectItem value={polygon.id.toString()}>
                  <div className="flex items-center gap-2">
                    <ChainPolygonIcon /> Polygon
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className={'bg-white dark:bg-background rounded-2xl border border-gray-700'}>
            <div className={'font-semibold flex items-center gap-2 mb-4 px-6 pt-6 mb-4 text-xl'}>
              <ChainEthereumIcon width={26} height={26} />
              Ethereum ({tokens.length})
            </div>
            {tokens?.map((token) => (
              <div
                key={token?.address}
                className={'flex items-center px-6 py-4 cursor-pointer hover:bg-background transition-all duration-300'}
              >
                <Image src={token?.logoURI} alt={token.symbol} width={26} height={26} className={'rounded-full mr-3'} />
                <div className={'font-semibold text-sm'}>{token.symbol}</div>

                <div className={'flex items-center text-[10px] gap-2 text-gray-500 ml-auto '}>
                  <Link href={getTokenScanLink(chainId, token.address)} target={'_blank'}>
                    <EtherscanIcon />
                  </Link>
                  <ChainEthereumIcon />
                  <MetamaskIcon
                    width={12}
                    height={12}
                    onClick={() => {
                      watchAsset(config.getClient(), {
                        type: 'ERC20',
                        options: {
                          address: token.address,
                          decimals: token.decimals,
                          symbol: token.symbol,
                        },
                      });
                    }}
                  />
                  {ellipseAddress(token?.address, 6)}
                  <CopyIcon
                    className={'w-3 h-3 cursor-pointer'}
                    onClick={async () => {
                      await navigator.clipboard.writeText(token?.address);
                      toast.success('Copied');
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
