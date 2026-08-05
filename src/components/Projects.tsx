import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Language } from '../types'
import { ProjectRecord } from '../constants/projects'
import { withBrandAccent } from './site/IndexSections'

const ShareBtn = dynamic(
  () => import('./shared/ShareBtn').then((module) => module.ShareBtn),
  { ssr: false }
)

export const Projects = ({
  project,
  language,
  index,
  compact = false,
}: {
  project: ProjectRecord
  language: Language
  index: number
  compact?: boolean
}) => {
  const shareMsg =
    language === 'es' ? '¡Mira este proyecto!' : 'Check out this project!'

  const description =
    language === 'es'
      ? project.spanish_description || project.english_description
      : project.english_description || project.spanish_description

  const plate = String(index + 1).padStart(2, '0')
  const stackLabel = project.stack.join(' · ')

  return (
    <li
      className={`group grid grid-cols-[4ch_1fr] gap-md border border-rule bg-paper-2 p-md align-baseline transition-[background-color,border-color,transform] duration-mid ease-out hover:-translate-y-3xs hover:border-brand sm:grid-cols-[5ch_1fr] ${
        compact ? 'p-sm' : ''
      }`}
    >
      <span className='font-mono text-[0.8125rem] tabular-nums text-ink-2'>
        {plate}
      </span>
      <div className='min-w-0'>
        {project.preview_link ? (
          <Link
            href={project.preview_link}
            target='_blank'
            rel='noopener noreferrer'
            className='border-b border-rule pb-px text-ink no-underline transition-colors duration-short ease-out group-hover:border-brand hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus)]'
          >
            {project.title}
          </Link>
        ) : (
          <span className='text-ink'>{project.title}</span>
        )}
        {description && (
          <p
            className={`${compact ? 'mt-2xs line-clamp-4' : 'mt-3xs'} text-sm text-ink-2`}
            dangerouslySetInnerHTML={{
              __html: withBrandAccent(String(description)),
            }}
          />
        )}
        {stackLabel && (
          <p className='mt-2xs font-mono text-xs text-ink-3'>{stackLabel}</p>
        )}
        {project.preview_link && (
          <div className='mt-sm flex items-center gap-sm'>
            <ShareBtn
              insert={project.preview_link}
              content={shareMsg}
              classTailwind='text-ink-3 hover:text-brand'
            />
          </div>
        )}
      </div>
    </li>
  )
}
