import {
  DEFAULT_WEATHER_LOCATION,
  WEATHER_KINDS,
  WEATHER_REFRESH_MS,
  WeatherKind,
  WeatherSnapshot,
  fetchWeatherSnapshot,
} from './weather'

/**
 * Shared Santiago weather for the header readout and the sky scene, fetched
 * once and refreshed every 30 minutes. `?weather=rain` (or any WeatherKind)
 * forces the scene's weather, handy for previewing each effect.
 */
export type WeatherState = {
  status: 'idle' | 'loading' | 'ready' | 'error'
  snapshot: WeatherSnapshot | null
  kind: WeatherKind
}

const INITIAL: WeatherState = { status: 'idle', snapshot: null, kind: 'clear' }

let state = INITIAL
let started = false
const listeners = new Set<() => void>()

function emit(next: WeatherState) {
  state = next
  listeners.forEach((listener) => listener())
}

function readOverride(): WeatherKind | null {
  try {
    const value = new URLSearchParams(window.location.search).get('weather')
    return WEATHER_KINDS.find((kind) => kind === value) ?? null
  } catch {
    return null
  }
}

export function startWeather() {
  if (started || typeof window === 'undefined') return
  started = true

  const override = readOverride()
  if (override) emit({ ...state, kind: override })

  const load = async () => {
    if (state.status !== 'ready') emit({ ...state, status: 'loading' })
    try {
      const snapshot = await fetchWeatherSnapshot(DEFAULT_WEATHER_LOCATION)
      emit({ status: 'ready', snapshot, kind: override ?? snapshot.kind })
    } catch {
      if (state.status !== 'ready') emit({ ...state, status: 'error' })
    }
  }

  load()
  window.setInterval(load, WEATHER_REFRESH_MS)
}

export function subscribeWeather(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function getWeatherState() {
  return state
}

export function getServerWeatherState() {
  return INITIAL
}
