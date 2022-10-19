import abi from '@/lib/contract/abi.json';
import { BigNumber } from 'ethers';

import { useContractRead } from 'wagmi';

export default function TokenId() {
  const contract = process.env.NEXT_PUBLIC_TARGET_CONTRACT_ADDRESS;

  type Data = {
    _hex: BigNumber;
    isBigNumber: boolean;
  };

  const { data, error, isError, isLoading } = useContractRead({
    address: contract,
    abi: abi.abi,
    functionName: `tokenId`,
  });

  const _data = data as Data;

  const tokenId = data ? BigNumber.from(_data?._hex).toString() : null;

  if (isLoading) {
    return null;
  }

  if (isError) {
    console.log(error);
    return null;
  }

  return tokenId;
}
