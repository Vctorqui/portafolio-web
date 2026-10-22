import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSun,
  Moon,
  Snowflake,
  Sun,
  type LucideIcon,
} from 'lucide-react'
import { Language } from '../../types'
import { WeatherKind } from './weather'

export const weatherLabels: Record<Language, Record<WeatherKind, string>> = {
  es: {
    clear: 'Despejado',
    partly: 'Parcial nublado',
    overcast: 'Nublado',
    fog: 'Neblina',
    drizzle: 'Llovizna',
    rain: 'Lluvia',
    storm: 'Tormenta',
    snow: 'Nieve',
  },
  en: {
    clear: 'Clear',
    partly: 'Partly cloudy',
    overcast: 'Overcast',
    fog: 'Fog',
    drizzle: 'Drizzle',
    rain: 'Rain',
    storm: 'Storm',
    snow: 'Snow',
  },
}

export function weatherIcon(kind: WeatherKind, isDay: boolean): LucideIcon {
  switch (kind) {
    case 'partly':
      return isDay ? CloudSun : CloudMoon
    case 'overcast':
      return Cloud
    case 'fog':
      return CloudFog
    case 'drizzle':
      return CloudDrizzle
    case 'rain':
      return CloudRain
    case 'storm':
      return CloudLightning
    case 'snow':
      return Snowflake
    default:
      return isDay ? Sun : Moon
  }
}
