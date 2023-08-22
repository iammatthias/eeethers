"use client";

import { useAccount, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { parseEther } from "viem";

import Connect_Wallet from "../connect_wallet";

export default function Mint() {
  const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;
  const { address } = useAccount();

  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: [
      {
        inputs: [],
        name: "mint",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
    ],
    functionName: "mint",
    value: parseEther("0.05"),
  });
  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <>
      <Connect_Wallet />
      {address && (
        <>
          <button className='mint_button' disabled={!write || isLoading} onClick={() => write && write()}>
            {isLoading ? "Minting..." : "Mint for 0.05 Ξ"}
          </button>
          {isSuccess && (
            <div>
              Successfully minted your NFT!
              <div>
                <a href={`https://optimistic.etherscan.io/tx/${data?.hash}`}>Etherscan</a>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
