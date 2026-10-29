import Image from 'next/image'
import { ProjectRecord } from '../../../../constants/projects'
import { withBrandAccent } from '../../../../shared/lib/withBrandAccent'
import { Language } from '../../../../types'
import { unlockAchievement } from '../../../achievements'
import { focusRing } from '../../styles'

function projectDescription(project: ProjectRecord, language: Language) {
  return language === 'es'
    ? project.spanish_description || project.english_description
    : project.english_description || project.spanish_description
}

/** Big dotted panel with the screenshot and a title pill; links to the live site. */
export function ProjectPanel({ project, language }: { project: ProjectRecord; language: Language }) {
  const panel = (
    <div className='relative aspect-[7/5] overflow-hidden bg-paper-2 [background-image:radial-gradient(var(--color-rule)_1px,transparent_1.2px)] [background-size:6px_6px]'>
      {project.image ? (
        <div className='absolute inset-x-[9%] bottom-[18%] top-[12%] overflow-hidden shadow-panel transition-transform duration-long ease-out group-hover:-translate-y-2xs'>
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            sizes='(min-width: 768px) 42rem, 86vw'
            className='object-cover object-top'
          />
        </div>
      ) : (
        <p aria-hidden className='absolute inset-0 grid place-items-center px-lg text-center font-mono text-lg text-ink-3'>
          {project.preview_link ? new URL(project.preview_link).hostname.replace(/^www\./, '') : project.title}
        </p>
      )}

      <span className='absolute bottom-sm left-sm inline-flex items-center gap-xs rounded-pill bg-ink px-md py-xs font-mono text-xs uppercase tracking-[0.18em] text-paper sm:bottom-md sm:left-md sm:text-sm'>
        {project.title}
        {project.preview_link && (
          <span aria-hidden className='transition-transform duration-short ease-out group-hover:translate-x-3xs'>
            ↗
          </span>
        )}
      </span>
    </div>
  )

  return (
    <li className='w-[min(86vw,42rem)] shrink-0 snap-start list-none'>
      {project.preview_link ? (
        <a
          href={project.preview_link}
          target='_blank'
          rel='noopener noreferrer'
          onClick={() => unlockAchievement('insert-coin')}
          className={`group block no-underline ${focusRing}`}
        >
          {panel}
        </a>
      ) : (
        <div className='group'>{panel}</div>
      )}
      <div className='mt-sm flex flex-wrap items-baseline justify-between gap-x-md gap-y-3xs'>
        <p
          className='max-w-[36rem] text-ink-2'
          dangerouslySetInnerHTML={{ __html: withBrandAccent(projectDescription(project, language)) }}
        />
        <p className='font-mono text-xs text-ink-2'>{project.stack.slice(0, 6).join(' · ')}</p>
      </div>
    </li>
  )
}
