"use client";

import { useAccount } from "wagmi";

export default function Eeethers_SVG({ random_address, random_seed }: any) {
  const { address } = useAccount();

  const _address = address || random_address;
  const seed = random_seed;
  // parse random eth address into color hex codes
  const address2colors = _address.replace(`0x`, `ff`);
  const colors = address2colors.match(/.{1,6}/g);

  return (
    <>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox={`0 0 1000 1000`}>
        <filter id='filter'>
          <feTurbulence type='fractalNoise' baseFrequency='0.01' numOctaves='3' seed={seed} />
          <feDisplacementMap in='SourceGraphic' yChannelSelector='R' scale='99' />
        </filter>
        <g filter='url(#filter)' fill='none' stroke={`#` + colors[0]} strokeWidth='160%' strokeDasharray='99'>
          <circle id='c' cx='50%' cy='50%' r='80%' style={{ transformOrigin: `center` }}>
            <animateTransform
              attributeName='transform'
              attributeType='XML'
              type='rotate'
              from='0 0 0'
              to='360 0 0'
              // dur={`${safari ? `0s` : `120s`}`}
              dur={`120s`}
              repeatCount='indefinite'
              begin='0s'
            />
          </circle>
          <use href='#c' stroke={`#` + colors[1]} strokeDasharray='99 60' />
          <use href='#c' stroke={`#` + colors[2]} strokeDasharray='99 120' />
          <use href='#c' stroke={`#` + colors[3]} strokeDasharray='99 180' />
          <use href='#c' stroke={`#` + colors[4]} strokeDasharray='99 240' />
          <use href='#c' stroke={`#` + colors[5]} strokeDasharray='99 300' />
          <use href='#c' stroke={`#` + colors[6]} strokeDasharray='99 360' />
        </g>
      </svg>
      <div>
        {colors.map((color: any, i: any) => (
          <span key={i} style={{ color: `#` + color }}>
            #{color}
          </span>
        ))}
      </div>
    </>
  );
}
