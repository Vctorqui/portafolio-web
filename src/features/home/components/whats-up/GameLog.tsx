import { gameLog } from '../../../../constants/banner'
import { PixelIcon } from '../../../../shared/ui/pixel'
import { Language } from '../../../../types'
import { Fragment } from 'react'
import { GAMEPAD, HOURGLASS, TROPHY } from './gameIcons'
import { SaveProgress } from './SaveProgress'

/** Pixel icon per row: trophy, a gamepad being played, a running hourglass. */
const icons = {
  done: { frames: TROPHY, className: 'text-arcade-amber' },
  playing: { frames: GAMEPAD, frameMs: 260, className: 'text-ink' },
  next: { frames: HOURGLASS, frameMs: 650, className: 'text-ink-3' },
} as const

const rows = {
  es: [
    { key: 'done', label: 'Ya lo pasé' },
    { key: 'playing', label: 'Jugando ahora' },
    { key: 'next', label: 'El que espero' },
  ],
  en: [
    { key: 'done', label: 'Beaten' },
    { key: 'playing', label: 'Playing now' },
    { key: 'next', label: 'Waiting for' },
  ],
} as const

/** Beaten / playing / waiting-for games, with dotted leaders like a game menu. */
export function GameLog({ language }: { language: Language }) {
  return (
    <ul
      className='m-0 mt-xs grid max-w-[30rem] list-none gap-3xs p-0 text-sm'
      aria-label={language === 'es' ? 'Videojuegos' : 'Video games'}
    >
      {rows[language].map((row) => {
        const game = gameLog[row.key]
        const current = row.key === 'playing'
        const progress = current ? gameLog.playing.progress : undefined

        return (
          <Fragment key={row.key}>
            <li className='flex items-baseline gap-xs'>
              <span className='flex w-[22px] shrink-0 justify-center self-center'>
                <PixelIcon {...icons[row.key]} />
              </span>
              <span className={current ? 'text-ink' : 'text-ink-3'}>{row.label}</span>
              <span
                aria-hidden
                className='min-w-md flex-1 translate-y-[-0.2em] border-b-2 border-dotted border-rule'
              />
              <span className={`text-right ${current ? 'font-medium text-ink' : 'text-ink-2'}`}>
                {game.title}
                <span className='ml-2xs font-mono text-xs text-ink-3'>{game.platform}</span>
              </span>
            </li>
            {progress !== undefined && (
              <li className='mb-2xs pl-[calc(22px+var(--space-xs))]'>
                <SaveProgress value={progress} language={language} />
              </li>
            )}
          </Fragment>
        )
      })}
    </ul>
  )
}
