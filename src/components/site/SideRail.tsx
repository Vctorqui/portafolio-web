'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Code2, FileText, Github, Linkedin, Mail } from 'lucide-react'
import { Language } from '../../types'
import { bannerLabels } from '../../constants/banner'
import { BannerDogScene } from '../banner/BannerDogScene'

type SideRailProps = {
  language: Language
  onLanguageChange: (lang: Language) => void
}

const TIMEZONE = 'America/Santiago'

const links = {
  es: [
    { href: '#index', num: '00', label: 'Índice' },
    { href: '#now', num: '01', label: 'Ahora' },
    { href: '#years', num: '02', label: 'Años' },
    { href: '#work', num: '03', label: 'Trabajo' },
    { href: '#reach', num: '04', label: 'Contacto' },
  ],
  en: [
    { href: '#index', num: '00', label: 'Index' },
    { href: '#now', num: '01', label: 'Now' },
    { href: '#years', num: '02', label: 'Years' },
    { href: '#work', num: '03', label: 'Work' },
    { href: '#reach', num: '04', label: 'Reach' },
  ],
}

const iconClass =
  'text-ink-3 transition-colors duration-short ease-out hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]'

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]'

export function RailClock({ language }: { language: Language }) {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const locale = language === 'es' ? 'es-CL' : 'en-US'

    const tick = () => {
      const now = new Date()
      setTime(
        new Intl.DateTimeFormat(locale, {
          timeZone: TIMEZONE,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(now)
      )
      setDate(
        new Intl.DateTimeFormat(locale, {
          timeZone: TIMEZONE,
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        }).format(now)
      )
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [language])

  if (!time) {
    return (
      <span className='tabular-nums text-ink-3' aria-hidden>
        —:—:—
      </span>
    )
  }

  return (
    <time
      dateTime={time}
      className='block tabular-nums text-ink-2'
      title={`Santiago · ${TIMEZONE}`}
    >
      <span className='block text-[0.8125rem] tracking-wide text-ink'>
        {time}
      </span>
      <span className='mt-3xs block text-[0.6875rem] text-ink-3'>
        {date} · Santiago
      </span>
    </time>
  )
}

export function LanguageSwitch({
  language,
  onLanguageChange,
}: {
  language: Language
  onLanguageChange: (lang: Language) => void
}) {
  return (
    <span className='flex items-center gap-3xs font-mono text-[0.6875rem] tracking-wide text-ink-3'>
      {(['es', 'en'] as Language[]).map((lang, i) => (
        <span key={lang} className='inline-flex items-center gap-3xs'>
          {i > 0 && <span aria-hidden>/</span>}
          <button
            type='button'
            onClick={() => onLanguageChange(lang)}
            aria-pressed={language === lang}
            className={`uppercase transition-colors duration-short ease-out ${focusRing} ${
              language === lang
                ? 'text-brand'
                : 'text-ink-3 hover:text-ink-2'
            }`}
          >
            {lang}
          </button>
        </span>
      ))}
    </span>
  )
}

export function SideRail({
  language,
  onLanguageChange,
}: SideRailProps) {
  const nav = links[language]
  const t = bannerLabels[language]
  const [activeSection, setActiveSection] = useState(nav[0].href.slice(1))
  const role =
    language === 'es'
      ? 'Frontend developer · CL'
      : 'Frontend developer · CL'

  const social = [
    {
      id: 'github',
      href: 'https://github.com/Vctorqui',
      label: t.social.githubTip,
      icon: Github,
    },
    {
      id: 'linkedin',
      href: 'https://www.linkedin.com/in/victorqui/',
      label: t.social.linkedinTip,
      icon: Linkedin,
    },
    {
      id: 'codepen',
      href: 'https://codepen.io/vichorq',
      label: t.social.codepenTip,
      icon: Code2,
    },
    {
      id: 'email',
      href: 'mailto:victor.quinones.ch@gmail.com',
      label: t.social.emailTip,
      icon: Mail,
    },
    {
      id: 'resume',
      href:
        language === 'es'
          ? '/Victor_Quinones_Frontend_Resume.pdf'
          : '/Victor_Quinones_Frontend_Resume.pdf',
      label: t.social.resumeTip,
      icon: FileText,
    },
  ]

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      return
    }

    const sections = nav
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((section): section is HTMLElement => Boolean(section))

    if (sections.length === 0) {
      return
    }

    let frameId: number | null = null

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            const ratioDiff = b.intersectionRatio - a.intersectionRatio
            return ratioDiff || a.boundingClientRect.top - b.boundingClientRect.top
          })

        const nextSection = visibleEntries[0]?.target.id

        if (!nextSection) {
          return
        }

        if (frameId) {
          window.cancelAnimationFrame(frameId)
        }

        frameId = window.requestAnimationFrame(() => {
          setActiveSection(nextSection)
        })
      },
      {
        rootMargin: '-24% 0px -62% 0px',
        threshold: [0, 0.2, 0.45, 0.7],
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()

      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [nav])

  return (
    <header
      className='sticky top-sm z-40 border border-rule bg-paper px-xs py-xs shadow-[var(--shadow-panel)] sm:px-sm sm:py-sm'
      aria-label='Site identity and navigation'
    >
      <div className='grid gap-sm'>
        <div className='grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-sm gap-y-xs xl:grid-cols-[minmax(18rem,auto)_minmax(0,1fr)_auto] xl:gap-sm'>
          <div className='col-span-2 flex min-w-0 items-center gap-xs sm:gap-sm xl:col-span-1'>
            <BannerDogScene className='h-12 w-12 shrink-0 border-rule bg-paper-2 shadow-none sm:h-14 sm:w-14' />
            <div className='min-w-0'>
              <p className='truncate font-display text-[0.875rem] font-medium uppercase tracking-[0.04em] text-ink sm:text-sm sm:tracking-[0.06em]'>
                Victor Quiñones
              </p>
              <p className='mt-3xs truncate font-mono text-xs tracking-wide text-ink-2'>
                {role}
              </p>
              <div className='mt-2xs flex items-center gap-xs sm:gap-sm'>
                {social.map(({ id, href, label, icon: Icon }) => (
                  <Link
                    key={id}
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={
                      href.startsWith('mailto:')
                        ? undefined
                        : 'noopener noreferrer'
                    }
                    aria-label={label}
                    title={label}
                    className={iconClass}
                  >
                    <Icon className='h-4 w-4' strokeWidth={1.5} />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className='col-start-3 row-start-1 self-start justify-self-end pt-3xs xl:col-auto xl:row-auto xl:self-center xl:pt-0'>
            <LanguageSwitch
              language={language}
              onLanguageChange={onLanguageChange}
            />
          </div>

          <nav
            className='col-span-3 min-w-0 overflow-hidden xl:col-span-1 xl:overflow-x-auto'
            aria-label={language === 'es' ? 'Secciones' : 'Sections'}
          >
            <ul className='m-0 grid w-full grid-cols-5 list-none items-center gap-2xs p-0 xl:flex xl:min-w-max xl:justify-end'>
              {nav.map((item) => {
                const sectionId = item.href.slice(1)
                const isActive = activeSection === sectionId

                return (
                  <li key={item.href} className='min-w-0'>
                    <a
                      href={item.href}
                      title={item.label}
                      aria-label={`${item.num} · ${item.label}`}
                      aria-current={isActive ? 'true' : undefined}
                      onClick={() => setActiveSection(sectionId)}
                      className={`inline-flex min-h-10 w-full items-center justify-center gap-2xs whitespace-nowrap border px-0 font-mono text-[0.8125rem] tabular-nums no-underline transition-[background-color,border-color,color,transform] duration-mid ease-out hover:text-brand sm:min-h-11 sm:px-xs xl:w-auto ${
                        focusRing
                      } ${
                        isActive
                          ? 'border-brand bg-paper-2 text-brand'
                          : 'border-transparent text-ink-2'
                      }`}
                    >
                      <span>{item.num}</span>
                      <span className='hidden sm:inline'>{item.label}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
