import { Box } from './box';

export default function Layout({ children }: any) {
  return (
    <Box
      css={{
        margin: 0,
        padding: `0`,
        height: `100%`,
        width: `100%`,
      }}
    >
      {children}
    </Box>
  );
}
