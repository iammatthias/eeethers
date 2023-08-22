"use client";

import { useContractRead } from "wagmi";

export function Token_ID(): bigint {
  const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

  const { data } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: [
      {
        inputs: [],
        name: "tokenId",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "tokenId",
  });

  return BigInt(data as number);
}

export function Remaining_Tokens() {
  const total_supply = 9999 as number;
  const remaining_tokens = BigInt(total_supply) - BigInt(Token_ID());

  console.log(`remaining_tokens`, remaining_tokens);

  return <>{Number(remaining_tokens)}</>;
}
