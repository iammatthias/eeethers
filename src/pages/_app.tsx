import Background from '@/components/background';
import Layout from '@/components/layout';
import VibeProvider from '@/lib/vibeProvider';
import { AppProps } from 'next/app';
import { globalStyles } from '@/styles/stitches.config';

export default function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();
  return (
    <VibeProvider>
      <Layout>
        <Component {...pageProps} />
        <Background />
      </Layout>
    </VibeProvider>
  );
}
