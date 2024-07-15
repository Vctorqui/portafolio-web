import theme from '@/theme/theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Head>
          <title>Victor Web</title>
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
