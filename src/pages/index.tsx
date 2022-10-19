// pages/index.tsx
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import useWindowDimensions from '@/lib/useWindowDimension';

import { Box } from '@/components/primitives/box';
import { Text } from '@/components/primitives/text';
import Mint from '@/components/mint';
import EeetherSVG from '@/components/eeetherSVG';
import Squiggle from '@/components/squiggle';
import TokenId from '@/components/tokenId';

export default function Home() {
  const contract = process.env.NEXT_PUBLIC_TARGET_CONTRACT_ADDRESS;

  // get user address
  const { address: _address } = useAccount();

  // fall back to all white
  // generate random eth address for initial coloration
  // replace with user address after wallet is connected
  const [randomAddress, setRandomAddress] = useState(
    // `0x429f42fb5247e3a34d88d978b7491d4b2bee6105`,
    `0xffffffffffffffffffffffffffffffffffffffff`,
  );

  const [seed, setSeed] = useState(0);

  useEffect(() => {
    const addressPrefix = `0x`;
    const genRanHex = [...Array(40)]
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join(``);
    setRandomAddress(addressPrefix.concat(genRanHex) as any);
    // generate seed that looks like a tokenId
    setSeed(Math.floor(Math.random() * (9999 - 0 + 1) + 0));
  }, []);

  const tokenId = TokenId();

  const _seed = tokenId ? tokenId : seed;

  const address = _address ? _address : randomAddress;

  const { width, height } = useWindowDimensions();

  const _xy =
    width && height ? (width > height ? height / 1.618 : width / 1.1) : 0;

  // parse random eth address into color hex codes
  const address2colors = address ? address.replace(`0x`, `ff`) : randomAddress;
  const colors = address2colors.match(/.{1,6}/g);

  console.log(tokenId);

  const remaining = tokenId ? 9999 - +tokenId : 9999;

  return (
    address && (
      <>
        <Box>
          <EeetherSVG address={address} seed={seed} xy={_xy} />
        </Box>
        <Box
          css={{
            display: `flex`,
            flexDirection: `column`,
            gap: `1rem`,
            height: `100%`,
            justifyContent: `center`,
            alignItems: `center`,
            margin: `0`,
            '@bp1': {
              alignItems: `start`,
              justifyContent: `start`,
            },
          }}
        >
          <Box
            css={{
              maxWidth: `60ch`,
              display: `grid`,
              gridTemplateColumns: `1fr`,
              gridTemplateRows: `auto`,
              gridGap: `16px`,
              padding: `32px`,
              '@bp1': {
                padding: `0`,
              },
            }}
          >
            <Box
              css={{
                width: `fit-content`,
                height: `fit-content`,
              }}
            >
              <ConnectButton
                accountStatus="address"
                chainStatus="name"
                showBalance={false}
              />
            </Box>
            {_address && (
              <Box
                css={{
                  width: `fit-content`,
                  height: `fit-content`,
                }}
              >
                <Mint />
              </Box>
            )}
            <Text
              css={{
                height: `fit-content`,
              }}
            >
              Eeethers is an exploration of color within Ethereum.
            </Text>
            <Text
              css={{
                height: `fit-content`,
              }}
            >
              We can create <em>seven</em> unique colors from the{` `}
              <code>42</code> hexadecimal digits of your Ethereum address.
            </Text>
            <Text>
              These colors are used in an animated fully on-chain SVG. Each
              Eeether is unique to its minter.
            </Text>
            <Text>
              {remaining} Ethers are available to mint. There is no whitelist or
              token gating, minting is open to all.
            </Text>
            <Squiggle squiggleWidth="8" height="16" />
            <Text as="small">
              {_address
                ? `Colors derived from connected wallet & ${
                    tokenId ? `next tokenId` : `random seed`
                  }: `
                : `Colors derived from random address${
                    tokenId ? ` & next tokenId` : ` & seed`
                  }: `}
              <br />
              <em>{address}</em>
            </Text>

            <Box
              css={{
                display: `flex`,
                flexDirection: `row`,
                flexWrap: `wrap`,
                gap: `16px`,
                fontFamily: `monospace`,
              }}
            >
              {colors &&
                colors.map((color: any, index: any) => (
                  <Box
                    key={index}
                    css={{
                      padding: `8px`,
                      borderRadius: `12px`,
                      border: `2px solid var(--rk-colors-connectButtonBackground)`,
                      boxShadow: `var(--rk-shadows-connectButton)`,
                      flexBasis: `15%`,
                    }}
                  >
                    <Text as="small">
                      <em>Color #{index + 1}</em>
                    </Text>
                    <br />
                    <Text
                      as="small"
                      css={{
                        color: `#${color}`,
                      }}
                    >
                      #{color}
                    </Text>
                  </Box>
                ))}
              <Box
                css={{
                  padding: `8px`,
                  borderRadius: `12px`,
                  border: `2px solid var(--rk-colors-connectButtonBackground)`,
                  boxShadow: `var(--rk-shadows-connectButton)`,
                  flexBasis: `15%`,
                }}
              >
                <Text as="small">
                  <em>Seed</em>
                </Text>
                <br />
                <Text as="small">{_seed}</Text>
              </Box>
            </Box>

            <Text as="small">
              <a
                href={`${process.env.NEXT_PUBLIC_ETHERSCAN_URL}address/${contract}`}
              >
                etherscan
              </a>
              {` | `}
              <a href={`${process.env.NEXT_PUBLIC_QUIXOTIC_URL}${contract}`}>
                quixotic
              </a>
              {` | `}
              <a href="https://github.com/iammatthias/eeethers">github</a>
            </Text>
          </Box>
        </Box>
      </>
    )
  );
}
