import { Language } from '../../../types'
import { PixelScene } from '../../scene'
import { colophonCopy } from './colophon/colophonCopy'

/** Full-bleed ground scene with the credits sitting on the soil. */
export function SiteFooter({ language }: { language: Language }) {
  return (
    <footer className='relative mt-xl'>
      <PixelScene variant='ground' />
      <div className='scene-ground pointer-events-none absolute inset-x-0 bottom-0'>
        <div className='mx-auto flex max-w-[var(--measure-table)] flex-wrap justify-between gap-xs px-md pb-md font-mono text-xs'>
          <span>© {new Date().getFullYear()} Victor Quiñones</span>
          <span>{colophonCopy[language].footer}</span>
        </div>
      </div>
    </footer>
  )
}
