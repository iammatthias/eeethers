import { useAccount } from 'wagmi';

import { ConnectButton } from '@rainbow-me/rainbowkit';

import { Box } from '@/components/box';
import Mint from '@/components/mint';

export default function Home() {
  const {
    data: accountData,
    isError: accountError,
    isLoading: accountLoading,
  } = useAccount();

  return (
    <Box
      css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        padding: '8px 0',
      }}
    >
      <Box css={{ margin: '0 auto', alignSelf: accountData && 'start' }}>
        <Box css={{ display: 'flex' }}>
          <ConnectButton />
        </Box>
      </Box>
      {accountData && (
        <Box
          css={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            flexDirection: 'row',
          }}
        >
          <Mint />
        </Box>
      )}
    </Box>
  );
}
