'use client'

import { useEffect, useState } from 'react'
import { Language } from '../../types'
import { DEFAULT_WEATHER_TIMEZONE } from './weather'

const timeOptions: Intl.DateTimeFormatOptions = {
  timeZone: DEFAULT_WEATHER_TIMEZONE,
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
}

const formatters: Record<Language, Intl.DateTimeFormat> = {
  es: new Intl.DateTimeFormat('es-CL', timeOptions),
  en: new Intl.DateTimeFormat('en-US', timeOptions),
}

/** HH:MM in the weather location's timezone (Santiago), refreshed every 15s. */
export function useLocalTime(language: Language) {
  const [time, setTime] = useState('')

  useEffect(() => {
    const format = formatters[language]
    const tick = () => setTime(format.format(new Date()))
    tick()
    const id = window.setInterval(tick, 15_000)
    return () => window.clearInterval(id)
  }, [language])

  return time
}
