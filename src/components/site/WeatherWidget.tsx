'use client'

import { useEffect, useState } from 'react'
import {
  Cloud,
  CloudFog,
  CloudRain,
  Loader2,
  Moon,
  Snowflake,
  Sun,
} from 'lucide-react'
import {
  DEFAULT_WEATHER_LOCATION,
  WEATHER_REFRESH_MS,
  WeatherLocation,
  WeatherSnapshot,
  fetchWeatherSnapshot,
} from '../../lib/weather'

type WeatherStatus = 'idle' | 'loading' | 'ready' | 'error'

const iconByWeather = {
  sun: Sun,
  moon: Moon,
  cloud: Cloud,
  rain: CloudRain,
  snow: Snowflake,
  fog: CloudFog,
}

function getBrowserLocation(): Promise<WeatherLocation> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(DEFAULT_WEATHER_LOCATION)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: Number(position.coords.latitude.toFixed(4)),
          longitude: Number(position.coords.longitude.toFixed(4)),
          label: 'Tu ubicación',
        })
      },
      () => resolve(DEFAULT_WEATHER_LOCATION),
      {
        enableHighAccuracy: false,
        maximumAge: WEATHER_REFRESH_MS,
        timeout: 5000,
      }
    )
  })
}

export function WeatherWidget() {
  const [status, setStatus] = useState<WeatherStatus>('idle')
  const [weather, setWeather] = useState<WeatherSnapshot | null>(null)

  useEffect(() => {
    let mounted = true
    let location = DEFAULT_WEATHER_LOCATION
    const controller = new AbortController()

    const loadWeather = async (resolveLocation: boolean) => {
      try {
        setStatus((current) => (current === 'ready' ? current : 'loading'))

        if (resolveLocation) {
          location = await getBrowserLocation()
        }

        const nextWeather = await fetchWeatherSnapshot(
          location,
          controller.signal
        )

        if (mounted) {
          setWeather(nextWeather)
          setStatus('ready')
        }
      } catch {
        if (mounted) {
          setWeather((current) => current)
          setStatus((current) => (current === 'ready' ? current : 'error'))
        }
      }
    }

    loadWeather(true)
    const id = window.setInterval(() => loadWeather(false), WEATHER_REFRESH_MS)

    return () => {
      mounted = false
      controller.abort()
      window.clearInterval(id)
    }
  }, [])

  const Icon = weather ? iconByWeather[weather.icon] : Loader2

  return (
    <div
      className='inline-flex min-h-10 items-center gap-xs border border-rule bg-paper-2 px-xs py-2xs font-mono text-[0.6875rem] tracking-wide text-ink-3'
      aria-live='polite'
    >
      <div className='flex items-center gap-2xs text-ink-2'>
        <Icon
          className={`h-4 w-4 ${status === 'loading' ? 'animate-spin' : ''}`}
          strokeWidth={1.5}
          aria-hidden
        />
        <span className='text-[0.8125rem] text-ink'>
          {weather?.temperature ?? '--°C'}
        </span>
      </div>
      <span className='max-w-[var(--measure-weather)] truncate'>
        {weather?.location ?? DEFAULT_WEATHER_LOCATION.label}
      </span>
      {status === 'error' && <span>No disponible</span>}
    </div>
  )
}
