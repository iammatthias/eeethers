import { Box } from './box';

export default function Layout({ children }: any) {
  return (
    <Box
      css={{
        margin: 0,
        padding: `0`,
        height: `calc(100vh - env(safe-area-inset-bottom))`,
        width: `100vw`,
      }}
    >
      {children}
    </Box>
  );
}
