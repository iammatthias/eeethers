import { Box } from './primitives/box';

export default function Layout({ children }: any) {
  return (
    <Box
      css={{
        position: `relative`,
        height: `100vh`,
        margin: `10% auto 0`,
        padding: `0`,
        display: `grid`,
        gridTemplateColumns: `1fr`,
        gridTemplateRows: `auto`,
        gridGap: `1rem`,
        '@bp1': {
          gridTemplateColumns: `1fr 1fr`,
        },
      }}
    >
      {children}
    </Box>
  );
}
