import Head from 'next/head'
import { useEffect, useState } from 'react'
import {
  PixelButton,
  PixelFrame,
  PixelLinkButton,
  StatBar,
} from '@/src/shared/ui/pixel'
import {
  applyThemeMode,
  getNextThemeMode,
  readAppliedThemeMode,
  type ThemeMode,
} from '@/src/features/theme/theme'

const swatches = [
  ['paper', 'bg-paper'],
  ['paper-2', 'bg-paper-2'],
  ['paper-3', 'bg-paper-3'],
  ['rule', 'bg-rule'],
  ['brand', 'bg-brand'],
  ['amber', 'bg-arcade-amber'],
  ['magenta', 'bg-arcade-magenta'],
  ['cyan', 'bg-arcade-cyan'],
  ['danger', 'bg-arcade-danger'],
]

/** Dev style guide for the Player One theme. Safe to delete once the redesign ships. */
export default function Kit() {
  const [mode, setMode] = useState<ThemeMode>('dark')

  useEffect(() => setMode(readAppliedThemeMode()), [])

  const toggle = () => {
    const next = getNextThemeMode(mode)
    applyThemeMode(next)
    setMode(next)
  }

  return (
    <main className='mx-auto flex max-w-[var(--measure)] flex-col gap-xl px-md py-xl'>
      <Head>
        <title>Kit · Player One</title>
        <meta name='robots' content='noindex' />
      </Head>

      <header className='flex flex-wrap items-center justify-between gap-sm'>
        <p className='font-pixel text-xs uppercase text-brand'>
          Player One / Kit <span className='pixel-blink'>_</span>
        </p>
        <PixelButton variant='ghost' onClick={toggle}>
          Tema: {mode}
        </PixelButton>
      </header>

      <section className='flex flex-col gap-md'>
        <h1 className='font-display text-display text-ink'>
          Victor Quiñones
        </h1>
        <h2 className='font-display text-2xl text-brand'>Press Start</h2>
        <p className='max-w-prose text-md text-ink-2'>
          El texto largo se mantiene en Inter Tight para que se lea sin
          esfuerzo. La fuente pixel queda solo para titulares y HUD, con
          acentos como á, é, í, ó, ú y ñ.
        </p>
        <p className='font-mono text-sm text-ink-3'>
          const player = &quot;Victor&quot;; // JetBrains Mono
        </p>
      </section>

      <section className='grid grid-cols-3 gap-sm sm:grid-cols-5'>
        {swatches.map(([name, cls]) => (
          <div key={name} className='flex flex-col gap-3xs'>
            <span className={`h-14 border-2 border-rule ${cls}`} />
            <span className='font-mono text-xs text-ink-2'>{name}</span>
          </div>
        ))}
      </section>

      <section className='flex flex-wrap items-center gap-md'>
        <PixelButton>Start</PixelButton>
        <PixelButton variant='ghost'>Options</PixelButton>
        <PixelLinkButton href='#kit' variant='ghost'>
          Link
        </PixelLinkButton>
      </section>

      <section className='grid gap-lg sm:grid-cols-2'>
        <PixelFrame raised className='p-md'>
          <p className='mb-sm font-pixel text-xs uppercase text-brand'>
            Quest log
          </p>
          <p className='text-sm text-ink-2'>
            Marco pixel con sombra dura y esquinas cortadas.
          </p>
        </PixelFrame>
        <PixelFrame tone='accent' className='flex flex-col gap-sm p-md'>
          <StatBar label='HP' value={80} tone='accent' />
          <StatBar label='XP' value={60} tone='amber' />
          <StatBar label='MP' value={40} tone='cyan' />
          <StatBar label='SP' value={20} tone='magenta' />
        </PixelFrame>
      </section>
    </main>
  )
}
