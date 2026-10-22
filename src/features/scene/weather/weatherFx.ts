import type { WeatherKind } from '../../weather/weather'

/**
 * How each weather dresses the scenes: cloud multiplier, sky grey `tint`
 * (0–1), rain/snow density (particles per 100 columns) and extras.
 */
export type WeatherFx = {
  clouds: number
  tint: number
  rain: number
  snow: number
  fog: boolean
  storm: boolean
}

export const WEATHER_FX: Record<WeatherKind, WeatherFx> = {
  clear: { clouds: 1, tint: 0, rain: 0, snow: 0, fog: false, storm: false },
  partly: { clouds: 1.7, tint: 0.15, rain: 0, snow: 0, fog: false, storm: false },
  overcast: { clouds: 3, tint: 0.6, rain: 0, snow: 0, fog: false, storm: false },
  fog: { clouds: 1.4, tint: 0.55, rain: 0, snow: 0, fog: true, storm: false },
  drizzle: { clouds: 2.6, tint: 0.6, rain: 12, snow: 0, fog: false, storm: false },
  rain: { clouds: 3, tint: 0.7, rain: 30, snow: 0, fog: false, storm: false },
  storm: { clouds: 3.4, tint: 0.8, rain: 48, snow: 0, fog: false, storm: true },
  snow: { clouds: 2.4, tint: 0.45, rain: 0, snow: 14, fog: false, storm: false },
}

export const RAIN_DAY = 'oklch(52% 0.06 245)'
export const RAIN_NIGHT = 'oklch(72% 0.03 265)'
export const SNOW_DAY = 'oklch(99% 0.003 85)'
