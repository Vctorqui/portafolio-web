import { unlockAchievement } from '../../achievements/achievements'
import { playBlip } from '../../sound/sound'
import type { WeatherKind } from '../../weather/weather'
import { HORIZON, SCENE_SHAKE_EVENT } from '../config'
import { setCursor, toCells } from '../shared/canvas'
import { cellSize, makeLayout, sizeCanvas } from '../shared/layout'
import { isNight, readPalette } from '../shared/palette'
import { Star, makeStars, paintStars } from '../shared/stars'
import type { FxGrid, SceneContext, SceneController } from '../types'
import { createPrecipitation } from '../weather/precipitation'
import { WEATHER_FX } from '../weather/weatherFx'
import { paintGroundBackdrop } from './backdrop'
import { Bird, flyBirds, paintBird, perchAll, perchBirds, startle } from './birds'
import { createTreeSprites, tallestTree, treeAt } from './trees'

/** Birds come back to a pine this long after it was last shaken. */
const PERCH_AGAIN_MS = 7000

/**
 * Footer: hills, vegetation and a grove of pines whose birds scatter when
 * clicked. Stars and precipitation go on a fine overlay canvas (2px cells,
 * like the header) on top of the chunkier ground cells.
 */
export function createGroundScene(sc: SceneContext, weather: WeatherKind): SceneController {
  const { wrap, canvas, reduceMotion } = sc
  const overlay = sc.overlay!
  const ctx = canvas.getContext('2d')!
  const fctx = overlay.getContext('2d')!
  const backdrop = document.createElement('canvas')
  const bctx = backdrop.getContext('2d')!

  let layout = makeLayout(0, 0, 'ground')
  let palette = readPalette()
  let night = isNight()
  let fx = WEATHER_FX[weather]
  let grid: FxGrid = { cols: 0, rows: 0 }
  let groundTop = 0
  let stars: Star[] = []
  let birds: Bird[] = []
  let shakes: number[] = []
  let shakenAt: number[] = []
  let frame = 0

  const trees = createTreeSprites()
  const precipitation = createPrecipitation()

  const refresh = () => {
    palette = readPalette()
    night = isNight()
    if (!layout.cols) return
    trees.clear()
    paintGroundBackdrop(bctx, palette, layout)
  }

  const draw = () => {
    ctx.clearRect(0, 0, layout.cols, layout.rows)
    ctx.drawImage(backdrop, 0, 0)
    fctx.clearRect(0, 0, grid.cols, grid.rows)
    if (night) paintStars(fctx, palette, stars, reduceMotion ? 0 : frame, 1 - fx.tint)
    trees.paint(ctx, palette, layout, shakes)
    birds.forEach((b) => paintBird(ctx, palette, b, frame))
    precipitation.paint(fctx, palette, night)
  }

  const resize = () => {
    const cell = cellSize('ground')
    const cols = Math.ceil(wrap.clientWidth / cell)
    const rows = Math.ceil(wrap.clientHeight / cell)
    if (cols === 0 || (cols === layout.cols && rows === layout.rows)) return

    layout = makeLayout(cols, rows, 'ground')
    sizeCanvas(canvas, cols, rows, cell)
    backdrop.width = cols
    backdrop.height = rows

    const ratio = cell / 2
    grid = { cols: Math.ceil(cols * ratio), rows: Math.ceil(rows * ratio) }
    groundTop = Math.round((HORIZON + 4) * ratio)
    sizeCanvas(overlay, grid.cols, grid.rows, 2)

    // Sparse single dots above the hills, on the same fine grid as the header.
    stars = makeStars(grid, Math.round((HORIZON - 14) * ratio), 900).map((s) => ({ ...s, size: 1 as const }))
    birds = perchAll(layout)
    shakes = layout.trees.map(() => 0)
    shakenAt = layout.trees.map(() => 0)

    refresh()
    precipitation.configure(grid, groundTop, fx)
    draw()
  }

  const setWeather = (kind: WeatherKind) => {
    fx = WEATHER_FX[kind]
    if (layout.cols) precipitation.configure(grid, groundTop, fx)
  }

  /** Every click: perched birds take off and a new flock bursts out. */
  const shakeTree = (index: number) => {
    if (!layout.trees[index]) return
    shakenAt[index] = performance.now()
    if (reduceMotion) {
      birds = birds.filter((b) => b.flying || b.tree !== index)
    } else {
      shakes[index] = 6
      birds = startle(birds, layout, index)
    }
    playBlip('chirp')
    unlockAchievement('birds')
    draw()
  }

  const update = (now: number, dt: number, tick: boolean) => {
    let dirty = false

    if (precipitation.active && !reduceMotion && sc.isVisible()) {
      precipitation.update(now, dt)
      dirty = true
    }

    if (tick) {
      frame++
      // In dev the stylesheet can land after mount; retry until tokens resolve.
      if (!palette.page) refresh()
      shakes = shakes.map((s) => Math.max(0, s - 1))
      birds = flyBirds(birds, frame, layout.cols)
      layout.trees.forEach((_, i) => {
        const perched = birds.some((b) => !b.flying && b.tree === i)
        if (!perched && shakenAt[i] && now - shakenAt[i] > PERCH_AGAIN_MS) {
          birds = [...birds, ...perchBirds(layout, i)]
          shakenAt[i] = 0
        }
      })
      dirty = true
    }

    return dirty
  }

  /* ── Interaction ── */

  const onDown = (event: PointerEvent) => {
    const { x, y } = toCells(event, canvas, layout.cols, layout.rows)
    const tree = treeAt(layout, x, y)
    if (tree >= 0) shakeTree(tree)
  }

  const onMove = (event: PointerEvent) => {
    const { x, y } = toCells(event, canvas, layout.cols, layout.rows)
    setCursor(canvas, treeAt(layout, x, y) >= 0 ? 'pointer' : 'default')
  }

  const onShakeRequest = () => shakeTree(tallestTree(layout))

  window.addEventListener(SCENE_SHAKE_EVENT, onShakeRequest)
  canvas.addEventListener('pointerdown', onDown)
  canvas.addEventListener('pointermove', onMove)

  return {
    resize,
    refresh,
    setWeather,
    update,
    draw,
    dispose() {
      window.removeEventListener(SCENE_SHAKE_EVENT, onShakeRequest)
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
    },
  }
}
