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
  Search,
  ToggleLeft,
} from 'lucide-react'
import {
  CommandAction,
  CommandActionId,
  defaultCommandActions,
  filterCommandActions,
  getNextCommandIndex,
} from '../../lib/commandPalette'

type ThemeMode = 'light' | 'dark'

type CommandPaletteProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const resumeHref = '/Victor_Quinones_Frontend_Resume.pdf'

const iconByAction: Record<CommandActionId, typeof Home> = {
  home: Home,
  projects: ArrowDown,
  contact: ArrowDown,
  'download-cv': Download,
  'toggle-theme': ToggleLeft,
}

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement
  root.classList.toggle('dark', mode === 'dark')
  root.dataset.theme = mode
  window.localStorage.setItem('theme-mode', mode)
}

function getStoredTheme(): ThemeMode {
  const stored = window.localStorage.getItem('theme-mode')

  if (stored === 'dark' || stored === 'light') {
    return stored
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
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
  link.download = 'Victor_Quinones_Frontend_Resume.pdf'
  document.body.appendChild(link)
  link.click()
  link.remove()
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [themeMode, setThemeMode] = useState<ThemeMode>('light')
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredActions = useMemo(
    () => filterCommandActions(defaultCommandActions, query),
    [query]
  )

  useEffect(() => {
    const initialTheme = getStoredTheme()
    setThemeMode(initialTheme)
    applyTheme(initialTheme)
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

    if (action.id === 'contact') {
      scrollToSection('#reach')
    }

    if (action.id === 'download-cv') {
      downloadResume()
    }

    if (action.id === 'toggle-theme') {
      setThemeMode((current) => {
        const next = current === 'dark' ? 'light' : 'dark'
        applyTheme(next)
        return next
      })
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

    if (event.key === 'Enter') {
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

  return (
    <div
      className='fixed inset-0 z-50 flex items-start justify-center bg-ink/10 px-md pt-[14vh] backdrop-blur-[2px]'
      onMouseDown={() => onOpenChange(false)}
    >
      <div
        role='dialog'
        aria-modal='true'
        aria-label='Command palette'
        className='w-full max-w-[34rem] border border-rule bg-paper shadow-[var(--shadow-modal)]'
        onKeyDown={onPaletteKeyDown}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className='flex items-center gap-xs border-b border-rule px-md py-sm'>
          <Search className='h-4 w-4 text-ink-3' strokeWidth={1.5} />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder='Buscar acciones...'
            aria-activedescendant={
              filteredActions[activeIndex]
                ? `command-${filteredActions[activeIndex].id}`
                : undefined
            }
            className='h-11 min-w-0 flex-1 bg-transparent font-mono text-sm text-ink outline-none placeholder:text-ink-3'
          />
        </div>

        <ul className='m-0 max-h-[18rem] list-none overflow-y-auto p-2xs'>
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
                    className={`grid w-full grid-cols-[1.75rem_1fr_auto] items-center gap-xs px-sm py-xs text-left font-mono text-sm transition-colors duration-short ease-out ${
                      active ? 'bg-paper-2 text-ink' : 'text-ink-2 hover:bg-paper-2'
                    }`}
                  >
                    <Icon className='h-4 w-4 text-ink-3' strokeWidth={1.5} />
                    <span>{action.label}</span>
                    <span className='text-[0.6875rem] text-ink-3'>
                      {action.id === 'toggle-theme'
                        ? themeMode === 'dark'
                          ? 'Claro'
                          : 'Oscuro'
                        : action.hint}
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
      </div>
    </div>
  )
}
