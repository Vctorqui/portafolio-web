import { unlockAchievement } from '../../achievements/achievements'
import { playBlip } from '../../sound/sound'
import { SCENE_THEME_EVENT, SceneThemeDetail, toggleThemeMode } from '../../theme/themeTransition'
import type { WeatherKind } from '../../weather/weather'
import { setCursor, toCells } from '../shared/canvas'
import { cellSize, makeLayout, sizeCanvas } from '../shared/layout'
import { isNight, readPalette } from '../shared/palette'
import { Star, makeStars, paintStars } from '../shared/stars'
import type { SceneContext, SceneController, Sprite } from '../types'
import { createPrecipitation } from '../weather/precipitation'
import { SNOW_DAY, WEATHER_FX } from '../weather/weatherFx'
import { renderMoon, renderSun, sunHit } from './bodies'
import { Cloud, cloudDensity, makeClouds, paintCloud, renderCloud } from './clouds'
import { paintFog, renderFog } from './fog'
import { setSkyStops, skyStops } from './gradient'
import { createLightning } from './lightning'
import { createThemeSwap } from './themeSwap'

/**
 * Header sky: twinkling stars, a sun/moon that toggles the theme (with a
 * sunset/sunrise), draggable clouds and the live weather (rain, storms,
 * snow, fog). The gradient behind it is CSS, driven through --sky-* vars.
 */
