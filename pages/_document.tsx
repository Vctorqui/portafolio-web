import { Head, Html, Main, NextScript } from 'next/document'
import { fxBootstrapScript } from '@/src/features/theme/fx'
import {
  DEFAULT_THEME_MODE,
  themeBootstrapScript,
} from '@/src/features/theme/theme'

export default function Document() {
  return (
    <Html
      lang='es'
      data-theme={DEFAULT_THEME_MODE}
      className={DEFAULT_THEME_MODE === 'dark' ? 'dark' : undefined}
    >
      <Head />
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: themeBootstrapScript + fxBootstrapScript,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
