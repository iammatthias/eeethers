import { createStitches } from '@stitches/react';

export const { styled, globalCss, getCssText } = createStitches({
  theme: {
    colors: {
      black: `#10162e`,
      white: `#F2F3F5`,
      gray: `#838594`,
    },
    fonts: {
      sans: `Inter, sans-serif`,
    },
    fontSizes: {
      1: `12px`,
      2: `14px`,
      3: `16px`,
      4: `20px`,
      5: `24px`,
      6: `32px`,
    },
  },
});

export const globalStyles = globalCss({
  'html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, main, menu, nav, output, ruby, section, summary, time, mark, audio, video':
    {
      margin: `0`,
      padding: `0`,
      border: `0`,
      fontSize: `100%`,
      font: `inherit`,
      verticalAlign: `baseline`,
    },
  'article, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section':
    {
      display: `block`,
    },
  '*[hidden]': {
    display: `none`,
  },
  body: {
    lineHeight: `1`,
  },
  'ol, ul': {
    listStyle: `none`,
  },
  'blockquote, q': {
    quotes: `none`,
  },
  'blockquote:before, blockquote:after, q:before, q:after': {
    content: ``,
  },
  table: {
    borderSpacing: `0`,
  },
});
