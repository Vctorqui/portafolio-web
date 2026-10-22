'use client'

import { useEffect } from 'react'
import { SECTION_IDS, markSectionVisited } from './achievements'

/** Marks sections as seen while scrolling; feeds the "explorer" find. */
export function useSectionVisits() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry) => markSectionVisited(entry.target.id))
      },
      { rootMargin: '-30% 0px -50% 0px' }
    )

    SECTION_IDS.forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])
}
