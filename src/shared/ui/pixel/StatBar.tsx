type StatBarProps = {
  label: string
  value: number
  max?: number
  cells?: number
  tone?: 'accent' | 'amber' | 'magenta' | 'cyan'
}

const toneClass = {
  accent: 'bg-brand',
  amber: 'bg-arcade-amber',
  magenta: 'bg-arcade-magenta',
  cyan: 'bg-arcade-cyan',
}

/** Segmented HP/XP-style bar. Exposes a progressbar role for assistive tech. */
export function StatBar({
  label,
  value,
  max = 100,
  cells = 10,
  tone = 'accent',
}: StatBarProps) {
  const filled = Math.round((Math.min(value, max) / max) * cells)

  return (
    <div className='flex items-center gap-xs'>
      <span className='w-10 shrink-0 font-pixel text-[0.625rem] uppercase text-ink-2'>
        {label}
      </span>
      <div
        role='progressbar'
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        className='flex flex-1 gap-[3px] border-2 border-rule bg-paper p-[3px]'
      >
        {Array.from({ length: cells }, (_, i) => (
          <span
            key={i}
            className={`h-3 flex-1 ${i < filled ? toneClass[tone] : 'bg-paper-3'}`}
          />
        ))}
      </div>
      <span className='w-10 shrink-0 text-right font-mono text-xs tabular-nums text-ink-2'>
        {value}
      </span>
    </div>
  )
}
