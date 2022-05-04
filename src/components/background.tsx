import { useEffect, useState } from 'react';
import { styled } from '@/styles/stitches.config';

import { Box } from './box';
import { PillBox } from './pillBox';

export default function Background() {
  // generate random eth address, fall back to mine
  const [address, setAddress] = useState(
    '0x429f42fb5247e3a34d88d978b7491d4b2bee6105',
  );
  const [seed, setSeed] = useState(0);
  const addressPrefix = '0x';
  const genRanHex = [...Array(40)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('');
  useEffect(() => {
    setAddress(addressPrefix.concat(genRanHex) as any);
    // generate seed that looks like a tokenId
    setSeed(Math.floor(Math.random() * (9999 - 0 + 1) + 0));
  }, []);

  // parse random eth address into color hex codes
  const address2colors = address.replace('0x', 'ff');
  const colors = address2colors.match(/.{1,6}/g);

  const SVG = styled('svg');
  const Small = styled('small');
  return (
    <>
      {address && (
        <Box
          css={{
            margin: '0 auto',
            zIndex: -1,
            position: 'absolute',
            bottom: '8px',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <PillBox
            css={{
              margin: '0 auto',
            }}
          >
            <Small
              css={{
                fontSize: '0.8rem',
                fontFamily: 'var(--rk-fonts-body)',
              }}
            >
              <b>color source</b>
              <br />
              {address}
            </Small>
          </PillBox>
        </Box>
      )}

      {colors && (
        <SVG
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          css={{
            background: '#F2F3F5',
            zIndex: -2,
            position: 'absolute',
            top: '0',
            left: '0',
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
            stroke={'#' + colors[0]}
            strokeWidth="220%"
            strokeDasharray="99"
          >
            <circle
              id="c"
              cx="50%"
              cy="50%"
              r="110%"
              style={{ transformOrigin: 'center' }}
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="360s"
                repeatCount="indefinite"
              />
            </circle>
            <use href="#c" stroke={'#' + colors[1]} strokeDasharray="99 60" />
            <use href="#c" stroke={'#' + colors[2]} strokeDasharray="99 120" />
            <use href="#c" stroke={'#' + colors[3]} strokeDasharray="99 180" />
            <use href="#c" stroke={'#' + colors[4]} strokeDasharray="99 240" />
            <use href="#c" stroke={'#' + colors[5]} strokeDasharray="99 300" />
            <use href="#c" stroke={'#' + colors[6]} strokeDasharray="99 360" />
          </g>
        </SVG>
      )}
    </>
  );
}
