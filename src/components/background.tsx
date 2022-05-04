import { useEffect, useState } from 'react';
import { styled } from '@/styles/stitches.config';

import { Box } from './box';
import { PillBox } from './pillBox';
import useWindowDimensions from '@/lib/useWindowDimension';
import { detect } from 'detect-browser';

import { useAccount } from 'wagmi';

export default function Background() {
  // get user address
  const { data: accountData } = useAccount();
  const _address = accountData && accountData.address;

  // generate random eth address, fall back to mine
  const [address, setAddress] = useState(
    `0x429f42fb5247e3a34d88d978b7491d4b2bee6105`,
  );
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    const addressPrefix = `0x`;
    const genRanHex = [...Array(40)]
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join(``);
    setAddress(addressPrefix.concat(genRanHex) as any);

    accountData && setAddress(_address as any);

    // generate seed that looks like a tokenId
    setSeed(Math.floor(Math.random() * (9999 - 0 + 1) + 0));
  }, []);

  // parse random eth address into color hex codes
  const address2colors = address.replace(`0x`, `ff`);
  const colors = address2colors.match(/.{1,6}/g);

  const SVG = styled(`svg`);
  const Small = styled(`small`);

  const { width, height } = useWindowDimensions();

  const browser = detect();

  const safari = browser && browser.name === `safari`;

  return (
    <>
      {colors && (
        <Box
          css={{
            margin: `0 auto`,
            zIndex: -1,
            position: `absolute`,
            bottom: `8px`,
            width: `100%`,
            textAlign: `center`,
          }}
        >
          <PillBox
            css={{
              margin: `0 auto`,
            }}
          >
            <Small
              css={{
                fontSize: `0.7rem`,
                fontFamily: `var(--rk-fonts-body)`,
                color: `var(--rk-colors-connectButtonText)`,
              }}
            >
              color source
              <br />
              {address}
            </Small>
          </PillBox>
        </Box>
      )}

      {colors && (
        <SVG
          xmlns="http://www.w3.org/2000/svg"
          // viewBox={`0 0 ${width ? width : 400} ${height ? height : 400}`}
          viewBox="0 0 400 400"
          width="100%"
          height="100%"
          css={{
            zIndex: `-2`,
            position: `absolute`,
            top: `0`,
            left: `0`,
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
                dur={`${safari ? `0s` : `120s`}`}
                repeatCount="indefinite"
                begin="0s"
              />
            </circle>
            <use href="#c" stroke={`#` + colors[1]} strokeDasharray="99 60" />
            <use href="#c" stroke={`#` + colors[2]} strokeDasharray="99 120" />
            <use href="#c" stroke={`#` + colors[3]} strokeDasharray="99 180" />
            <use href="#c" stroke={`#` + colors[4]} strokeDasharray="99 240" />
            <use href="#c" stroke={`#` + colors[5]} strokeDasharray="99 300" />
            <use href="#c" stroke={`#` + colors[6]} strokeDasharray="99 360" />
          </g>
        </SVG>
      )}
    </>
  );
}
