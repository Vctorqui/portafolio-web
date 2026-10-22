import { getAudioContext, getSoundMode, subscribeSound } from '../sound/sound'
import { WeatherKind } from './weather'

/**
 * Weather ambience, synthesised with Web Audio (no audio files): rain is
 * filtered noise, wind is band-passed noise swept by slow LFOs, birds and
 * crickets are short scheduled tones, thunder is a low noise burst.
 * Only plays while the visitor has sound on; beds cross-fade on change and
 * go quiet while the tab is hidden.
 */
type Bed = { stop: () => void }

const FADE_IN = 2.5
const FADE_OUT = 1.5

let desired: { kind: WeatherKind; night: boolean } | null = null
let current: { key: string; bed: Bed } | null = null
let master: GainNode | null = null
let noise: AudioBuffer | null = null
let initialised = false

function noiseBuffer(ctx: AudioContext) {
  if (noise) return noise
  noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate)
  const data = noise.getChannelData(0)
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
  return noise
}

function noiseSource(ctx: AudioContext) {
  const src = ctx.createBufferSource()
  src.buffer = noiseBuffer(ctx)
  src.loop = true
  // Start at a random point so stacked beds don't phase together.
  src.start(0, Math.random() * 2)
  return src
}

/** A gain that fades in now and can fade out; `done` runs after the fade. */
function fader(ctx: AudioContext, out: AudioNode, level: number) {
  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0, ctx.currentTime)
  gain.gain.linearRampToValueAtTime(level, ctx.currentTime + FADE_IN)
  gain.connect(out)
  return {
    gain,
    fadeOut(done: () => void) {
      const now = ctx.currentTime
      gain.gain.cancelScheduledValues(now)
      gain.gain.setValueAtTime(gain.gain.value, now)
      gain.gain.linearRampToValueAtTime(0, now + FADE_OUT)
      window.setTimeout(() => {
        done()
        gain.disconnect()
      }, FADE_OUT * 1000 + 100)
    },
  }
}

function filter(ctx: AudioContext, type: BiquadFilterType, frequency: number, q = 0.7) {
  const node = ctx.createBiquadFilter()
  node.type = type
  node.frequency.value = frequency
  node.Q.value = q
  return node
}

function rainBed(ctx: AudioContext, out: AudioNode, level: number): Bed {
  const src = noiseSource(ctx)
  const f = fader(ctx, out, level)
  src.connect(filter(ctx, 'highpass', 400)).connect(filter(ctx, 'lowpass', 2600)).connect(f.gain)
  // A brighter layer for the patter of drops.
  const patter = noiseSource(ctx)
  const patterGain = ctx.createGain()
  patterGain.gain.value = 0.35
  patter.connect(filter(ctx, 'highpass', 3500)).connect(patterGain).connect(f.gain)
  return { stop: () => f.fadeOut(() => (src.stop(), patter.stop())) }
}

function windBed(ctx: AudioContext, out: AudioNode, level: number): Bed {
  const src = noiseSource(ctx)
  const band = filter(ctx, 'bandpass', 380, 0.9)
  const f = fader(ctx, out, level)
  const swell = ctx.createGain()
  swell.gain.value = 1
  src.connect(band).connect(swell).connect(f.gain)

  // Slow LFOs: the pitch of the wind wanders and its strength swells.
  const pitch = ctx.createOscillator()
  const pitchDepth = ctx.createGain()
  pitch.frequency.value = 0.07
  pitchDepth.gain.value = 180
  pitch.connect(pitchDepth).connect(band.frequency)
  const gust = ctx.createOscillator()
  const gustDepth = ctx.createGain()
  gust.frequency.value = 0.11
  gustDepth.gain.value = 0.55
  gust.connect(gustDepth).connect(swell.gain)
  pitch.start()
  gust.start()

  return { stop: () => f.fadeOut(() => (src.stop(), pitch.stop(), gust.stop())) }
}

/** Calls `play` at random intervals until stopped. */
function scheduled(min: number, max: number, play: () => void): Bed {
  let timer = 0
  const loop = () => {
    play()
    timer = window.setTimeout(loop, min + Math.random() * (max - min))
  }
  timer = window.setTimeout(loop, 600 + Math.random() * min)
  return { stop: () => window.clearTimeout(timer) }
}

function tone(
  ctx: AudioContext,
  out: AudioNode,
  at: number,
  from: number,
  to: number,
  duration: number,
  peak: number
) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(from, at)
  osc.frequency.exponentialRampToValueAtTime(to, at + duration)
  gain.gain.setValueAtTime(0.0001, at)
  gain.gain.exponentialRampToValueAtTime(peak, at + duration * 0.25)
  gain.gain.exponentialRampToValueAtTime(0.0001, at + duration)
  osc.connect(gain).connect(out)
  osc.start(at)
  osc.stop(at + duration + 0.02)
}

