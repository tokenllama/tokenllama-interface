import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';

export const ConnectorButton = () => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button" className={'input'}>
                    Connect Wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={openChainModal} className={'rounded-sm'} type="button">
                    {chain.hasIcon && (
                      <div
                        className={'w-[20px] h-[20px] rounded-full'}
                        style={{
                          background: chain.iconBackground,
                        }}
                      >
                        {chain.iconUrl && <Image width={20} height={20} alt={chain.name ?? 'Chain icon'} src={chain.iconUrl} />}
                      </div>
                    )}
                  </button>
                  <button onClick={openAccountModal} className={'input'} type="button">
                    {account.displayName}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
