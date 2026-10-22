import type { AppProps } from 'next/app'
import { Inter_Tight, JetBrains_Mono } from 'next/font/google'
import '@/tokens.css'
import '@/src/styles/globals.css'

const interTight = Inter_Tight({ subsets: ['latin'], display: 'swap' })
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'], display: 'swap' })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-inter-tight: ${interTight.style.fontFamily};
          --font-jetbrains-mono: ${jetBrainsMono.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}
