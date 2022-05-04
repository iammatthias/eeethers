import { styled } from '@/styles/stitches.config';

export const PillBox = styled(`div`, {
  background: `linear-gradient(0deg, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.06)) #fff`,
  width: `fit-content`,
  padding: `8px`,
  borderRadius: `12px`,
  border: `2px solid #fff`,
  boxShadow: `0px 4px 12px rgba(0, 0, 0, 0.1)`,
  '&:hover': {
    transform: `scale(1.025)`,
  },
});
