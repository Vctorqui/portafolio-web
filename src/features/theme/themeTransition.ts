import {
  ThemeMode,
  applyThemeMode,
  getNextThemeMode,
  readAppliedThemeMode,
} from './theme'

/**
 * Theme changes go through here so the sky scene can play a sunset/sunrise.
 * The scene listens for SCENE_THEME_EVENT, calls preventDefault() and runs
 * `apply` once the sun (or moon) has set. With no listener (scene off-screen,
 * reduced motion) the swap happens right away.
 */
export const SCENE_THEME_EVENT = 'scene:theme'

export type SceneThemeDetail = { next: ThemeMode; apply: () => void }

/** Fallback cross-fade length; keep in sync with .theme-fading in globals.css. */
const FADE_MS = 900

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => unknown
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Swap the theme with a whole-page cross-fade. View Transitions snapshot the
 * old page and blend it into the new one natively; older browsers fall back to
 * colour transitions, enabled one frame *before* the swap so they kick in.
 */
function fadeToTheme(next: ThemeMode) {
  const doc = document as ViewTransitionDocument

  if (prefersReducedMotion()) {
    applyThemeMode(next)
    return
  }

  if (doc.startViewTransition) {
    doc.startViewTransition(() => applyThemeMode(next))
    return
  }

  const root = document.documentElement
  root.classList.add('theme-fading')
  window.requestAnimationFrame(() => {
    applyThemeMode(next)
    window.setTimeout(() => root.classList.remove('theme-fading'), FADE_MS + 100)
  })
}

export function changeThemeMode(next: ThemeMode) {
  const event = new CustomEvent<SceneThemeDetail>(SCENE_THEME_EVENT, {
    cancelable: true,
    detail: { next, apply: () => fadeToTheme(next) },
  })

  if (window.dispatchEvent(event)) {
    fadeToTheme(next)
  }
}

export function toggleThemeMode() {
  changeThemeMode(getNextThemeMode(readAppliedThemeMode()))
}
