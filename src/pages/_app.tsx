import Layout from '@/components/layout';
import VibeProvider from '@/lib/vibeProvider';
import { AppProps } from 'next/app';
import { globalStyles } from '@/styles/stitches.config';
import Background from '@/components/background';

export default function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();
  return (
    <>
      <VibeProvider>
        <Layout>
          <Component {...pageProps} />
          <Background />
        </Layout>
      </VibeProvider>
    </>
  );
}
