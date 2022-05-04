import { useAccount } from 'wagmi';

import { ConnectButton } from '@rainbow-me/rainbowkit';

import { Box } from '@/components/box';
import Mint from '@/components/mint';

export default function Home() {
  const { data: accountData } = useAccount();

  return (
    <Box
      css={{
        zIndex: `2`,
        position: `absolute`,
        top: `0`,
        left: `0`,
        width: `100%`,
        height: `100%`,
        display: `flex`,
        flexDirection: `column`,
        justifyContent: `center`,
        alignItems: `center`,
      }}
    >
      <Box
        css={{
          margin: `16px auto`,
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
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
            height: `100%`,
            width: `100%`,
            flexDirection: `row`,
          }}
        >
          <Mint />
        </Box>
      )}
    </Box>
  );
}
