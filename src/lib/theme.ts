export type ThemeMode = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'theme-mode'

export const DEFAULT_THEME_MODE: ThemeMode = 'light'

export function parseThemeMode(value: string | null): ThemeMode | null {
  return value === 'light' || value === 'dark' ? value : null
}

export function resolveThemeMode(storedValue: string | null): ThemeMode {
  return parseThemeMode(storedValue) ?? DEFAULT_THEME_MODE
}

export function getNextThemeMode(current: ThemeMode): ThemeMode {
  return current === 'dark' ? 'light' : 'dark'
}

export function readStoredThemeMode(): ThemeMode {
  try {
    return resolveThemeMode(window.localStorage.getItem(THEME_STORAGE_KEY))
  } catch {
    return DEFAULT_THEME_MODE
  }
}

export function readAppliedThemeMode(): ThemeMode {
  return parseThemeMode(document.documentElement.dataset.theme ?? null) ??
    readStoredThemeMode()
}

export function applyThemeMode(mode: ThemeMode) {
  const root = document.documentElement
  root.classList.toggle('dark', mode === 'dark')
  root.dataset.theme = mode

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode)
  } catch {
    // El almacenamiento puede estar bloqueado; el tema ya quedó aplicado.
  }
}

export const themeBootstrapScript = `(function(){try{var s=window.localStorage.getItem('${THEME_STORAGE_KEY}');var m=s==='dark'||s==='light'?s:'${DEFAULT_THEME_MODE}';var r=document.documentElement;r.classList.toggle('dark',m==='dark');r.dataset.theme=m;}catch(e){}})();`
