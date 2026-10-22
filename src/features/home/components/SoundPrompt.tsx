'use client'

import { Language } from '../../../types'
import { unlockAchievement } from '../../achievements'
import { setSoundMode, useSoundMode } from '../../sound'
import { focusRing } from '../styles'

const copy = {
  es: { lead: 'Mejor con sonido.', hint: 'Audífonos o parlantes ayudan.', on: 'Activar', off: 'Ahora no' },
  en: { lead: 'Best experienced with sound.', hint: 'Headphones or speakers help.', on: 'Turn on', off: 'Not now' },
}

/** Opt-in for sound, shown until the visitor answers it once. */
export function SoundPrompt({ language }: { language: Language }) {
  const mode = useSoundMode()
  const t = copy[language]

  if (mode !== null) return null

  const answer = (next: 'on' | 'off') => {
    setSoundMode(next)
    unlockAchievement('press-start')
  }

  return (
    <div
      role='region'
      aria-label={t.lead}
      className='flex flex-wrap items-center justify-between gap-sm border-2 border-rule bg-paper-2 px-sm py-xs text-sm'
    >
      <p className='text-ink-2'>
        <span className='text-ink'>{t.lead}</span> {t.hint}
      </p>
      <div className='flex items-center gap-sm font-mono text-xs uppercase tracking-[0.12em]'>
        <button type='button' onClick={() => answer('on')} className={`bg-ink px-xs py-2xs text-paper ${focusRing}`}>
          {t.on}
        </button>
        <button type='button' onClick={() => answer('off')} className={`text-ink-3 hover:text-ink ${focusRing}`}>
          {t.off}
        </button>
      </div>
    </div>
  )
}
