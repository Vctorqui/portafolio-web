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
          <title>Victor Quiñones | Frontend Developer</title>
          <meta name='title' content='Victor Quiñones | Frontend Developer' />
          <meta
            name='description'
            content='Portafolio de Victor Quiñones, Frontend Developer especializado en React, Next.js y TypeScript. Construyo interfaces rápidas, accesibles y escalables.'
          />
          <meta
            name='keywords'
            content='Victor Quiñones, Frontend Developer, Portafolio, React, Next.js, TypeScript, Material UI, TailwindCSS, JavaScript, CSS, HTML5, Venezuela'
          />
          <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
          <meta name='author' content='Victor Quiñones' />
          <meta name='robots' content='index, follow' />
          <meta name='language' content='es, en' />
          <link rel='alternate' href='https://victorqui.dev' hrefLang='es' />
          <link rel='alternate' href='https://victorqui.dev' hrefLang='en' />
          <link rel='canonical' href='https://victorqui.dev' />
          <meta property='og:title' content='Victor Quiñones | Frontend Developer' />
          <meta
            property='og:description'
            content='Portafolio de Victor Quiñones, Frontend Developer especializado en React, Next.js y TypeScript. Construyo interfaces rápidas, accesibles y escalables.'
          />
          <meta property='og:image' content='https://victorqui.dev/images/profile-perfil.webp' />
          <meta property='og:url' content='https://victorqui.dev' />
          <meta property='og:type' content='website' />
          <meta property='og:site_name' content='Victor Quiñones' />
          <meta property='og:locale' content='es_ES' />
          <meta property='og:locale:alternate' content='en_US' />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:title' content='Victor Quiñones | Frontend Developer' />
          <meta
            name='twitter:description'
            content='Portafolio de Victor Quiñones, Frontend Developer especializado en React, Next.js y TypeScript. Construyo interfaces rápidas, accesibles y escalables.'
          />
          <meta name='twitter:image' content='https://victorqui.dev/images/perfil_profile.webp' />
          <meta name='twitter:creator' content='@victorqui.dev' />
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: 'Victor Quiñones',
                url: 'https://victorqui.dev',
                jobTitle: 'Frontend Developer',
                worksFor: {
                  '@type': 'Organization',
                  name: 'Freelance',
                },
                sameAs: [
                  'https://github.com/Vctorqui',
                  'https://www.linkedin.com/in/victor-quinones-14a32426b',
                  'https://twitter.com/victorqui_dev',
                ],
                image: 'https://victorqui.dev/images/profile-perfil.webp',
                address: {
                  '@type': 'PostalAddress',
                  addressCountry: 'Venezuela',
                },
              }),
            }}
          />
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
