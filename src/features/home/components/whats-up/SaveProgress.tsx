import { Language } from '../../../../types'

/** Each block is 5%, so the bar reads like a save file's completion meter. */
const BLOCKS = 20

const label = { es: 'Progreso', en: 'Progress' }

/** Segmented pixel progress bar; the next empty block blinks like a loading cursor. */
export function SaveProgress({ value, language }: { value: number; language: Language }) {
  const percent = Math.max(0, Math.min(100, Math.round(value)))
  const filled = Math.round((percent / 100) * BLOCKS)

  return (
    <div className='flex items-center gap-xs'>
      <span className='font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-3'>{label[language]}</span>
      <div
        role='progressbar'
        aria-label={`${label[language]}: ${percent}%`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className='flex flex-1 gap-[2px]'
      >
        {Array.from({ length: BLOCKS }, (_, i) => (
          <span
            key={i}
            className={`h-2 flex-1 ${
              i < filled ? 'bg-ink' : i === filled ? 'pixel-blink bg-ink-3' : 'bg-rule opacity-50'
            }`}
          />
        ))}
      </div>
      <span className='w-8 text-right font-mono text-xs tabular-nums text-ink-2'>{percent}%</span>
    </div>
  )
}
