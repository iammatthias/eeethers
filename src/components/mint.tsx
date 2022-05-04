import { useContractWrite, useDisconnect, useWaitForTransaction } from 'wagmi';

import { styled } from '@/styles/stitches.config';

import abi from '@/lib/contract/abi.json';

import { PillBox } from './pillBox';
import { Button } from './button';

export default function Mint() {
  const contract = process.env.NEXT_PUBLIC_TARGET_CONTRACT_ADDRESS;

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
    `mint`,
  );

  const { disconnect } = useDisconnect();

  const { data: transactionData } = useWaitForTransaction({
    hash: writeData && writeData.hash,
  });

  return (
    <>
      {!writeData && (
        <Button onClick={writeError ? disconnect : (write as any)}>
          {writeError
            ? `Error - Reset`
            : writeLoading
            ? `Loading...`
            : `Mint Eeethers`}
        </Button>
      )}
      {transactionData && (
        <PillBox>
          <b>tx:</b>
          {` `}
          <a
            href={`${process.env.NEXT_PUBLIC_ETHERSCAN_URL}tx/${transactionData.transactionHash}`}
          >
            {transactionData.transactionHash}
          </a>
        </PillBox>
      )}
    </>
  );
}
