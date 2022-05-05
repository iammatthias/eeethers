import { styled } from '@/styles/stitches.config';

export const PillBox = styled(`div`, {
  background: ` var(--rk-colors-connectButtonBackground)`,
  width: `fit-content`,
  padding: `8px`,
  borderRadius: `12px`,
  border: `2px solid var(--rk-colors-connectButtonBackground)`,
  boxShadow: `var(--rk-shadows-connectButton)`,
  fontFamily: `var(--rk-fonts-body)`,
  color: `var(--rk-colors-connectButtonText)`,
  '&:hover': {
    transform: `scale(1.025)`,
  },
});
