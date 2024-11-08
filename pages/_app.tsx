import theme from '@/theme/theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import '@/src/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Head>
          <title>VictorDev Porfolio</title>
          <meta name='title' content='VictorDev Portfolio' />
          <meta
            name='description'
            content='Frontend Developer in Venezuela. React, Next.js, TypeScript, Material UI, TailwindCSS, JavaScript, CSS y HTML5.'
          />
          <meta name='keywords' content='Frontend Developer, Web Developer' />
          <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
          <meta name='author' content='Victor Quiñones' />
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
