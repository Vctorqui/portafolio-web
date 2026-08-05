import Link from 'next/link'
import type { ReactNode } from 'react'
import { Language } from '../../types'
import { bannerLabels } from '../../constants/banner'
import { aboutMeLabels } from '../../constants/aboutMe'
import { experiences } from '../../constants/experience'
import { ProjectRecord } from '../../constants/projects'
import { Projects } from '../Projects'
import { RailClock } from './SideRail'
import { WeatherWidget } from './WeatherWidget'

/** Map legacy rose hex spans to token accent; strip emoji for austere DNA. */
export function withBrandAccent(html: string) {
  return html
    .replace(/text-\[#EF5A6F\]/gi, 'text-brand')
    .replace(/font-bold/g, 'font-medium')
    .replace(
      /class="font-medium text-brand"/g,
      'class="relative inline-block origin-bottom font-semibold text-brand will-change-transform" data-gsap-accent'
    )
    .replace(
      /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu,
      ''
    )
    .replace(/\s{2,}/g, ' ')
    .trim()
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className='mb-sm font-mono text-xs uppercase tracking-[0.12em] text-brand'>
      {children}
    </p>
  )
}

function SectionHead({
  children,
  lede = false,
}: {
  children: string
  lede?: boolean
}) {
  const Tag = lede ? 'h1' : 'h2'

  if (lede) {
    return (
      <h1
        className='font-display text-display font-semibold tracking-normal text-ink'
        aria-label={children}
        data-letter-title
      >
        {children.split(/(\s+)/).map((segment, segmentIndex) => {
          if (/^\s+$/.test(segment)) {
            return (
              <span key={`space-${segmentIndex}`} aria-hidden>
                {' '}
              </span>
            )
          }

          return (
            <span
              key={`${segment}-${segmentIndex}`}
              className='inline-block whitespace-nowrap'
              aria-hidden
            >
              {Array.from(segment).map((char, charIndex) => (
                <span
                  key={`${char}-${charIndex}`}
                  className='inline-block overflow-hidden align-baseline'
                >
                  <span className='inline-block' data-gsap-letter>
                    {char}
                  </span>
                </span>
              ))}
            </span>
          )
        })}
      </h1>
    )
  }

  return (
    <Tag
      className='font-display text-2xl font-semibold tracking-normal text-ink'
    >
      {children}
    </Tag>
  )
}

function SplitSection({
  id,
  label,
  title,
  children,
  proof,
  lede = false,
}: {
  id: string
  label: string
  title: string
  children: ReactNode
  proof?: ReactNode
  lede?: boolean
}) {
  return (
    <section
      id={id}
      className={`section-reveal grid min-h-[var(--section-min)] scroll-mt-[var(--section-scroll-offset)] grid-cols-1 gap-xl border-b border-rule py-2xl last:border-b-0 lg:items-center lg:gap-2xl lg:py-3xl ${
        proof
          ? 'lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]'
          : 'lg:grid-cols-1'
      }`}
    >
      <div
        className={`min-w-0 ${
          proof
            ? 'lg:sticky lg:top-[var(--sticky-offset)] lg:self-start'
            : 'max-w-[var(--measure-hero)]'
        }`}
        data-gsap='section-copy'
      >
        <SectionLabel>{label}</SectionLabel>
        <SectionHead lede={lede}>{title}</SectionHead>
        <div
          className={`mt-lg text-md leading-relaxed text-ink-2 ${
            proof
              ? 'max-w-prose'
              : 'max-w-[min(100%,var(--measure-hero-copy))]'
          }`}
        >
          {children}
        </div>
      </div>
      {proof && (
        <div className='min-w-0' data-gsap='section-proof'>
          {proof}
        </div>
      )}
    </section>
  )
}

function ProofPanel({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`relative overflow-hidden border border-rule bg-paper-2 p-md shadow-[var(--shadow-panel)] ${className}`}
    >
      <div className='pointer-events-none absolute inset-x-0 top-0 h-px bg-brand opacity-70' />
      {children}
    </div>
  )
}

