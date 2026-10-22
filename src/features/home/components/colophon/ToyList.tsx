'use client'

import { Language } from '../../../../types'
import { shakeTallestPine } from '../../../scene'
import { useThemeMode } from '../../../theme'
import { focusRing } from '../../styles'
import { colophonCopy } from './colophonCopy'

const tryClass = `ml-xs bg-paper-2 px-2xs py-3xs font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-2 hover:bg-paper-3 hover:text-ink ${focusRing}`

/** The scene's interactions, with keyboard-friendly "Try it" buttons. */
export function ToyList({ language }: { language: Language }) {
  const t = colophonCopy[language]
  const { toggle } = useThemeMode()

  const toys: Array<{ text: string; action?: () => void }> = [
    { text: t.sun, action: toggle },
    { text: t.cloud },
    { text: t.tree, action: shakeTallestPine },
    { text: t.console },
    { text: t.weather },
  ]

  return (
    <>
      <ul className='m-0 mt-xs grid list-none gap-2xs p-0 text-sm text-ink-2'>
        {toys.map((toy) => (
          <li key={toy.text}>
            <span aria-hidden className='text-ink-3'>
              ·{' '}
            </span>
            {toy.text}
            {toy.action && (
              <button type='button' onClick={toy.action} className={tryClass}>
                {t.tryIt}
              </button>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}
