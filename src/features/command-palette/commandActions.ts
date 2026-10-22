export type CommandActionId =
  | 'home'
  | 'projects'
  | 'history'
  | 'now'
  | 'contact'
  | 'download-cv'
  | 'toggle-theme'
  | 'toggle-fx'
  | 'achievements'

export type CommandAction = {
  id: CommandActionId
  label: string
  hint: string
  keywords: string[]
}

export const defaultCommandActions: CommandAction[] = [
  {
    id: 'home',
    label: 'Ir a Inicio',
    hint: '#index',
    keywords: ['inicio', 'home', 'index', 'indice'],
  },
  {
    id: 'projects',
    label: 'Ver Proyectos',
    hint: '#work',
    keywords: ['proyectos', 'projects', 'trabajo', 'work'],
  },
  {
    id: 'history',
    label: 'Ir a Historial',
    hint: '#years',
    keywords: ['historial', 'experiencia', 'history', 'years', 'etapas'],
  },
  {
    id: 'now',
    label: 'Ir a Ahora',
    hint: '#now',
    keywords: ['ahora', 'now', 'misiones', 'quest', 'clima'],
  },
  {
    id: 'contact',
    label: 'Ver Contacto',
    hint: '#index',
    keywords: ['contacto', 'contact', 'reach', 'email'],
  },
  {
    id: 'download-cv',
    label: 'Descargar CV',
    hint: 'PDF',
    keywords: ['cv', 'resume', 'pdf', 'descargar', 'download'],
  },
  {
    id: 'toggle-theme',
    label: 'Cambiar Tema (Claro/Oscuro)',
    hint: 'Theme',
    keywords: ['tema', 'theme', 'claro', 'oscuro', 'dark', 'light'],
  },
  {
    id: 'toggle-fx',
    label: 'Efecto CRT (scanlines)',
    hint: 'FX',
    keywords: ['scanlines', 'crt', 'efecto', 'fx', 'pantalla'],
  },
  {
    id: 'achievements',
    label: 'Abrir Hallazgos',
    hint: 'XP',
    keywords: ['logros', 'achievements', 'trofeos', 'xp'],
  },
]

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

export function filterCommandActions(
  actions: CommandAction[],
  query: string
): CommandAction[] {
  const normalizedQuery = normalize(query)

  if (!normalizedQuery) {
    return actions
  }

  return actions.filter((action) => {
    const haystack = normalize(
      [action.label, action.hint, ...action.keywords].join(' ')
    )

    return haystack.includes(normalizedQuery)
  })
}

export function getNextCommandIndex(
  currentIndex: number,
  total: number,
  direction: 'up' | 'down'
) {
  if (total <= 0) {
    return 0
  }

  const delta = direction === 'down' ? 1 : -1
  return (currentIndex + delta + total) % total
}

export function shouldRunCommandFromKeyboard({
  key,
  query,
  inputMode,
}: {
  key: string
  query: string
  inputMode?: string
}) {
  if (key !== 'Enter') {
    return false
  }

  return inputMode !== 'search' || query.trim().length > 0
}

export function getCommandPaletteTriggerLabel(mode: 'mobile' | 'desktop') {
  return mode === 'mobile' ? 'Comandos' : 'Press ⌘K'
}
