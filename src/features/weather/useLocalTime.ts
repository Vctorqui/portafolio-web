'use client'

import { useEffect, useState } from 'react'
import { Language } from '../../types'
import { DEFAULT_WEATHER_TIMEZONE } from './weather'

/** HH:MM in the weather location's timezone (Santiago), refreshed every 15s. */
export function useLocalTime(language: Language) {
  const [time, setTime] = useState('')

  useEffect(() => {
    const format = new Intl.DateTimeFormat(language === 'es' ? 'es-CL' : 'en-US', {
      timeZone: DEFAULT_WEATHER_TIMEZONE,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    const tick = () => setTime(format.format(new Date()))
    tick()
    const id = window.setInterval(tick, 15_000)
    return () => window.clearInterval(id)
  }, [language])

  return time
}
