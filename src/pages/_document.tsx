import Document, { Html, Head, Main, NextScript } from 'next/document';

// import Segment Snippet

import { getCssText } from '@/styles/stitches.config';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-US">
        <Head>
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
