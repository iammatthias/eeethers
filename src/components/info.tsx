import { Box } from './box';
import { PillBox } from './pillBox';

export default function Info({ address, isWalletConnected }: any) {
  const contract = process.env.NEXT_PUBLIC_TARGET_CONTRACT_ADDRESS;

  return (
    <Box
      css={{
        position: `absolute`,
        left: `0`,
        bottom: `16px`,
        margin: `0 auto`,
        width: `100%`,
        zIndex: 100,
        textAlign: `center`,
      }}
    >
      <PillBox
        css={{
          margin: `0 auto`,
          fontSize: `0.7rem`,
        }}
      >
        {isWalletConnected
          ? `Colors derived from connected wallet: `
          : `Colors derived from random address: `}
        <br />
        {address}
        <br />
        <br />
        <a href={`${process.env.NEXT_PUBLIC_ETHERSCAN_URL}address/${contract}`}>
          etherscan
        </a>
        {` | `}
        <a href={`${process.env.NEXT_PUBLIC_QUIXOTIC_URL}${contract}`}>
          quixotic
        </a>
        {` | `}
        <a href="https://github.com/iammatthias/eeethers">github</a>
      </PillBox>
    </Box>
  );
}
