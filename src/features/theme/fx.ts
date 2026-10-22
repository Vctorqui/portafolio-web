export type FxMode = 'on' | 'off'

export const FX_STORAGE_KEY = 'fx-mode'

/**
 * The CRT scanline layer is opt-in (⌘K → "Efecto CRT"): its 1px lines alias
 * into uneven bands on phones whose pixel ratio isn't a whole number.
 */
export function parseFxMode(value: string | null): FxMode {
  return value === 'on' ? 'on' : 'off'
}

export function readFxMode(): FxMode {
  try {
    return parseFxMode(window.localStorage.getItem(FX_STORAGE_KEY))
  } catch {
    return 'off'
  }
}

export function readAppliedFxMode(): FxMode {
  return document.documentElement.dataset.fx === 'on' ? 'on' : 'off'
}

export function applyFxMode(mode: FxMode) {
  const root = document.documentElement

  if (mode === 'on') {
    root.dataset.fx = 'on'
  } else {
    delete root.dataset.fx
  }

  try {
    window.localStorage.setItem(FX_STORAGE_KEY, mode)
  } catch {
    // Storage can be blocked; the mode is already applied.
  }
}

export const fxBootstrapScript = `(function(){try{if(window.localStorage.getItem('${FX_STORAGE_KEY}')==='on'){document.documentElement.dataset.fx='on';}}catch(e){}})();`

/** Konami easter egg: swaps the accent colour. Not persisted on purpose. */
export function toggleSecretMode(): boolean {
  const root = document.documentElement
  const next = root.dataset.secret !== 'on'

  if (next) {
    root.dataset.secret = 'on'
  } else {
    delete root.dataset.secret
  }

  return next
}
