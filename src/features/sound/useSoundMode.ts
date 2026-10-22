'use client'

import { useSyncExternalStore } from 'react'
import { getServerSoundMode, getSoundMode, subscribeSound } from './sound'

/** Current sound mode; `null` until the visitor answers the sound prompt. */
export function useSoundMode() {
  return useSyncExternalStore(subscribeSound, getSoundMode, getServerSoundMode)
}
