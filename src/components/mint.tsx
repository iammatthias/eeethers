import { ethers } from 'ethers';
import { useContractWrite, useWaitForTransaction, useSigner } from 'wagmi';
import abi from '@/lib/contract/abi.json';

import { Box } from './primitives/box';

import { PillBox } from './primitives/pillBox';
import { Button } from './primitives/button';
import { Text } from './primitives/text';

export default function Mint() {
  const contract = process.env.NEXT_PUBLIC_TARGET_CONTRACT_ADDRESS as string;

  const { data: signer } = useSigner();

  const {
    data: writeData,
    isError: writeError,
    isLoading: writeLoading,
    reset: writeReset,
    write,
  }: any = useContractWrite(
    {
      addressOrName: contract,
      contractInterface: abi.abi,
      signerOrProvider: signer,
    },
    `mint`,
  );

  const {
    data: transactionData,
    isError: transactionError,
    isLoading: transactionLoading,
  } = useWaitForTransaction({
    hash: writeData && writeData.hash,
  });

  const handleMint = async () => {
    await write({
      overrides: {
        value: ethers.utils.parseEther(`0.05`),
      },
    });
  };

  return (
    <>
      {!writeData && (
        <Button onClick={writeError ? writeReset : handleMint}>
          {writeError || transactionError
            ? `Error - Reset`
            : writeLoading || transactionLoading
            ? `Loading...`
            : `Mint Eeethers | 0.05 Ξ`}
        </Button>
      )}
      {transactionData && (
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
            <Button css={{ margin: `16px 0` }} onClick={writeReset}>
              Reset
            </Button>
          </Box>
        </>
      )}
    </>
  );
}
