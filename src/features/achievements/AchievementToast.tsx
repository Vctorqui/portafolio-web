import { useEffect } from 'react'
import { Trophy } from 'lucide-react'
import { Language } from '../../types'
import {
  dismissAchievementToast,
  getAchievementCopy,
} from './achievements'
import { playBlip } from '../sound/sound'
import { useAchievements } from './useAchievements'
import { PixelFrame } from '../../shared/ui/pixel'

const TOAST_MS = 4500

export function AchievementToast({ language }: { language: Language }) {
  const { queue } = useAchievements()
  const current = queue[0]

  useEffect(() => {
    if (!current) {
      return
    }

    playBlip('find')
    const id = window.setTimeout(dismissAchievementToast, TOAST_MS)
    return () => window.clearTimeout(id)
  }, [current])

  if (!current) {
    return null
  }

  const copy = getAchievementCopy(current, language)

  return (
    <div
      role='status'
      aria-live='polite'
      className='pointer-events-none fixed bottom-md left-md z-[60] max-w-[calc(100vw-2rem)]'
    >
      <PixelFrame
        key={current}
        raised
        tone='accent'
        className='flex items-center gap-sm bg-paper px-md py-sm motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2'
      >
        <Trophy className='h-6 w-6 shrink-0 text-arcade-amber' aria-hidden />
        <div className='min-w-0'>
          <p className='font-pixel text-[0.625rem] uppercase text-arcade-amber'>
            {language === 'es' ? 'Nuevo hallazgo' : 'New find'}
          </p>
          <p className='mt-3xs font-mono text-sm text-ink'>{copy.title}</p>
        </div>
      </PixelFrame>
    </div>
  )
}