function birdsBed(ctx: AudioContext, out: AudioNode): Bed {
  const f = fader(ctx, out, 1)
  const song = scheduled(1800, 5500, () => {
    const now = ctx.currentTime
    const base = 2600 + Math.random() * 1600
    const notes = 1 + Math.floor(Math.random() * 4)
    for (let i = 0; i < notes; i++) {
      const at = now + i * (0.09 + Math.random() * 0.05)
      const up = Math.random() < 0.5
      tone(ctx, f.gain, at, base * (up ? 0.85 : 1.15), base * (up ? 1.2 : 0.8), 0.07, 0.018)
    }
  })
  return { stop: () => (song.stop(), f.fadeOut(() => {})) }
}

function cricketsBed(ctx: AudioContext, out: AudioNode): Bed {
  const f = fader(ctx, out, 1)
  const chirp = (pitch: number) => () => {
    const now = ctx.currentTime
    for (let i = 0; i < 3; i++) tone(ctx, f.gain, now + i * 0.055, pitch, pitch * 1.02, 0.03, 0.006)
  }
  const a = scheduled(900, 1500, chirp(4300))
  const b = scheduled(1100, 1900, chirp(4750))
  return { stop: () => (a.stop(), b.stop(), f.fadeOut(() => {})) }
}

function combine(...beds: Bed[]): Bed {
  return { stop: () => beds.forEach((bed) => bed.stop()) }
}

function bedFor(kind: WeatherKind, night: boolean, ctx: AudioContext, out: AudioNode): Bed {
  const life = () => (night ? cricketsBed(ctx, out) : birdsBed(ctx, out))
  switch (kind) {
    case 'clear':
      return life()
    case 'partly':
      return combine(life(), windBed(ctx, out, 0.012))
    case 'overcast':
      return windBed(ctx, out, 0.028)
    case 'fog':
      return windBed(ctx, out, 0.016)
    case 'snow':
      return windBed(ctx, out, 0.014)
    case 'drizzle':
      return rainBed(ctx, out, 0.02)
    case 'rain':
      return rainBed(ctx, out, 0.045)
    case 'storm':
      return combine(rainBed(ctx, out, 0.07), windBed(ctx, out, 0.025))
  }
}

function apply() {
  const allowed =
    desired !== null && getSoundMode() === 'on' && typeof document !== 'undefined' && !document.hidden

  if (!allowed || !desired) {
    current?.bed.stop()
    current = null
    return
  }

  const key = `${desired.kind}:${desired.night}`
  if (current?.key === key) return

  const ctx = getAudioContext()
  if (!ctx) return
  if (!master) {
    master = ctx.createGain()
    master.connect(ctx.destination)
  }
  current?.bed.stop()
  current = { key, bed: bedFor(desired.kind, desired.night, ctx, master) }
}

/** Hooks the ambience up to the sound toggle and tab visibility (once). */
export function initAmbience() {
  if (initialised || typeof window === 'undefined') return
  initialised = true
  subscribeSound(apply)
  document.addEventListener('visibilitychange', apply)

  // Browsers keep audio suspended until a gesture: if sound was already on
  // from a previous visit, wake it on the first click or key press.
  const wake = () => {
    if (getSoundMode() === 'on') getAudioContext()
    window.removeEventListener('pointerdown', wake)
    window.removeEventListener('keydown', wake)
  }
  window.addEventListener('pointerdown', wake)
  window.addEventListener('keydown', wake)
}

export function setAmbience(kind: WeatherKind, night: boolean) {
  desired = { kind, night }
  apply()
}

/** A rolling rumble, a beat after the flash (light outruns sound). */
export function playThunder() {
  if (getSoundMode() !== 'on' || document.hidden) return
  const ctx = getAudioContext()
  if (!ctx || !master) return

  const at = ctx.currentTime + 0.3 + Math.random() * 0.7
  const src = noiseSource(ctx)
  const low = filter(ctx, 'lowpass', 420)
  low.frequency.setValueAtTime(420, at)
  low.frequency.exponentialRampToValueAtTime(55, at + 2.6)
  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0.0001, at)
  gain.gain.exponentialRampToValueAtTime(0.22, at + 0.08)
  gain.gain.exponentialRampToValueAtTime(0.0001, at + 3)
  src.connect(low).connect(gain).connect(master)
  src.stop(at + 3.1)
}
