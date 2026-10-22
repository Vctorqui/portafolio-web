'use client'

import { useEffect, useState } from 'react'

/** Open state for the command palette, toggled with ⌘K / Ctrl+K. */
export function useCommandPaletteShortcut() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((current) => !current)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return [open, setOpen] as const
}
