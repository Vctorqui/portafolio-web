export type SoundMode = 'on' | 'off'

export const SOUND_STORAGE_KEY = 'sound-mode'

export type Blip = 'tap' | 'chirp' | 'whoosh' | 'find'

/** Square-wave notes as [frequency Hz, duration s]; tiny on purpose. */
const blips: Record<Blip, Array<[number, number]>> = {
  tap: [[660, 0.05]],
  chirp: [
    [1320, 0.04],
    [1760, 0.04],
    [1320, 0.05],
  ],
  whoosh: [
    [220, 0.06],
    [330, 0.06],
  ],
  find: [
    [523, 0.07],
    [659, 0.07],
    [784, 0.07],
    [1047, 0.12],
  ],
}

let mode: SoundMode | null = null
let ctx: AudioContext | null = null
const listeners = new Set<() => void>()

export function parseSoundMode(value: string | null): SoundMode | null {
  return value === 'on' || value === 'off' ? value : null
}

/** `null` means the visitor has not answered the sound prompt yet. */
export function getSoundMode(): SoundMode | null {
  if (mode === null && typeof window !== 'undefined') {
    try {
      mode = parseSoundMode(window.localStorage.getItem(SOUND_STORAGE_KEY))
    } catch {
      mode = null
    }
  }

  return mode
}

export function getServerSoundMode(): SoundMode | null {
  return null
}

export function setSoundMode(next: SoundMode) {
  mode = next

  try {
    window.localStorage.setItem(SOUND_STORAGE_KEY, next)
  } catch {
    // Storage can be blocked; the choice still holds for this visit.
  }

  listeners.forEach((listener) => listener())

  if (next === 'on') {
    playBlip('tap')
  }
}

export function subscribeSound(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/** Shared AudioContext (lazy); also used by lib/ambience for weather sounds. */
export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  try {
    ctx ??= new AudioContext()
    if (ctx.state === 'suspended') void ctx.resume()
    return ctx
  } catch {
    return null
  }
}

export function playBlip(kind: Blip) {
  if (getSoundMode() !== 'on' || typeof window === 'undefined') {
    return
  }

  try {
    ctx = getAudioContext()
    if (!ctx) return
    const start = ctx.currentTime
    let at = start

    for (const [freq, dur] of blips[kind]) {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'square'
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0.04, at)
      gain.gain.exponentialRampToValueAtTime(0.0001, at + dur)
      osc.connect(gain).connect(ctx.destination)
      osc.start(at)
      osc.stop(at + dur)
      at += dur
    }
  } catch {
    // Audio can be unavailable; sound is decoration only.
  }
}
