'use client'

import { useEffect, useSyncExternalStore } from 'react'
import {
  getAchievementSnapshot,
  getServerAchievementSnapshot,
  hydrateAchievements,
  subscribeAchievements,
} from './achievements'

export function useAchievements() {
  useEffect(() => {
    hydrateAchievements()
  }, [])

  return useSyncExternalStore(
    subscribeAchievements,
    getAchievementSnapshot,
    getServerAchievementSnapshot
  )
}
