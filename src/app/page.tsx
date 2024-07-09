"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Token } from "@/types/token";
import { ellipseAddress } from "@/utils/display";
import { CopyIcon } from "@radix-ui/react-icons";
import { MetamaskIcon } from "web3-icons";
import { watchAsset } from "viem/actions";
import { config } from "@/wagmi";

export default function Home() {
  const [tokens, setTokens] = useState<Token[]>([]);
  useEffect(() => {
    fetch("https://tokens.pancakeswap.finance/pancakeswap-extended.json")
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        setTokens(r.tokens);
      });
  }, []);
  return (
    <>
      <header
        className={
          "bg-white bg-opacity-60 backdrop-blur fixed top-0 w-full h-[72px] flex items-center"
        }
      >
        <div className="container mx-auto flex items-center px-6">
          <div className="flex items-center gap-2">
            <Image src={"/logo.png"} alt={"logo"} width={42} height={42} />
            <div className={"font-extrabold italic text-xl"}>TokenLlama</div>
          </div>
          <div className="ml-auto"></div>
        </div>
      </header>
      <div className={"container mx-auto pt-28 px-6"}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {tokens?.map((token) => (
            <div key={token?.address} className={"card"}>
              <Image
                src={token?.logoURI}
                alt={token.symbol}
                width={42}
                height={42}
                className={"rounded-full mb-2"}
              />
              <div className={"text-gray-800 text-lg font-semibold"}>
                {token?.symbol}
              </div>
              <div className={"text-gray-500 text-xs mb-10"}>{token.name}</div>

              <div
                className={"flex items-center text-[10px] gap-1 text-gray-500"}
              >
                <MetamaskIcon
                  width={12}
                  height={12}
                  onClick={() => {
                    watchAsset(config.getClient(), {
                      type: "ERC20",
                      options: {
                        address: token.address,
                        decimals: token.decimals,
                        symbol: token.symbol,
                      },
                    });
                  }}
                />
                {ellipseAddress(token?.address, 10)}
                <CopyIcon
                  onClick={async () => {
                    await navigator.clipboard.writeText(token?.address);
                    console.log(222222222222222);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
