import type { FxGrid, Palette } from '../types'
import { RAIN_DAY, RAIN_NIGHT, SNOW_DAY, WeatherFx } from './weatherFx'

type Drop = { x: number; y: number; vy: number; len: number; land: number }
type Flake = { x: number; y: number; vy: number; phase: number; size: number; land: number }
type Splash = { x: number; y: number; life: number }

/** Where precipitation stops: off the bottom of the sky, or on the ground. */
function landRow(g: FxGrid, groundTop: number | null) {
  return groundTop === null
    ? g.rows + 8
    : groundTop + Math.random() * Math.max(2, g.rows - groundTop - 2)
}

function makeDrops(g: FxGrid, perHundred: number, groundTop: number | null): Drop[] {
  const count = Math.round((g.cols / 100) * perHundred * (groundTop === null ? 1 : 0.7))
  return Array.from({ length: count }, () => ({
    x: Math.random() * g.cols * 1.25,
    y: Math.random() * g.rows,
    // Cross the band in roughly 0.7–1s whatever its height.
    vy: g.rows / (700 + Math.random() * 300),
    len: 4 + Math.floor(Math.random() * 4),
    land: landRow(g, groundTop),
  }))
}

function makeFlakes(g: FxGrid, perHundred: number, groundTop: number | null): Flake[] {
  const count = Math.round((g.cols / 100) * perHundred * (groundTop === null ? 1 : 0.7))
  return Array.from({ length: count }, () => ({
    x: Math.random() * g.cols,
    y: Math.random() * g.rows,
    vy: g.rows / (5000 + Math.random() * 4000),
    phase: Math.random() * Math.PI * 2,
    size: Math.random() < 0.3 ? 2 : 1,
    land: landRow(g, groundTop),
  }))
}

/**
 * Rain and snow on the fine 2px grid, moved by real elapsed time so they
 * stay smooth at 60fps. `groundTop` is the fine row where the footer's soil
 * starts (drops splash there), or null for the open sky.
 */
export function createPrecipitation() {
  let grid: FxGrid = { cols: 0, rows: 0 }
  let groundTop: number | null = null
  let drops: Drop[] = []
  let flakes: Flake[] = []
  let splashes: Splash[] = []

  return {
    configure(nextGrid: FxGrid, nextGroundTop: number | null, fx: WeatherFx) {
      grid = nextGrid
      groundTop = nextGroundTop
      drops = fx.rain ? makeDrops(grid, fx.rain, groundTop) : []
      flakes = fx.snow ? makeFlakes(grid, fx.snow, groundTop) : []
      splashes = []
    },

    get active() {
      return drops.length > 0 || flakes.length > 0
    },

    update(now: number, dt: number) {
      for (const d of drops) {
        d.y += d.vy * dt
        d.x -= d.vy * dt * 0.3
        if (d.y >= d.land) {
          if (groundTop !== null) splashes.push({ x: d.x, y: d.land, life: 140 })
          d.y = -d.len - Math.random() * 20
          d.x = Math.random() * grid.cols * 1.25
          d.land = landRow(grid, groundTop)
        }
      }
      splashes = splashes.filter((sp) => (sp.life -= dt) > 0)

      for (const f of flakes) {
        f.y += f.vy * dt
        f.x += Math.sin(now / 900 + f.phase) * 0.012 * dt
        if (f.y >= f.land) {
          f.y = -2
          f.x = Math.random() * grid.cols
          f.land = landRow(grid, groundTop)
        }
      }
    },

    paint(ctx: CanvasRenderingContext2D, p: Palette, night: boolean) {
      if (drops.length) {
        ctx.fillStyle = night ? RAIN_NIGHT : RAIN_DAY
        ctx.globalAlpha = 0.6
        for (const d of drops) {
          for (let i = 0; i < d.len; i++) {
            ctx.fillRect(Math.round(d.x + i * 0.3), Math.round(d.y - i), 1, 1)
          }
        }
        for (const sp of splashes) {
          ctx.fillRect(Math.round(sp.x) - 1, Math.round(sp.y) - 1, 1, 1)
          ctx.fillRect(Math.round(sp.x) + 1, Math.round(sp.y) - 1, 1, 1)
        }
        ctx.globalAlpha = 1
      }
      if (flakes.length) {
        ctx.fillStyle = night ? p.ink : SNOW_DAY
        ctx.globalAlpha = 0.85
        for (const f of flakes) ctx.fillRect(Math.round(f.x), Math.round(f.y), f.size, f.size)
        ctx.globalAlpha = 1
      }
    },
  }
}
