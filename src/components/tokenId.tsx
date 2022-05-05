import abi from '@/lib/contract/abi.json';
import { BigNumber } from 'ethers';

import { useContractRead } from 'wagmi';

export default function TokenId() {
  const contract = process.env.NEXT_PUBLIC_TARGET_CONTRACT_ADDRESS;

  const { data, isLoading } = useContractRead(
    {
      addressOrName: contract,
      contractInterface: abi.abi,
    } as any,
    `tokenId`,
    {
      watch: false,
    },
  );

  return isLoading ? null : data && BigNumber.from(data._hex).toString();
}
