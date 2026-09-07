import { Head, Html, Main, NextScript } from 'next/document'
import {
  DEFAULT_THEME_MODE,
  themeBootstrapScript,
} from '@/src/lib/theme'

export default function Document() {
  return (
    <Html lang='es' data-theme={DEFAULT_THEME_MODE}>
      <Head>
        <script
          dangerouslySetInnerHTML={{ __html: themeBootstrapScript }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
