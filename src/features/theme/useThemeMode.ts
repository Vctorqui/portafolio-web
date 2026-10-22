'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  DEFAULT_THEME_MODE,
  ThemeMode,
  readAppliedThemeMode,
} from './theme'
import { toggleThemeMode } from './themeTransition'
import { unlockAchievement } from '../achievements/achievements'

/** Tracks the applied theme, including changes made from the command palette. */
export function useThemeMode() {
  const [mode, setMode] = useState<ThemeMode>(DEFAULT_THEME_MODE)

  useEffect(() => {
    setMode(readAppliedThemeMode())

    const observer = new MutationObserver(() => {
      setMode(readAppliedThemeMode())
      unlockAchievement('two-palettes')
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => observer.disconnect()
  }, [])

  const toggle = useCallback(() => {
    toggleThemeMode()
  }, [])

  return { mode, toggle }
}
