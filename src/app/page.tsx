'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Token } from '@/types/token';
import { ellipseAddress } from '@/utils/display';
import { CopyIcon } from '@radix-ui/react-icons';
import { ChainBNBIcon, ChainEthereumIcon, ChainIcon, ChainPolygonIcon, EtherscanDarkIcon, EtherscanIcon, MetamaskIcon } from 'web3-icons';
import Link from 'next/link';
import { getTokenScanLink } from '@/utils/link';
import { bsc, mainnet, polygon } from 'viem/chains';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { NumberParam, useQueryParam, withDefault } from 'use-query-params';
import { useToast } from '@/components/ui/use-toast';
import { extractChain } from 'viem';
import { Header } from '@/components/header';
import { useAccount, useConnect, useSwitchChain, useWatchAsset } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import theme from 'tailwindcss/defaultTheme';
import { useTheme } from 'next-themes';

export default function Home() {
  const { toast } = useToast();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [chainId, setChainId] = useQueryParam('chain_id', withDefault(NumberParam, mainnet.id));
  const { watchAsset } = useWatchAsset();
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { chains, switchChain } = useSwitchChain();
  const { chainId: currentChainId } = useAccount();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (chainId === polygon.id) {
      fetch('https://tokens.uniswap.org')
        .then((r) => r.json())
        .then((r) => {
          console.log(r);
          setTokens(r.tokens.filter((t: Token) => t.chainId === polygon.id).filter((t: Token) => !t.logoURI.includes('ipfs://')));
          setLoading(false);
        });
    }

    if (chainId === bsc.id) {
      fetch('https://tokens.pancakeswap.finance/pancakeswap-extended.json')
        .then((r) => r.json())
        .then((r) => {
          console.log(r);
          setTokens(r.tokens);
          setLoading(false);
        });
    }

    if (chainId === mainnet.id) {
      fetch('https://tokens.coingecko.com/uniswap/all.json')
        .then((r) => r.json())
        .then((r) => {
          console.log(r);
          setTokens(r.tokens.slice(0, 500));
          setLoading(false);
        });
    }
  }, [chainId]);

  const { theme } = useTheme();

  return (
    <>
      <Header />
      <div className="px-6">
        <div className="w-[1200px] max-w-full mx-auto mt-28 pb-20">
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
          <div
            className={'bg-white dark:bg-background rounded-2xl border border-gray-200 dark:border-input lg:px-6 overflow-x-scroll pb-6'}
          >
            <div className={'flex items-center justify-end gap-2 px-6 pt-6 lg:mb-10 mb-6 text-sm'}>{tokens.length} Tokens</div>
            <div className={'min-w-[1000px]'}>
              <div className={'flex items-center text-sm px-6 text-gray-500 mb-2'}>
                <div className={'w-[5%]'}>#</div>
                <div className={'w-[25%]'}>Token</div>
                <div className={'w-[10%]'}>Decimals</div>
                <div className={'w-[10%]'}>Chain</div>
              </div>
              {loading && (
                <div className={'text-center py-6'}>
                  <div
                    className={
                      'flex items-center px-6 py-3 cursor-pointer rounded-2xl hover:bg-gray-300 dark:hover:bg-hover hover:bg-opacity-20 transition-all duration-300 text-xs'
                    }
                  >
                    <div className={'w-[5%] '}>
                      <div className={'bg-gray-100 w-[20px] h-[20px]'} />
                    </div>
                    <div className={'w-[25%] flex items-center gap-2'}>
                      <div className={'w-[32px] h-[32px] rounded-full bg-gray-200 animate-pulse'} />
                      <div>
                        <div className={'w-[50px] h-[12px] rounded-sm mb-1 bg-gray-200 animate-pulse'} />
                        <div className={'w-[100px] h-[12px] rounded-sm bg-gray-200 animate-pulse'} />
                      </div>
                    </div>
                    <div className={'w-[10%] '}>
                      <div className={'bg-gray-100 w-[20px] h-[20px]'} />
                    </div>
                    <div className={'w-[10%] '}>
                      <div className={'bg-gray-100 w-[20px] h-[20px]'} />
                    </div>
                    <div className="ml-auto">
                      <div className="flex items-center gap-2">
                        <div className={'bg-gray-100 w-[20px] h-[20px]'} />
                        <div className={'bg-gray-100 w-[20px] h-[20px]'} />
                        <div className={'bg-gray-100 w-[20px] h-[20px]'} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {!loading &&
                tokens?.map((token, i) => (
                  <div
                    key={token?.address}
                    className={
                      'flex items-center px-6 py-3 cursor-pointer rounded-2xl hover:bg-gray-300 dark:hover:bg-hover hover:bg-opacity-20 transition-all duration-300 text-xs'
                    }
                  >
                    <div className={'w-[5%] text-gray-500'}>{i + 1}</div>
                    <div className={'w-[25%] flex items-center'}>
                      <Image src={token?.logoURI} alt={token.symbol} width={26} height={26} className={'rounded-full mr-3'} />
                      <div>
                        <div className={'text-sm'}>{token.symbol}</div>
                        <div className={'text-gray-400 text-[10px]'}>{token.name}</div>
                      </div>
                    </div>

                    <div className={'w-[10%]'}>{token.decimals}</div>

                    <div className={'w-[10%]'}>
                      <ChainIcon chainId={chainId} width={16} height={16} />
                    </div>

                    <div className={'flex items-center text-[10px] gap-6 ml-auto '}>
                      <Link href={getTokenScanLink(chainId, token.address)} target={'_blank'}>
                        {theme === 'dark' ? <EtherscanDarkIcon /> : <EtherscanIcon />}
                      </Link>
                      <MetamaskIcon
                        width={12}
                        height={12}
                        onClick={() => {
                          if (!address) {
                            openConnectModal?.();
                            return;
                          }

                          if (chainId !== currentChainId) {
                            switchChain({ chainId: chainId });
                            return;
                          }
                          watchAsset({
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
                          toast({ title: 'Copied' });
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
