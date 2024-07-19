"use client";

import { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { config } from "@/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { QueryParamProvider } from "use-query-params";
import NextAdapterApp from "next-query-params/app";

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute={"class"}
      defaultTheme={"system"}
      enableSystem
      disableTransitionOnChange
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <QueryParamProvider adapter={NextAdapterApp}>
            <Toaster position={"top-right"} />
            {children}
          </QueryParamProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
};
