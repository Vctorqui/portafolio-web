'use client'

import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { Language } from '../../types'
import { getCommandPaletteTriggerLabel } from '../../lib/commandPalette'

type FloatingCommandDockProps = {
  language: Language
  onOpenCommandPalette: () => void
}

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]'

export function FloatingCommandDock({
  language,
  onOpenCommandPalette,
}: FloatingCommandDockProps) {
  const [visible, setVisible] = useState(true)

  if (!visible) {
    return (
      <button
        type='button'
        onClick={() => setVisible(true)}
        className={`fixed bottom-md right-md z-50 inline-flex h-11 w-11 items-center justify-center border border-rule bg-paper text-ink-2 shadow-[var(--shadow-panel)] transition-colors duration-short ease-out hover:border-brand hover:text-brand ${focusRing}`}
        aria-label={
          language === 'es'
            ? 'Mostrar acceso rápido'
            : 'Show quick access'
        }
      >
        <Search className='h-4 w-4' strokeWidth={1.5} aria-hidden />
      </button>
    )
  }

  return (
    <div
      className='fixed bottom-md right-md z-50 flex items-center gap-2xs border border-rule bg-paper px-2xs py-2xs shadow-[var(--shadow-panel)] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2'
      aria-label={language === 'es' ? 'Acceso rápido' : 'Quick access'}
    >
      <button
        type='button'
        onClick={onOpenCommandPalette}
        className={`inline-flex min-h-10 items-center gap-2xs whitespace-nowrap border border-rule bg-paper-2 px-xs font-mono text-[0.75rem] tracking-wide text-ink-2 transition-colors duration-short ease-out hover:border-brand hover:text-brand ${focusRing}`}
        aria-label={
          language === 'es'
            ? 'Abrir paleta de comandos'
            : 'Open command palette'
        }
      >
        <Search className='h-4 w-4' strokeWidth={1.5} aria-hidden />
        {getCommandPaletteTriggerLabel('desktop')}
      </button>
      <button
        type='button'
        onClick={() => setVisible(false)}
        className={`inline-flex h-10 w-10 items-center justify-center border border-transparent text-ink-3 transition-colors duration-short ease-out hover:border-rule hover:text-ink ${focusRing}`}
        aria-label={
          language === 'es'
            ? 'Cerrar acceso rápido'
            : 'Close quick access'
        }
      >
        <X className='h-4 w-4' strokeWidth={1.5} aria-hidden />
      </button>
    </div>
  )
}
