import { Language } from '../../types'

export type AchievementId =
  | 'press-start'
  | 'explorer'
  | 'hacker'
  | 'two-palettes'
  | 'bilingual'
  | 'insert-coin'
  | 'open-line'
  | 'night-owl'
  | 'konami'
  | 'cloud'
  | 'birds'
  | 'completionist'

/** `hint` replaces `desc` while a hidden find is still locked. */
type AchievementCopy = { title: string; desc: string; hint?: string }

type AchievementDef = {
  hidden?: boolean
  es: AchievementCopy
  en: AchievementCopy
}

export const SECTION_IDS = [
  'index',
  'now',
  'work',
  'years',
  'setup',
  'colophon',
] as const

export const ACHIEVEMENT_STORAGE_KEY = 'portfolio-achievements'

export const achievementOrder: AchievementId[] = [
  'press-start',
  'explorer',
  'hacker',
  'two-palettes',
  'bilingual',
  'insert-coin',
  'open-line',
  'night-owl',
  'konami',
  'cloud',
  'birds',
  'completionist',
]

export const achievementDefs: Record<AchievementId, AchievementDef> = {
  'press-start': {
    es: { title: 'Presiona start', desc: 'Responde a la pregunta del sonido.' },
    en: { title: 'Press start', desc: 'Answer the sound prompt.' },
  },
  explorer: {
    es: { title: 'Explorador', desc: 'Recorre todas las secciones.' },
    en: { title: 'Explorer', desc: 'Scroll through every section.' },
  },
  hacker: {
    es: { title: 'Modo hacker', desc: 'Abre la consola con ⌘K.' },
    en: { title: 'Hacker mode', desc: 'Open the console with ⌘K.' },
  },
  'two-palettes': {
    es: { title: 'Dos paletas', desc: 'Cambia entre CRT y Game Boy.' },
    en: { title: 'Two palettes', desc: 'Switch between CRT and Game Boy.' },
  },
  bilingual: {
    es: { title: 'Bilingüe', desc: 'Cambia el idioma del sitio.' },
    en: { title: 'Bilingual', desc: 'Change the site language.' },
  },
  'insert-coin': {
    es: { title: 'Insert coin', desc: 'Abre un proyecto con JUGAR.' },
    en: { title: 'Insert coin', desc: 'Open a project with PLAY.' },
  },
  'open-line': {
    es: { title: 'Línea abierta', desc: 'Usa un enlace de contacto.' },
    en: { title: 'Open line', desc: 'Use a contact link.' },
  },
  'night-owl': {
    hidden: true,
    es: {
      title: 'Búho nocturno',
      desc: 'Visita el sitio entre las 00:00 y las 05:00.',
      hint: 'Vuelve cuando la ciudad duerma.',
    },
    en: {
      title: 'Night owl',
      desc: 'Visit the site between 00:00 and 05:00.',
      hint: 'Come back while the city sleeps.',
    },
  },
  konami: {
    hidden: true,
    es: {
      title: 'Código secreto',
      desc: '↑ ↑ ↓ ↓ ← → ← → B A',
      hint: 'Un código que todo gamer conoce. Usa el teclado.',
    },
    en: {
      title: 'Secret code',
      desc: '↑ ↑ ↓ ↓ ← → ← → B A',
      hint: 'A code every gamer knows. Use the keyboard.',
    },
  },
  cloud: {
    es: { title: 'Cielo despejado', desc: 'Arrastra una nube.' },
    en: { title: 'Clear skies', desc: 'Drag a cloud.' },
  },
  birds: {
    es: { title: 'Bandada', desc: 'Sacude el pino y espanta a los pájaros.' },
    en: { title: 'Flock', desc: 'Shake the pine and scare the birds.' },
  },
  completionist: {
    es: { title: '100%', desc: 'Desbloquea todos los demás logros.' },
    en: { title: '100%', desc: 'Unlock every other achievement.' },
  },
}

