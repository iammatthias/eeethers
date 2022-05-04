import { useAccount } from 'wagmi';

import { ConnectButton } from '@rainbow-me/rainbowkit';

import { Box } from '@/components/box';
import Mint from '@/components/mint';

export default function Home() {
  const { data: accountData } = useAccount();

  return (
    <Box
      css={{
        display: `flex`,
        flexDirection: `column`,
        justifyContent: `center`,
        alignItems: `center`,
        height: `100%`,
        width: `100%`,
      }}
    >
      <Box
        css={{
          margin: `8px auto`,
          alignSelf: accountData && `start`,
          width: `100%`,
        }}
      >
        <Box css={{ margin: `8px 16px` }}>
          <Box
            css={{
              display: `flex`,
              gap: `8px`,
              justifyContent: `center`,
            }}
          >
            <ConnectButton
              accountStatus="address"
              chainStatus="name"
              showBalance={false}
            />
          </Box>
        </Box>
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
