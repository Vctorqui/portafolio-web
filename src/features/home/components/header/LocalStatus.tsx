'use client'

import { Language } from '../../../../types'
import { useLocalTime, useWeather, weatherIcon, weatherLabels } from '../../../weather'

/** Local time and live weather in Santiago; the sky above mirrors it. */
export function LocalStatus({ language }: { language: Language }) {
  const time = useLocalTime(language)
  const { snapshot, kind } = useWeather()
  const Icon = weatherIcon(kind, snapshot?.isDay ?? true)

  return (
    <p
      className='mt-3xs flex flex-wrap items-center gap-x-xs gap-y-3xs font-mono text-xs text-ink-3'
      title={
        language === 'es'
          ? 'Hora y clima en Santiago. El cielo de arriba refleja el clima real.'
          : 'Time and weather in Santiago. The sky above mirrors the real weather.'
      }
    >
      <time className='tabular-nums text-ink-2'>{time || '--:--'}</time>
      <span aria-hidden>·</span>
      <span className='inline-flex items-center gap-3xs'>
        <Icon className='h-3.5 w-3.5' strokeWidth={1.75} aria-hidden />
        <span className='text-ink-2'>{snapshot?.temperature ?? '--°C'}</span>
        <span>{weatherLabels[language][kind]}</span>
      </span>
    </p>
  )
}