export function IndexSection({ language }: { language: Language }) {
  const t = aboutMeLabels[language]
  const head =
    language === 'es'
      ? 'Un índice corto de quién soy y qué construyo.'
      : 'A small, scannable index of who I am and what I build.'
  const close =
    language === 'es'
      ? 'Sic Parvis Magna'
      : 'Sic Parvis Magna'

  return (
    <SplitSection
      id='index'
      label={language === 'es' ? '00 · Índice' : '00 · Index'}
      title={head}
      lede
    >
      <div className='text-ink'>
        <p
          className='mb-md [&_.text-brand]:inline-block [&_.text-brand]:origin-bottom'
          dangerouslySetInnerHTML={{ __html: withBrandAccent(t.about) }}
          data-gsap-accent-scope
        />
        <p className='text-ink-2'>{close}</p>
      </div>
    </SplitSection>
  )
}

export function NowSection({ language }: { language: Language }) {
  const t = bannerLabels[language]
  const status = t.statusCards
  const head =
    language === 'es'
      ? 'Frontend, un sistema a la vez.'
      : 'Frontend, one system at a time.'

  return (
    <SplitSection
      id='now'
      label={language === 'es' ? '01 · Ahora' : '01 · Now'}
      title={head}
      proof={
        <ProofPanel>
          <div className='mb-md grid gap-xs border-b border-rule pb-md sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center'>
            <div className='font-mono text-[0.6875rem] tracking-wide'>
              <RailClock language={language} />
            </div>
            <WeatherWidget />
          </div>
          <dl className='grid gap-md'>
            {status.map((item, index) => (
              <div
                key={`${item.value}-${index}`}
                className='grid gap-2xs border-b border-rule pb-md last:border-b-0 last:pb-0 sm:grid-cols-[8ch_1fr]'
              >
                <dt className='font-mono text-xs tabular-nums text-ink-3'>
                  {String(index + 1).padStart(2, '0')}
                </dt>
                <dd className='min-w-0'>
                  <p className='font-display text-lg font-semibold text-ink'>
                    {item.value}
                  </p>
                  <p className='mt-3xs text-sm text-ink-2'>{item.sub}</p>
                </dd>
              </div>
            ))}
          </dl>
        </ProofPanel>
      }
    >
      <div className='space-y-md text-ink'>
        <p>
          {t.bio_start}
          <strong className='font-medium text-brand'>{t.bio_highlight}</strong>
        </p>
        <div className='text-ink-2'>
          {language === 'es' ? (
            <div className='flex flex-col '>
              <p>
              Ahora: <strong className='font-medium text-ink'>{status[1].value}</strong>{' '}
              en {status[1].sub}.
              </p>
              <p>
              Proyecto en curso:{' '}
              <strong className='font-medium text-ink'>{status[0].value}</strong> —{' '}
              {status[0].sub}.

              </p>
              <p>
                Videojuego actual: <strong className='font-medium text-ink'>{status[2].value}</strong> —{' '}
                {status[2].sub}.
              </p>
            </div>
          ) : (
            <div className='flex flex-col '>
              <p>
              Right now: <strong className='font-medium text-ink'>{status[1].value}</strong>{' '}
              </p>
              <p>
              at {status[1].sub}. <br /> Current project:{' '}
              <strong className='font-medium text-ink'>{status[0].value}</strong> —{' '}
              {status[0].sub}.
            </p>
            <p>
              Current game: <strong className='font-medium text-ink'>{status[2].value}</strong> —{' '}
              {status[2].sub}.
            </p>
            </div>
          )}
        </div>
      </div>
    </SplitSection>
  )
}

