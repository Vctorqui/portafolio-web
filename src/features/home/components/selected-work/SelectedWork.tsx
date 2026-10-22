'use client'

import { useRef } from 'react'
import { ProjectRecord } from '../../../../constants/projects'
import { Language } from '../../../../types'
import { playBlip } from '../../../sound'
import { pillClass, sectionTitleClass } from '../../styles'
import { ProjectPanel } from './ProjectPanel'

/** Lines the first panel up with the text column, then bleeds to the edge. */
const railInset = 'max(var(--space-md), calc((100vw - var(--measure-table)) / 2 + var(--space-md)))'
const arrowClass = `${pillClass} min-w-8 justify-center`

/** Horizontal, full-bleed rail of project panels with prev/next arrows. */
export function SelectedWork({ language, featured }: { language: Language; featured: ProjectRecord[] }) {
  const railRef = useRef<HTMLUListElement>(null)

  const scrollRail = (direction: 1 | -1) => {
    const rail = railRef.current
    const panel = rail?.querySelector('li')
    if (!rail || !panel) return
    rail.scrollBy({ left: direction * (panel.clientWidth + 8), behavior: 'smooth' })
    playBlip('tap')
  }

  return (
    <section id='work' aria-labelledby='work-title' className='section-reveal scroll-mt-lg py-xl'>
      <div className='mb-md flex items-center justify-between gap-sm' data-gsap='section-copy'>
        <h2 id='work-title' className={sectionTitleClass}>
          {language === 'es' ? 'Trabajo seleccionado' : 'Selected work'}
        </h2>
        <div className='flex gap-2xs'>
          <button
            type='button'
            onClick={() => scrollRail(-1)}
            className={arrowClass}
            aria-label={language === 'es' ? 'Proyecto anterior' : 'Previous project'}
          >
            ←
          </button>
          <button
            type='button'
            onClick={() => scrollRail(1)}
            className={arrowClass}
            aria-label={language === 'es' ? 'Siguiente proyecto' : 'Next project'}
          >
            →
          </button>
        </div>
      </div>

      {/* Full-bleed rail: breaks out of the text column to the viewport edges. */}
      <div className='relative left-1/2 w-screen -translate-x-1/2'>
        <ul
          ref={railRef}
          data-gsap='section-proof'
          className='m-0 flex list-none snap-x snap-mandatory gap-xs overflow-x-auto p-0 pb-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
          style={{ paddingInline: railInset, scrollPaddingInline: railInset }}
          aria-label={language === 'es' ? 'Proyectos' : 'Projects'}
        >
          {featured.map((project) => (
            <ProjectPanel key={project.id} project={project} language={language} />
          ))}
        </ul>
      </div>
    </section>
  )
}
