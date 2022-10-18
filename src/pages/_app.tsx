import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { darkTheme, globalStyles } from '@/styles/stitches.config';
import VibeProvider from '@/lib/vibeProvider';

import Layout from '@/components/layout';

import Meta from '@/components/meta';

export default function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      value={{
        dark: darkTheme.className,
        light: `light`,
      }}
    >
      <Meta />

      <VibeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </VibeProvider>
    </ThemeProvider>
  );
}
