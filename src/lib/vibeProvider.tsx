// pages/guestbook.tsx

import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';

import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

// components

export default function VibeProvider({ children }: any) {
  const ALCHEMY_ID = process.env.NEXT_PUBLIC_ALCHEMY;

  const { chains, provider } = configureChains(
    [chain.optimism],
    [alchemyProvider({ apiKey: ALCHEMY_ID }), publicProvider()],
  );

  const { connectors } = getDefaultWallets({
    appName: `EEETHERS`,
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: false,
    connectors,
    provider,
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
}
