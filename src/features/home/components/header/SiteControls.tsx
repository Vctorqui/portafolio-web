'use client'

import { Moon, Sun, Volume2, VolumeX } from 'lucide-react'
import { Language } from '../../../../types'
import { setSoundMode, useSoundMode } from '../../../sound'
import { useThemeMode } from '../../../theme'
import { controlClass } from '../../styles'

/** Sound, theme and language toggles, pinned to the top-right corner so they stay in reach. */
export function SiteControls({
  language,
  onLanguageChange,
}: {
  language: Language
  onLanguageChange: (lang: Language) => void
}) {
  const { mode, toggle } = useThemeMode()
  const sound = useSoundMode()
  const ThemeIcon = mode === 'dark' ? Sun : Moon
  const SoundIcon = sound === 'on' ? Volume2 : VolumeX

  return (
    <div
      role='group'
      aria-label={language === 'es' ? 'Ajustes' : 'Settings'}
      className='fixed right-sm top-sm z-40 flex items-center bg-[color-mix(in_oklch,var(--color-paper)_80%,transparent)] backdrop-blur-sm'
    >
      <button
        type='button'
        onClick={() => setSoundMode(sound === 'on' ? 'off' : 'on')}
        className={controlClass}
        aria-label={language === 'es' ? 'Sonido' : 'Sound'}
        aria-pressed={sound === 'on'}
      >
        <SoundIcon className='h-3.5 w-3.5' strokeWidth={1.75} />
      </button>
      <button
        type='button'
        onClick={toggle}
        className={controlClass}
        aria-label={language === 'es' ? 'Cambiar tema' : 'Toggle theme'}
      >
        <ThemeIcon className='h-3.5 w-3.5' strokeWidth={1.75} />
      </button>
      <button
        type='button'
        onClick={() => onLanguageChange(language === 'es' ? 'en' : 'es')}
        className={controlClass}
        aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a español'}
      >
        {language === 'es' ? 'EN' : 'ES'}
      </button>
    </div>
  )
}
