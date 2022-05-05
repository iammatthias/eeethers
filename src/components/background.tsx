import { useEffect, useState } from 'react';
import { styled } from '@/styles/stitches.config';

import { Box } from './box';
import useWindowDimensions from '@/lib/useWindowDimension';

import { useAccount } from 'wagmi';
import Info from './info';

export default function Background() {
  // get user address
  const { data: accountData } = useAccount();

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

  const address = accountData ? accountData.address : randomAddress;

  // parse random eth address into color hex codes
  const address2colors = address
    ? address.replace(`0x`, `ff`)
    : randomAddress.replace(`0x`, `ff`);
  const colors = address2colors.match(/.{1,6}/g);

  const SVG = styled(`svg`);

  const { width, height } = useWindowDimensions();

  const _xy =
    width && height ? (width > height ? height / 1.618 : width / 1.382) : 0;

  return (
    colors && (
      <>
        <Info
          address={address}
          isWalletConnected={accountData ? true : false}
        />
        <Box
          css={{
            zIndex: `-2`,
            position: `absolute`,
            top: `0`,
            left: `0`,
            width: `100%`,
            height: `100%`,
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
          }}
        >
          <SVG
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 1000 1000`}
            width={_xy}
            height={_xy}
            css={{
              boxShadow: `var(--rk-shadows-connectButton)`,
              background: `$white`,
            }}
          >
            <filter id="filter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.01"
                numOctaves="3"
                seed={seed}
              />
              <feDisplacementMap
                in="SourceGraphic"
                yChannelSelector="R"
                scale="99"
              />
            </filter>
            <g
              filter="url(#filter)"
              fill="none"
              stroke={`#` + colors[0]}
              strokeWidth="160%"
              strokeDasharray="99"
            >
              <circle
                id="c"
                cx="50%"
                cy="50%"
                r="80%"
                style={{ transformOrigin: `center` }}
              >
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="0 0 0"
                  to="360 0 0"
                  // dur={`${safari ? `0s` : `120s`}`}
                  dur={`120s`}
                  repeatCount="indefinite"
                  begin="0s"
                />
              </circle>
              <use href="#c" stroke={`#` + colors[1]} strokeDasharray="99 60" />
              <use
                href="#c"
                stroke={`#` + colors[2]}
                strokeDasharray="99 120"
              />
              <use
                href="#c"
                stroke={`#` + colors[3]}
                strokeDasharray="99 180"
              />
              <use
                href="#c"
                stroke={`#` + colors[4]}
                strokeDasharray="99 240"
              />
              <use
                href="#c"
                stroke={`#` + colors[5]}
                strokeDasharray="99 300"
              />
              <use
                href="#c"
                stroke={`#` + colors[6]}
                strokeDasharray="99 360"
              />
            </g>
          </SVG>
        </Box>
      </>
    )
  );
}
