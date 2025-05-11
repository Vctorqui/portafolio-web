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
          <title>VicDev</title>
          <meta name='title' content='VicDev Portfolio' />
          <meta
            name='description'
            content='Frontend Developer in Venezuela. React, Next.js, TypeScript, Material UI, TailwindCSS, JavaScript, CSS y HTML5.'
          />
          <meta name='keywords' content='Frontend Developer, Web Developer' />
          <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
          <meta name='author' content='Victor Quiñones' />
          <meta property='og:title' content='VicDev Portfolio' />
          <meta
            property='og:description'
            content='Frontend Developer in Venezuela. React, Next.js, TypeScript, Material UI, TailwindCSS, JavaScript, CSS y HTML5.'
          />
          <meta
            property='og:image'
            content='https://ibb.co/xDRbtgm'
          />
          <meta
            property='og:url'
            content='https://victorqui-portfolio.netlify.app/'
          />
          <meta property='og:type' content='website' />
          <meta property='og:site_name' content='VicDev Portfolio' />
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
