import { Box } from './box';

export default function Layout({ children }: any) {
  return (
    <Box
      css={{
        margin: `16px auto`,
        padding: `0`,
        height: `100vh`,
        width: `100vw`,
        display: `flex`,
        flexDirection: `column`,
        justifyContent: `center`,
      }}
    >
      {children}
    </Box>
  );
}
