import { BigNumber, ethers } from 'ethers';
import {
  useContractWrite,
  useWaitForTransaction,
  usePrepareContractWrite,
} from 'wagmi';
import abi from '@/lib/contract/abi.json';

import { Box } from './primitives/box';

import { PillBox } from './primitives/pillBox';
import { Button } from './primitives/button';
import { Text } from './primitives/text';

export default function Mint() {
  const contract = process.env.NEXT_PUBLIC_TARGET_CONTRACT_ADDRESS as string;

  const { config } = usePrepareContractWrite({
    address: contract,
    abi: abi.abi,
    functionName: `mint`,

    overrides: {
      value: ethers.utils.parseEther(`0.05`),
      gasLimit: BigNumber.from(21000),
    },
  });

  const { data, isLoading, isSuccess, isError, reset, write } =
    useContractWrite(config as any);

  const { data: transactionData, isLoading: transactionLoading } =
    useWaitForTransaction({
      hash: data && data.hash,
    });

  return (
    <>
      {!data && isError ? (
        <Button onClick={reset}>Error - Reset</Button>
      ) : (
        <Button onClick={() => write?.()}>
          {isLoading || transactionLoading
            ? `Loading...`
            : `Mint Eeethers | 0.05 Ξ`}
        </Button>
      )}
      {isSuccess && transactionData && (
        <>
          <PillBox css={{ overflowWrap: `break-word` }}>
            <Text>
              tx:
              {` `}
              <a
                href={`${process.env.NEXT_PUBLIC_ETHERSCAN_URL}tx/${transactionData.transactionHash}`}
              >
                {transactionData.transactionHash}
              </a>
            </Text>
          </PillBox>
          <Box css={{ width: `100%`, display: `flex`, alignContent: `center` }}>
            <Button css={{ margin: `16px 0` }} onClick={reset}>
              Reset
            </Button>
          </Box>
        </>
      )}
    </>
  );
}
