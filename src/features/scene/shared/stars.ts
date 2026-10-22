import type { FxGrid, Palette } from '../types'
import { mulberry32 } from './random'

export type Star = { x: number; y: number; size: 1 | 2 | 3; alpha: number; twinkle: number }

export function makeStars(grid: FxGrid, maxY: number, density: number): Star[] {
  const rand = mulberry32(grid.cols * 31 + maxY)
  const count = Math.round((grid.cols * maxY) / density)
  const stars = Array.from({ length: count }, (): Star => {
    const roll = rand()
    return {
      x: Math.floor(rand() * grid.cols),
      // Bias towards the top so stars thin out where the sky meets the page.
      y: Math.floor(rand() ** 1.7 * maxY),
      size: roll > 0.97 ? 3 : roll > 0.85 ? 2 : 1,
      alpha: 0.25 + rand() * 0.75,
      twinkle: rand() < 0.3 ? rand() * Math.PI * 2 : -1,
    }
  })
  // Keep every twinkling star but only about half of the steady ones.
  return stars.filter((s) => s.twinkle >= 0 || rand() < 0.5)
}

export function paintStars(
  ctx: CanvasRenderingContext2D,
  p: Palette,
  stars: Star[],
  frame: number,
  fade = 1
) {
  ctx.fillStyle = p.ink
  for (const s of stars) {
    const flicker = s.twinkle < 0 ? 1 : 0.55 + 0.45 * Math.sin(frame * 0.35 + s.twinkle)
    ctx.globalAlpha = s.alpha * flicker * fade
    if (s.size === 3) {
      // A few brighter stars get a little cross.
      ctx.fillRect(s.x - 1, s.y, 3, 1)
      ctx.fillRect(s.x, s.y - 1, 1, 3)
    } else {
      ctx.fillRect(s.x, s.y, s.size, s.size)
    }
  }
  ctx.globalAlpha = 1
}
