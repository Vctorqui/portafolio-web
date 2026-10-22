'use client'

import { Moon, Sun, Volume2, VolumeX } from 'lucide-react'
import { bannerLabels } from '../../../../constants/banner'
import { Language } from '../../../../types'
import { unlockAchievement } from '../../../achievements'
import { setSoundMode, useSoundMode } from '../../../sound'
import { useThemeMode } from '../../../theme'
import { pillClass } from '../../styles'

const RESUME_HREF = '/Victor_Quinones_Frontend_Resume.pdf'

/** Contact links plus the sound, theme and language toggles, as pills. */
export function HeaderNav({
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

  const links = [
    { label: 'Email', href: 'mailto:victor.quinones.ch@gmail.com' },
    { label: 'GitHub', href: 'https://github.com/Vctorqui' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/victorqui' },
    { label: bannerLabels[language].social.resume, href: RESUME_HREF },
  ]

  return (
    <nav aria-label={language === 'es' ? 'Contacto y ajustes' : 'Contact and settings'}>
      <ul className='m-0 flex list-none flex-wrap items-center gap-2xs p-0'>
        {links.map((link) => {
          const external = !link.href.startsWith('mailto:')
          return (
            <li key={link.label}>
              <a
                href={link.href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                onClick={() => unlockAchievement('open-line')}
                className={pillClass}
              >
                {link.label}
              </a>
            </li>
          )
        })}
        <li>
          <button
            type='button'
            onClick={() => setSoundMode(sound === 'on' ? 'off' : 'on')}
            className={pillClass}
            aria-label={language === 'es' ? 'Sonido' : 'Sound'}
            aria-pressed={sound === 'on'}
          >
            <SoundIcon className='h-3.5 w-3.5' strokeWidth={1.75} />
          </button>
        </li>
        <li>
          <button
            type='button'
            onClick={toggle}
            className={pillClass}
            aria-label={language === 'es' ? 'Cambiar tema' : 'Toggle theme'}
          >
            <ThemeIcon className='h-3.5 w-3.5' strokeWidth={1.75} />
          </button>
        </li>
        <li>
          <button
            type='button'
            onClick={() => onLanguageChange(language === 'es' ? 'en' : 'es')}
            className={pillClass}
            aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a español'}
          >
            {language === 'es' ? 'EN' : 'ES'}
          </button>
        </li>
      </ul>
    </nav>
  )
}
