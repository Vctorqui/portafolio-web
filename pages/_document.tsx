import theme from '@/theme/theme'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body style={{ background: '#000' }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
