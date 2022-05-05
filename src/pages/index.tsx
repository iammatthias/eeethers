import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { Box } from '@/components/box';
import Mint from '@/components/mint';

export default function Home() {
  const { data: accountData } = useAccount();
  return (
    <>
      <Box
        css={{
          width: `fit-content`,
          height: `fit-content`,
          alignSelf: `center`,
          position: accountData ? `absolute` : `relative`,
          top: accountData ? `16px` : ``,
          zIndex: 100,
        }}
      >
        <ConnectButton
          accountStatus="address"
          chainStatus="name"
          showBalance={false}
        />
      </Box>
      {accountData && (
        <Box
          css={{
            width: `fit-content`,
            height: `fit-content`,
            alignSelf: `center`,
          }}
        >
          <Mint />
        </Box>
      )}
    </>
  );
}
