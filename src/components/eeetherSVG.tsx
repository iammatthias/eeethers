import { styled } from '@/styles/stitches.config';

import { Box } from './primitives/box';

export default function EeetherSVG({ address, seed, xy }: any) {
  // parse random eth address into color hex codes
  const address2colors = address.replace(`0x`, `ff`);
  const colors = address2colors.match(/.{1,6}/g);

  const SVG = styled(`svg`);

  return (
    colors && (
      <Box
        css={{
          position: `relative`,
          gridArea: `Image`,
          display: `flex`,
          height: `100%`,
          justifyContent: `center`,
          alignItems: `center`,
          margin: `16px`,
          '@bp1': {
            justifyContent: `end`,
          },
        }}
      >
        <SVG
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 1000 1000`}
          width={xy}
          height={xy}
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
            <use href="#c" stroke={`#` + colors[2]} strokeDasharray="99 120" />
            <use href="#c" stroke={`#` + colors[3]} strokeDasharray="99 180" />
            <use href="#c" stroke={`#` + colors[4]} strokeDasharray="99 240" />
            <use href="#c" stroke={`#` + colors[5]} strokeDasharray="99 300" />
            <use href="#c" stroke={`#` + colors[6]} strokeDasharray="99 360" />
          </g>
        </SVG>
      </Box>
    )
  );
}
