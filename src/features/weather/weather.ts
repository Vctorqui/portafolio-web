export type WeatherLocation = {
  latitude: number
  longitude: number
  label: string
}

export type WeatherIconName = 'sun' | 'moon' | 'cloud' | 'rain' | 'snow' | 'fog'

/** What the sky scene should show; finer-grained than the icon. */
export type WeatherKind =
  | 'clear'
  | 'partly'
  | 'overcast'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'storm'
  | 'snow'

export const WEATHER_KINDS: WeatherKind[] = [
  'clear',
  'partly',
  'overcast',
  'fog',
  'drizzle',
  'rain',
  'storm',
  'snow',
]

export type WeatherSnapshot = {
  temperature: string
  location: string
  condition: string
  icon: WeatherIconName
  kind: WeatherKind
  isDay: boolean
}

type OpenMeteoCurrent = {
  temperature_2m: number
  is_day: 0 | 1
  precipitation: number
  weather_code: number
}

export type OpenMeteoResponse = {
  current: OpenMeteoCurrent
}

export const DEFAULT_WEATHER_LOCATION: WeatherLocation = {
  latitude: -33.4489,
  longitude: -70.6693,
  label: 'Santiago, CL',
}

export const DEFAULT_WEATHER_TIMEZONE = 'America/Santiago'

export const WEATHER_REFRESH_MS = 30 * 60 * 1000

export const WEATHER_API_CONFIG = {
  provider: 'open-meteo',
  apiKey: process.env.NEXT_PUBLIC_WEATHER_API_KEY ?? '',
}

export function buildOpenMeteoUrl(
  location: Pick<WeatherLocation, 'latitude' | 'longitude'>
) {
  const url = new URL('https://api.open-meteo.com/v1/forecast')

  url.searchParams.set('latitude', String(location.latitude))
  url.searchParams.set('longitude', String(location.longitude))
  url.searchParams.set(
    'current',
    'temperature_2m,is_day,precipitation,weather_code'
  )
  url.searchParams.set('temperature_unit', 'celsius')
  url.searchParams.set('timezone', DEFAULT_WEATHER_TIMEZONE)

  return url.toString()
}

function getCondition(code: number, isDay: boolean, precipitation: number) {
  if (
    precipitation > 0 ||
    (code >= 51 && code <= 67) ||
    (code >= 80 && code <= 82)
  ) {
    return { condition: 'Rain', icon: 'rain' as const }
  }

  if (code >= 71 && code <= 77) {
    return { condition: 'Snow', icon: 'snow' as const }
  }

  if (code === 45 || code === 48) {
    return { condition: 'Fog', icon: 'fog' as const }
  }

  if (code >= 1 && code <= 3) {
    return { condition: 'Clouds', icon: 'cloud' as const }
  }

  return {
    condition: isDay ? 'Clear' : 'Clear night',
    icon: isDay ? ('sun' as const) : ('moon' as const),
  }
}

/** Maps WMO weather codes (as used by Open-Meteo) to a scene weather kind. */
export function getWeatherKind(code: number, precipitation = 0): WeatherKind {
  if (code >= 95) return 'storm'
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return 'snow'
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return 'rain'
  if (code >= 51 && code <= 57) return 'drizzle'
  if (precipitation > 0) return 'drizzle'
  if (code === 45 || code === 48) return 'fog'
  if (code === 3) return 'overcast'
  if (code === 1 || code === 2) return 'partly'
  return 'clear'
}

export function normalizeWeatherResponse(
  data: OpenMeteoResponse,
  location: WeatherLocation
): WeatherSnapshot {
  const current = data.current
  const isDay = current.is_day === 1
  const condition = getCondition(
    current.weather_code,
    isDay,
    current.precipitation
  )

  return {
    temperature: `${Math.round(current.temperature_2m)}°C`,
    location: location.label,
    condition: condition.condition,
    icon: condition.icon,
    kind: getWeatherKind(current.weather_code, current.precipitation),
    isDay,
  }
}

export async function fetchWeatherSnapshot(
  location: WeatherLocation,
  signal?: AbortSignal
) {
  const response = await fetch(buildOpenMeteoUrl(location), { signal })

  if (!response.ok) {
    throw new Error('Weather request failed')
  }

  const data = (await response.json()) as OpenMeteoResponse
  return normalizeWeatherResponse(data, location)
}