export function getAchievementCopy(id: AchievementId, language: Language) {
  return achievementDefs[id][language]
}

export function isNightHour(hour: number) {
  return hour >= 0 && hour < 5
}

export function hasVisitedAll(
  visited: readonly string[],
  required: readonly string[] = SECTION_IDS
) {
  const seen = new Set(visited)
  return required.every((id) => seen.has(id))
}

export type UnlockedMap = Partial<Record<AchievementId, number>>

export type AchievementState = {
  unlocked: UnlockedMap
  visited: string[]
  /** Newly unlocked ids waiting to be shown as a toast, oldest first. */
  queue: AchievementId[]
}

const EMPTY_STATE: AchievementState = { unlocked: {}, visited: [], queue: [] }

function isAchievementId(value: string): value is AchievementId {
  return value in achievementDefs
}

export function allOthersUnlocked(unlocked: UnlockedMap) {
  return achievementOrder
    .filter((id) => id !== 'completionist')
    .every((id) => Boolean(unlocked[id]))
}

export function parseStoredAchievements(raw: string | null): {
  unlocked: UnlockedMap
  visited: string[]
} {
  if (!raw) {
    return { unlocked: {}, visited: [] }
  }

  try {
    const parsed = JSON.parse(raw) as {
      unlocked?: Record<string, unknown>
      visited?: unknown
    }
    const unlocked: UnlockedMap = {}

    for (const [key, value] of Object.entries(parsed.unlocked ?? {})) {
      if (isAchievementId(key) && typeof value === 'number') {
        unlocked[key] = value
      }
    }

    const visited = Array.isArray(parsed.visited)
      ? parsed.visited.filter(
          (id): id is string =>
            typeof id === 'string' &&
            (SECTION_IDS as readonly string[]).includes(id)
        )
      : []

    return { unlocked, visited }
  } catch {
    return { unlocked: {}, visited: [] }
  }
}

let state: AchievementState = EMPTY_STATE
let hydrated = false
const listeners = new Set<() => void>()

function emit(next: AchievementState) {
  state = next
  listeners.forEach((listener) => listener())
}

function persist() {
  try {
    window.localStorage.setItem(
      ACHIEVEMENT_STORAGE_KEY,
      JSON.stringify({ unlocked: state.unlocked, visited: state.visited })
    )
  } catch {
    // Storage can be blocked; achievements still work for this visit.
  }
}

export function hydrateAchievements() {
  if (hydrated || typeof window === 'undefined') {
    return
  }

  hydrated = true

  try {
    const stored = parseStoredAchievements(
      window.localStorage.getItem(ACHIEVEMENT_STORAGE_KEY)
    )
    emit({ ...state, ...stored })
  } catch {
    // Ignore unreadable storage.
  }
}

export function unlockAchievement(id: AchievementId) {
  hydrateAchievements()

  if (state.unlocked[id]) {
    return
  }

  const unlocked = { ...state.unlocked, [id]: Date.now() }
  emit({ ...state, unlocked, queue: [...state.queue, id] })
  persist()

  if (id !== 'completionist' && allOthersUnlocked(unlocked)) {
    unlockAchievement('completionist')
  }
}

export function markSectionVisited(sectionId: string) {
  hydrateAchievements()

  if (
    !(SECTION_IDS as readonly string[]).includes(sectionId) ||
    state.visited.includes(sectionId)
  ) {
    return
  }

  const visited = [...state.visited, sectionId]
  emit({ ...state, visited })
  persist()

  if (hasVisitedAll(visited)) {
    unlockAchievement('explorer')
  }
}

/** Clears every find so the visitor can hunt them again. */
export function resetAchievements() {
  emit(EMPTY_STATE)
  persist()
}

export function dismissAchievementToast() {
  emit({ ...state, queue: state.queue.slice(1) })
}

export function subscribeAchievements(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function getAchievementSnapshot() {
  return state
}

export function getServerAchievementSnapshot() {
  return EMPTY_STATE
}
