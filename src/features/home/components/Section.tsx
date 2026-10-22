import type { ReactNode } from 'react'
import { sectionTitleClass } from '../styles'

/** A titled page section wired for the GSAP reveal and the "explorer" find. */
export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className='section-reveal scroll-mt-lg py-xl'>
      <h2 id={`${id}-title`} className={`mb-md ${sectionTitleClass}`} data-gsap='section-copy'>
        {title}
      </h2>
      <div data-gsap='section-proof'>{children}</div>
    </section>
  )
}
