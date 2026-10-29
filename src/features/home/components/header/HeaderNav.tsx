'use client'

import { bannerLabels } from '../../../../constants/banner'
import { getResumeHref } from '../../../../constants/resume'
import { Language } from '../../../../types'
import { unlockAchievement } from '../../../achievements'
import { contactPillClass, primaryPillClass } from '../../styles'

/** Contact links, Email first as the primary action. Site toggles live in `SiteControls`. */
export function HeaderNav({ language }: { language: Language }) {
  const links = [
    { label: 'Email', href: 'mailto:victor.quinones.ch@gmail.com' },
    { label: 'GitHub', href: 'https://github.com/Vctorqui' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/victorqui' },
    { label: bannerLabels[language].social.resume, href: getResumeHref(language) },
  ]

  return (
    <nav aria-label={language === 'es' ? 'Contacto' : 'Contact'}>
      <ul className='m-0 flex list-none flex-wrap items-center gap-2xs p-0'>
        {links.map((link, index) => {
          const external = !link.href.startsWith('mailto:')
          return (
            <li key={link.label}>
              <a
                href={link.href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                onClick={() => unlockAchievement('open-line')}
                className={index === 0 ? primaryPillClass : contactPillClass}
              >
                {link.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
