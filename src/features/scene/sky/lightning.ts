import { playThunder } from '../../weather/ambience'
import type { Layout } from '../types'

const BOLT = 'oklch(97% 0.03 95)'

/** A jagged lightning bolt from the top edge, as a list of cells. */
function makeBolt(l: Layout): Array<[number, number]> {
  const cells: Array<[number, number]> = []
  let x = Math.round(l.cols * (0.15 + Math.random() * 0.7))
  let y = 0
  const end = l.rows * (0.45 + Math.random() * 0.2)
  while (y < end) {
    const run = 3 + Math.floor(Math.random() * 5)
    const dx = Math.random() < 0.5 ? -1 : 1
    for (let i = 0; i < run; i++) {
      cells.push([x, y])
      y++
      if (i % 2 === 0) x += dx
    }
  }
  return cells
}

/** Storm strikes every 3.5–10s: a flash, a bolt and (if sound is on) thunder. */
export function createLightning() {
  let flash = 0
  let bolt: Array<[number, number]> = []
  let nextStrike = performance.now() + 2500

  return {
    get active() {
      return flash > 0
    },

    update(now: number, dt: number, storm: boolean, layout: Layout) {
      if (!storm) {
        flash = 0
        return
      }
      if (now >= nextStrike) {
        flash = 1
        bolt = makeBolt(layout)
        playThunder()
        nextStrike = now + 3500 + Math.random() * 6500
      }
      flash = Math.max(0, flash - dt / 380)
    },

    paint(ctx: CanvasRenderingContext2D, layout: Layout) {
      if (flash <= 0) return
      ctx.fillStyle = BOLT
      ctx.globalAlpha = flash * 0.28
      ctx.fillRect(0, 0, layout.cols, layout.rows)
      ctx.globalAlpha = Math.min(1, flash * 1.5)
      for (const [x, y] of bolt) ctx.fillRect(x, y, 1, 1)
      ctx.globalAlpha = 1
    },
  }
}
