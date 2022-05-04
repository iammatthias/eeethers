import { Box } from './box';

export default function Layout({ children }: any) {
  return (
    <Box
      css={{
        margin: 0,
        padding: `0`,
        height: `100vh`,
        width: `100vw`,
      }}
    >
      {children}
    </Box>
  );
}
