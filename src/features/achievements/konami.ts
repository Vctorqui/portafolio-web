export const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

function normalizeKey(key: string) {
  return key.length === 1 ? key.toLowerCase() : key
}

/** Returns the new progress index; `KONAMI_SEQUENCE.length` means complete. */
export function advanceKonami(index: number, key: string) {
  const pressed = normalizeKey(key)

  if (pressed === KONAMI_SEQUENCE[index]) {
    return index + 1
  }

  return pressed === KONAMI_SEQUENCE[0] ? 1 : 0
}
