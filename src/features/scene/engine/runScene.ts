import { getWeatherState, startWeather, subscribeWeather } from '../../weather/weatherStore'
import { FRAME_MS } from '../config'
import { createGroundScene } from '../ground/createGroundScene'
import { createSkyScene } from '../sky/createSkyScene'
import type { SceneContext, SceneController, SceneVariant } from '../types'

type Mount = Pick<SceneContext, 'wrap' | 'canvas' | 'overlay'>

/**
 * Shared runtime for both scenes: the animation loop (world beat at 12fps,
 * smooth effects every frame), visibility, resize, theme changes and live
 * weather. The variant's controller owns what is drawn and how it reacts.
 * Returns a cleanup function.
 */
export function runScene(variant: SceneVariant, mount: Mount) {
  let visible = true
  let weather = getWeatherState().kind

  const context: SceneContext = {
    ...mount,
    reduceMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    isVisible: () => visible,
  }
  const scene: SceneController =
    variant === 'sky' ? createSkyScene(context, weather) : createGroundScene(context, weather)

  let raf = 0
  let lastTick = 0
  let prevNow = 0
  const step = (now: number) => {
    raf = window.requestAnimationFrame(step)
    const dt = Math.min(50, now - (prevNow || now))
    prevNow = now
    const tick = now - lastTick >= FRAME_MS
    if (tick) lastTick = now
    if (scene.update(now, dt, tick) && visible) scene.draw()
  }

  const refresh = () => {
    scene.refresh()
    scene.draw()
  }

  const themeObserver = new MutationObserver(refresh)
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class', 'data-theme', 'data-secret'],
  })

  const viewObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
  })
  viewObserver.observe(mount.canvas)

  const sizeObserver = new ResizeObserver(() => scene.resize())
  sizeObserver.observe(mount.wrap)

  const unsubscribeWeather = subscribeWeather(() => {
    const kind = getWeatherState().kind
    if (kind === weather) return
    weather = kind
    scene.setWeather(kind)
    scene.draw()
  })
  startWeather()

  window.addEventListener('load', refresh)
  scene.resize()
  raf = window.requestAnimationFrame(step)

  return () => {
    window.cancelAnimationFrame(raf)
    themeObserver.disconnect()
    viewObserver.disconnect()
    sizeObserver.disconnect()
    unsubscribeWeather()
    window.removeEventListener('load', refresh)
    scene.dispose()
  }
}
