'use client'

import { useEffect } from 'react'
import { initAmbience, setAmbience } from './ambience'
import { useThemeMode } from '../theme/useThemeMode'
import { useWeather } from './useWeather'

/** Plays the weather's ambience; night follows the theme, like the sky does. */
export function useAmbience() {
  const { kind } = useWeather()
  const { mode } = useThemeMode()

  useEffect(() => {
    initAmbience()
  }, [])

  useEffect(() => {
    setAmbience(kind, mode === 'dark')
  }, [kind, mode])
}
