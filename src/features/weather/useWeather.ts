'use client'

import { useEffect, useSyncExternalStore } from 'react'
import {
  getServerWeatherState,
  getWeatherState,
  startWeather,
  subscribeWeather,
} from './weatherStore'

export function useWeather() {
  useEffect(() => {
    startWeather()
  }, [])

  return useSyncExternalStore(subscribeWeather, getWeatherState, getServerWeatherState)
}
