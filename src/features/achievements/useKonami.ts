'use client'

import { useEffect, useRef } from 'react'
import { KONAMI_SEQUENCE, advanceKonami } from './konami'

function isTypingTarget(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
  )
}

export function useKonami(onComplete: () => void) {
  const callback = useRef(onComplete)

  useEffect(() => {
    callback.current = onComplete
  }, [onComplete])

  useEffect(() => {
    let progress = 0

    const onKeyDown = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target)) {
        return
      }

      progress = advanceKonami(progress, event.key)

      if (progress === KONAMI_SEQUENCE.length) {
        progress = 0
        callback.current()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])
}
