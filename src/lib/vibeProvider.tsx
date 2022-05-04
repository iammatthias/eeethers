// pages/guestbook.tsx

import '@rainbow-me/rainbowkit/styles.css';

import {
  RainbowKitProvider,
  Chain,
  connectorsForWallets,
  wallet,
  WalletList,
} from '@rainbow-me/rainbowkit';
import { Provider, createClient, chain } from 'wagmi';
import { providers } from 'ethers';

// components

export default function VibeProvider({ children }: any) {
  const infuraId = process.env.NEXT_PUBLIC_INFURA;
  const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY;

  // Set up providers
  const provider = ({ chainId }: { chainId?: number }) =>
    // new providers.InfuraProvider(chainId, infuraId);
    new providers.AlchemyProvider(chainId, alchemyId);

  const chains: Chain[] = [
    // { ...chain.optimism, name: 'Optimism' },
    { ...chain.optimismKovan, name: 'Optimism Kovan' },
  ];

  const needsInjectedWalletFallback =
    typeof window !== `undefined` &&
    window.ethereum &&
    !window.ethereum.isMetaMask;

  const wallets: WalletList = [
    {
      groupName: `Suggested`,
      wallets: [
        wallet.rainbow({ chains, infuraId }),
        wallet.walletConnect({ chains, infuraId }),
        wallet.metaMask({ chains, infuraId }),
        ...(needsInjectedWalletFallback
          ? [wallet.injected({ chains, infuraId })]
          : []),
      ],
    },
  ];

  const connectors = connectorsForWallets(wallets);

  const client = createClient({
    autoConnect: true,
    connectors: connectors,
    provider,
  });

  return (
    <RainbowKitProvider chains={chains}>
      <Provider client={client}>{children}</Provider>
    </RainbowKitProvider>
  );
}
