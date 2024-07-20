import Image from 'next/image';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ConnectorButton } from '@/components/connector-button';

export const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className={'bg-white dark:bg-background bg-opacity-60 backdrop-blur fixed top-0 w-full h-[72px] flex items-center'}>
      <div className="container mx-auto flex items-center px-6">
        <div className="flex items-center gap-2">
          <Image src={'/logo.png'} alt={'logo'} width={42} height={42} />
          <div className={'font-extrabold italic text-xl'}>TokenLlama</div>
        </div>
        <div className="ml-auto cursor-pointer text-orange-400 mr-6">
          {theme === 'dark' ? (
            <SunIcon className={'text-orange-400'} onClick={() => setTheme('light')} />
          ) : (
            <MoonIcon className={'text-orange-400'} onClick={() => setTheme('dark')} />
          )}
        </div>
        <ConnectorButton />
      </div>
    </header>
  );
};
