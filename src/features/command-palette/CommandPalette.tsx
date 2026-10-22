'use client'

import {
  KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  ArrowDown,
  Download,
  Home,
  Monitor,
  ToggleLeft,
  Trophy,
} from 'lucide-react'
import {
  CommandAction,
  CommandActionId,
  defaultCommandActions,
  filterCommandActions,
  getNextCommandIndex,
  shouldRunCommandFromKeyboard,
} from './commandActions'
import {
  DEFAULT_THEME_MODE,
  getNextThemeMode,
  readAppliedThemeMode,
  ThemeMode,
} from '../theme/theme'
import { FxMode, applyFxMode, readAppliedFxMode } from '../theme/fx'
import { changeThemeMode } from '../theme/themeTransition'

type CommandPaletteProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onOpenAchievements?: () => void
}

const resumeHref = '/Victor_Quinones_Frontend_Resume.pdf'

const iconByAction: Record<CommandActionId, typeof Home> = {
  home: Home,
  projects: ArrowDown,
  history: ArrowDown,
  now: ArrowDown,
  contact: ArrowDown,
  'download-cv': Download,
  'toggle-theme': ToggleLeft,
  'toggle-fx': Monitor,
  achievements: Trophy,
}

function scrollToSection(hash: string) {
  const target = document.querySelector(hash)

  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.pushState(null, '', hash)
  }
}

function downloadResume() {
  const link = document.createElement('a')
  link.href = resumeHref
  link.download = 'Victor_Quinones_Frontend_Developer_CV.pdf'
  document.body.appendChild(link)
  link.click()
  link.remove()
}

export function CommandPalette({
  open,
  onOpenChange,
  onOpenAchievements,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [themeMode, setThemeMode] = useState<ThemeMode>(DEFAULT_THEME_MODE)
  const [fxMode, setFxMode] = useState<FxMode>('off')
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredActions = useMemo(
    () => filterCommandActions(defaultCommandActions, query),
    [query]
  )

  useEffect(() => {
    setThemeMode(readAppliedThemeMode())
    setFxMode(readAppliedFxMode())
  }, [])

  useEffect(() => {
    if (!open) {
      setQuery('')
      return
    }

    const id = window.requestAnimationFrame(() => inputRef.current?.focus())
    return () => window.cancelAnimationFrame(id)
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  const runAction = (action: CommandAction) => {
    if (action.id === 'home') {
      scrollToSection('#index')
    }

    if (action.id === 'projects') {
      scrollToSection('#work')
    }

    if (action.id === 'history') {
      scrollToSection('#years')
    }

    if (action.id === 'now') {
      scrollToSection('#now')
    }

    if (action.id === 'contact') {
      scrollToSection('#index')
    }

    if (action.id === 'download-cv') {
      downloadResume()
    }

    if (action.id === 'toggle-theme') {
      const nextTheme = getNextThemeMode(themeMode)
      changeThemeMode(nextTheme)
      setThemeMode(nextTheme)
    }

    if (action.id === 'toggle-fx') {
      const nextFx: FxMode = fxMode === 'on' ? 'off' : 'on'
      applyFxMode(nextFx)
      setFxMode(nextFx)
    }

    if (action.id === 'achievements') {
      onOpenAchievements?.()
    }

    onOpenChange(false)
  }

  const onPaletteKeyDown = (event: ReactKeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onOpenChange(false)
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((current) =>
        getNextCommandIndex(
          current,
          filteredActions.length,
          event.key === 'ArrowDown' ? 'down' : 'up'
        )
      )
    }

    if (
      shouldRunCommandFromKeyboard({
        key: event.key,
        query,
        inputMode:
          event.target instanceof HTMLInputElement
            ? event.target.type
            : undefined,
      })
    ) {
      event.preventDefault()
      const action = filteredActions[activeIndex]

      if (action) {
        runAction(action)
      }
    }
  }

  if (!open) {
    return null
  }

  const hintFor = (action: CommandAction) => {
    if (action.id === 'toggle-theme') {
      return themeMode === 'dark' ? 'Game Boy' : 'CRT'
    }

    if (action.id === 'toggle-fx') {
      return fxMode === 'on' ? 'ON' : 'OFF'
    }

    return action.hint
  }

  return (
    <div className='fixed inset-0 z-50 flex items-start justify-center px-md pt-[14vh]'>
      <button
        type='button'
        className='absolute inset-0 cursor-default bg-ink/20'
        aria-label='Cerrar paleta de comandos'
        onMouseDown={() => onOpenChange(false)}
      />
      <div
        role='dialog'
        aria-modal='true'
        aria-label='Command palette'
        className='pixel-frame pixel-frame--accent pixel-frame--raised relative w-full max-w-[34rem] bg-paper'
        onKeyDown={onPaletteKeyDown}
      >
        <div className='flex items-center gap-xs border-b-2 border-rule px-md py-sm'>
          <span aria-hidden className='font-pixel text-xs text-brand'>
            &gt;_
          </span>
          <input
            ref={inputRef}
            type='search'
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder='escribe un comando...'
            aria-label='Buscar comandos'
            aria-activedescendant={
              filteredActions[activeIndex]
                ? `command-${filteredActions[activeIndex].id}`
                : undefined
            }
            className='h-11 min-w-0 flex-1 bg-transparent font-mono text-sm text-ink outline-none placeholder:text-ink-3 [&::-webkit-search-cancel-button]:hidden'
          />
        </div>

        <ul className='m-0 max-h-[min(26rem,55vh)] list-none overflow-y-auto p-2xs'>
          {filteredActions.length > 0 ? (
            filteredActions.map((action, index) => {
              const Icon = iconByAction[action.id]
              const active = index === activeIndex

              return (
                <li key={action.id}>
                  <button
                    id={`command-${action.id}`}
                    type='button'
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => runAction(action)}
                    className={`grid w-full grid-cols-[1rem_1.5rem_1fr_auto] items-center gap-xs px-sm py-xs text-left font-mono text-sm transition-colors duration-short ease-out ${
                      active
                        ? 'bg-brand text-brand-ink'
                        : 'text-ink-2 hover:bg-paper-2'
                    }`}
                  >
                    <span aria-hidden className='font-pixel text-[0.625rem]'>
                      {active ? '▶' : ''}
                    </span>
                    <Icon className='h-4 w-4' strokeWidth={1.5} aria-hidden />
                    <span>{action.label}</span>
                    <span
                      className={`text-[0.6875rem] ${active ? 'text-brand-ink' : 'text-ink-3'}`}
                    >
                      {hintFor(action)}
                    </span>
                  </button>
                </li>
              )
            })
          ) : (
            <li className='px-sm py-md font-mono text-sm text-ink-3'>
              Sin resultados
            </li>
          )}
        </ul>

        <p className='m-0 hidden border-t-2 border-rule px-md py-xs font-mono text-[0.6875rem] text-ink-3 sm:block'>
          ↑↓ mover · ↵ ejecutar · esc cerrar
        </p>
      </div>
    </div>
  )
}
