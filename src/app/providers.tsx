'use client';

import { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
import { config } from '@/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { QueryParamProvider } from 'use-query-params';
import NextAdapterApp from 'next-query-params/app';
import { Toaster } from '@/components/ui/toaster';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute={'class'} defaultTheme={'system'} enableSystem disableTransitionOnChange>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <QueryParamProvider adapter={NextAdapterApp}>
            <RainbowKitProvider>
              <Toaster />
              {children}
            </RainbowKitProvider>
          </QueryParamProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
};
