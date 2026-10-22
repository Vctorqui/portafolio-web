'use client'

import { useEffect } from 'react'
import { toggleSecretMode } from '../theme/fx'
import { isNightHour, unlockAchievement } from './achievements'
import { useKonami } from './useKonami'

/**
 * Finds that unlock from how the page is used rather than a click:
 * the Konami code, visiting at night, and opening the console.
 */
export function useAmbientFinds({ consoleOpen }: { consoleOpen: boolean }) {
  useKonami(() => {
    toggleSecretMode()
    unlockAchievement('konami')
  })

  useEffect(() => {
    if (isNightHour(new Date().getHours())) unlockAchievement('night-owl')
  }, [])

  useEffect(() => {
    if (consoleOpen) unlockAchievement('hacker')
  }, [consoleOpen])
}
