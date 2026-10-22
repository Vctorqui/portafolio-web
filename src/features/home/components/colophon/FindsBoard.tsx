'use client'

import { Language } from '../../../../types'
import { achievementOrder, resetAchievements, useAchievements } from '../../../achievements'
import { playBlip } from '../../../sound'
import { focusRing } from '../../styles'
import { colophonCopy } from './colophonCopy'
import { FindItem } from './FindItem'

/** All finds with a found/total counter and a reset button. */
export function FindsBoard({ language }: { language: Language }) {
  const t = colophonCopy[language]
  const { unlocked } = useAchievements()
  const found = achievementOrder.filter((id) => unlocked[id]).length

  const reset = () => {
    resetAchievements()
    playBlip('whoosh')
  }

  return (
    <div className='mt-lg border-2 border-rule p-md'>
      <div className='flex flex-wrap items-baseline justify-between gap-sm'>
        <h3 className='font-mono text-xs uppercase tracking-[0.12em] text-ink'>
          {t.finds}{' '}
          <span className='text-ink-3 tabular-nums'>
            {found}/{achievementOrder.length}
          </span>
        </h3>
        <button
          type='button'
          onClick={reset}
          className={`font-mono text-xs text-ink-3 underline underline-offset-4 hover:text-brand ${focusRing}`}
        >
          {t.reset}
        </button>
      </div>
      <ul className='m-0 mt-sm grid list-none gap-x-md gap-y-3xs p-0 font-mono text-xs sm:grid-cols-2'>
        {achievementOrder.map((id) => (
          <FindItem key={id} id={id} done={Boolean(unlocked[id])} language={language} />
        ))}
      </ul>
    </div>
  )
}