export function YearsSection({ language }: { language: Language }) {
  const head =
    language === 'es'
      ? 'Dónde he trabajado.'
      : "Where I've worked, in tabular form."

  const columns =
    language === 'es'
      ? (['Años', 'Empresa', 'Qué'] as const)
      : (['Years', 'Company', 'What'] as const)

  return (
    <SplitSection
      id='years'
      label={language === 'es' ? '02 · Años' : '02 · Years'}
      title={head}
      proof={
        <ProofPanel className='p-0'>
          <div className='overflow-x-auto'>
            <table className='w-full min-w-[var(--measure-table)] border-collapse text-[0.9375rem] tabular-nums'>
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col}
                      className='border-b border-rule px-md py-sm text-left font-mono text-xs font-normal uppercase tracking-[0.06em] text-ink-2'
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {experiences.map((exp) => (
                  <tr key={exp.id}>
                    <td className='w-[12ch] border-b border-rule px-md py-md align-baseline font-mono text-ink-2'>
                      {language === 'es' ? exp.spanish_date : exp.english_date}
                    </td>
                    <td className='w-[18ch] border-b border-rule px-md py-md align-baseline font-medium text-ink'>
                      {exp.company}
                      <span className='mt-3xs block text-sm font-normal text-ink-2'>
                        {exp.position}
                      </span>
                    </td>
                    <td className='border-b border-rule px-md py-md align-baseline text-ink-2'>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: withBrandAccent(
                            language === 'es'
                              ? exp.spanish_description
                              : exp.english_description
                          ),
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ProofPanel>
      }
    >
      <p>
        {language === 'es'
          ? 'El recorrido queda tratado como una ficha técnica: años, contexto y responsabilidad, sin adornos.'
          : 'The path is treated as a technical sheet: years, context, and responsibility, without decoration.'}
      </p>
    </SplitSection>
  )
}

export function WorkSection({
  language,
  featured,
  realEstate,
}: {
  language: Language
  featured: ProjectRecord[]
  realEstate: ProjectRecord[]
}) {
  const head =
    language === 'es'
      ? 'Piezas que me gustaría destacar.'
      : "Pieces I'd point at first."
  const realtyLabel =
    language === 'es' ? 'Inmobiliarias' : 'Real estate'

  return (
    <SplitSection
      id='work'
      label={language === 'es' ? '03 · Trabajo' : '03 · Work'}
      title={head}
      proof={
        <div className='grid gap-md'>
          <ul className='m-0 grid list-none gap-md p-0'>
            {featured.map((project, index) => (
              <Projects
                key={project.id}
                project={project}
                language={language}
                index={index}
              />
            ))}
          </ul>
          {realEstate.length > 0 && (
            <ProofPanel>
              <p className='mb-md font-mono text-xs uppercase tracking-[0.12em] text-ink-3'>
                {realtyLabel}
              </p>
              <ul className='m-0 grid list-none gap-sm p-0 sm:grid-cols-2'>
                {realEstate.map((project, index) => (
                  <Projects
                    key={project.id}
                    project={project}
                    language={language}
                    index={featured.length + index}
                    compact
                  />
                ))}
              </ul>
            </ProofPanel>
          )}
        </div>
      }
    >
      <p>
        {language === 'es'
          ? 'Una selección de trabajos reales primero; el resto funciona como índice de alcance y criterio.'
          : 'Real client work comes first; the rest works as an index of range and judgment.'}
      </p>
    </SplitSection>
  )
}

export function ReachSection({ language }: { language: Language }) {
  const t = bannerLabels[language]
  const head =
    language === 'es'
      ? 'Los lugares donde puedes contactarme.'
      : 'The places you can reach me.'

  const rows = [
    {
      label: 'Email',
      href: 'mailto:victor.quinones.ch@gmail.com',
      value: 'victor.quinones.ch@gmail.com',
    },
    {
      label: 'GitHub',
      href: 'https://github.com/Vctorqui',
      value: '@Vctorqui',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/victorqui',
      value: '/in/victorqui',
    },
    {
      label: language === 'es' ? 'CV' : 'Resume',
      href:
        language === 'es'
          ? '/Victor_Quinones_Frontend_Resume.pdf'
          : '/Victor_Quinones_Frontend_Resume.pdf',
      value: t.social.resume,
    },
  ]

  return (
    <SplitSection
      id='reach'
      label={language === 'es' ? '04 · Contacto' : '04 · Reach'}
      title={head}
      proof={
        <div className='grid grid-cols-1 gap-md sm:grid-cols-2'>
          {rows.map((row) => (
            <div
              key={row.label}
              className='grid gap-2xs border border-rule bg-paper-2 p-md font-mono text-sm'
            >
              <span className='text-xs uppercase tracking-[0.06em] text-ink-2'>
                {row.label}
              </span>
              <Link
                href={row.href}
                target={row.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={
                  row.href.startsWith('mailto:')
                    ? undefined
                    : 'noopener noreferrer'
                }
                className='break-words text-ink no-underline transition-colors duration-short ease-out hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]'
              >
                {row.value}
              </Link>
            </div>
          ))}
        </div>
      }
    >
      <p>
        {language === 'es'
          ? 'Si el proyecto necesita interfaz, sistemas de componentes o una landing que se pueda mantener, este es el punto de entrada.'
          : 'If the project needs interface work, component systems, or a landing page that can be maintained, this is the entry point.'}
      </p>
    </SplitSection>
  )
}