export function createSkyScene(sc: SceneContext, weather: WeatherKind): SceneController {
  const { wrap, canvas, reduceMotion } = sc
  const ctx = canvas.getContext('2d')!

  let layout = makeLayout(0, 0, 'sky')
  let palette = readPalette()
  let night = isNight()
  let fx = WEATHER_FX[weather]
  let stars: Star[] = []
  let clouds: Cloud[] = []
  let body: Sprite | null = null
  let fog: HTMLCanvasElement | null = null
  let drag: { cloud: Cloud; dx: number; dy: number } | null = null
  let frame = 0

  const precipitation = createPrecipitation()
  const lightning = createLightning()
  const swap = createThemeSwap(wrap, (forNight) => skyStops(forNight, fx.tint))

  const renderClouds = () => clouds.forEach((c) => (c.sprite = renderCloud(palette, c, night)))
  const renderFogLayer = () => {
    fog = fx.fog ? renderFog(layout, night ? palette.cloud : SNOW_DAY) : null
  }

  const refresh = () => {
    palette = readPalette()
    night = isNight()
    if (!layout.cols) return
    if (!swap.active) setSkyStops(wrap, skyStops(night, fx.tint))
    renderFogLayer()
    body = night ? renderMoon(palette, layout.sun.r) : renderSun(palette, layout.sun.r)
    renderClouds()
  }

  const drawBody = () => {
    if (!body) return
    const travel = layout.rows - layout.sun.y + layout.sun.r * 2.4
    const x = (layout.sun.x - body.half) & ~1
    const y = Math.round(layout.sun.y + swap.sink * travel - body.half) & ~1
    // Overcast skies veil the sun or moon.
    ctx.globalAlpha = 1 - fx.tint * 0.55
    ctx.drawImage(body.canvas, x, y)
    ctx.globalAlpha = 1
  }

  const draw = () => {
    ctx.clearRect(0, 0, layout.cols, layout.rows)
    if (night) {
      paintStars(ctx, palette, stars, reduceMotion ? 0 : frame, swap.starFade * (1 - fx.tint))
    }
    // By day the sun hides behind clouds; at night the moon sits in front.
    if (!night) drawBody()
    clouds.forEach((c) => paintCloud(ctx, c))
    if (night) drawBody()
    if (fog) paintFog(ctx, fog, layout.cols, night, reduceMotion)
    precipitation.paint(ctx, palette, night)
    lightning.paint(ctx, layout)
  }

  const resize = () => {
    const cell = cellSize('sky')
    const cols = Math.ceil(wrap.clientWidth / cell)
    const rows = Math.ceil(wrap.clientHeight / cell)
    if (cols === 0 || (cols === layout.cols && rows === layout.rows)) return

    const prevCols = layout.cols
    layout = makeLayout(cols, rows, 'sky')
    sizeCanvas(canvas, cols, rows, cell)
    stars = makeStars(layout, rows, 260)
    clouds =
      clouds.length === 0
        ? makeClouds(layout, fx.clouds)
        : clouds.map((c) => ({ ...c, x: (c.x / prevCols) * cols }))
    refresh()
    precipitation.configure(layout, null, fx)
    draw()
  }

  const setWeather = (kind: WeatherKind) => {
    fx = WEATHER_FX[kind]
    if (!layout.cols) return
    clouds = makeClouds(layout, fx.clouds)
    renderClouds()
    renderFogLayer()
    if (!swap.active) setSkyStops(wrap, skyStops(night, fx.tint))
    precipitation.configure(layout, null, fx)
  }

  const update = (now: number, dt: number, tick: boolean) => {
    let dirty = false

    // Theme swaps run every frame so the body glides.
    if (swap.active) {
      swap.update(now)
      dirty = true
    }

    const weatherActive = precipitation.active || fog !== null || lightning.active
    if (weatherActive && !reduceMotion && sc.isVisible()) {
      precipitation.update(now, dt)
      lightning.update(now, dt, fx.storm, layout)
      dirty = true
    }

    if (tick) {
      frame++
      // In dev the stylesheet can land after mount; retry until tokens resolve.
      if (!palette.page) refresh()
      if (!reduceMotion) {
        clouds.forEach((c) => {
          if (drag?.cloud === c) return
          c.x += c.speed
          if (c.x > layout.cols + 20) c.x = -c.w - 20
        })
      }
      dirty = true
    }

    return dirty
  }

  /* ── Interaction ── */

  const cloudAt = (x: number, y: number) => clouds.find((c) => cloudDensity(c, x, y) > 0.05)

  const onThemeRequest = (event: Event) => {
    const { apply } = (event as CustomEvent<SceneThemeDetail>).detail
    // Only the visible sky animates; otherwise the helper swaps instantly.
    if (reduceMotion || !sc.isVisible() || !layout.cols) return
    event.preventDefault()
    swap.start(apply, !night)
  }

  const onDown = (event: PointerEvent) => {
    const { x, y } = toCells(event, canvas, layout.cols, layout.rows)
    const cloud = cloudAt(x, y)

    if (sunHit(layout, x, y)) {
      toggleThemeMode()
      playBlip('tap')
    } else if (cloud) {
      drag = { cloud, dx: x - cloud.x, dy: y - cloud.y }
      canvas.setPointerCapture(event.pointerId)
      setCursor(canvas, 'grabbing')
      playBlip('whoosh')
    }
  }

  const onMove = (event: PointerEvent) => {
    const { x, y } = toCells(event, canvas, layout.cols, layout.rows)

    if (drag) {
      const c = drag.cloud
      c.x = Math.max(-c.w * 0.8, Math.min(layout.cols - c.w * 0.2, x - drag.dx))
      c.y = Math.max(-c.h * 0.6, Math.min(layout.rows - c.h, y - drag.dy))
      if (reduceMotion) draw()
      return
    }

    setCursor(canvas, sunHit(layout, x, y) ? 'pointer' : cloudAt(x, y) ? 'grab' : 'default')
  }

  const onUp = () => {
    if (drag) {
      unlockAchievement('cloud')
      setCursor(canvas, 'grab')
    }
    drag = null
  }

  window.addEventListener(SCENE_THEME_EVENT, onThemeRequest)
  canvas.addEventListener('pointerdown', onDown)
  canvas.addEventListener('pointermove', onMove)
  canvas.addEventListener('pointerup', onUp)
  canvas.addEventListener('pointercancel', onUp)

  return {
    resize,
    refresh,
    setWeather,
    update,
    draw,
    dispose() {
      window.removeEventListener(SCENE_THEME_EVENT, onThemeRequest)
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerup', onUp)
      canvas.removeEventListener('pointercancel', onUp)
    },
  }
}
