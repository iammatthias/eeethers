import { useContractWrite, useDisconnect, useWaitForTransaction } from 'wagmi';

import { styled } from '@/styles/stitches.config';

import abi from '@/lib/contract/abi.json';

import { PillBox } from './pillBox';

export default function Mint() {
  const contract = process.env.NEXT_PUBLIC_TARGET_CONTRACT_ADDRESS;

  const Button = styled('button');
  const {
    data: writeData,
    isError: writeError,
    isLoading: writeLoading,
    write,
  } = useContractWrite(
    {
      addressOrName: contract as string,
      contractInterface: abi.abi,
    },
    'mint',
  );

  const { disconnect } = useDisconnect();

  const {
    data: transactionData,
    isError: transactionError,
    isLoading: transactionLoading,
  } = useWaitForTransaction({
    hash: writeData && writeData.hash,
  });

  return (
    <>
      {!writeData && (
        <Button
          css={{
            background:
              'linear-gradient(0deg, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.06)) #fff',
            width: 'fit-content',
            padding: '8px',
            borderRadius: '12px',
            border: '2px solid #fff',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            fontSize: '18px',
            fontWeight: '700',
            fontFamily: 'var(--rk-fonts-body)',
            '&:hover': {
              transform: 'scale(1.025)',
            },
          }}
          onClick={writeError ? disconnect : (write as any)}
        >
          {writeError
            ? 'Error - Reset'
            : writeLoading
            ? 'Loading...'
            : 'Mint Eeethers'}
        </Button>
      )}
      {transactionData && (
        <PillBox>
          <b>tx:</b>{' '}
          <a
            href={
              'https://kovan-optimistic.etherscan.io/tx/' +
              transactionData.transactionHash
            }
          >
            {transactionData.transactionHash}
          </a>
        </PillBox>
      )}
    </>
  );
}
