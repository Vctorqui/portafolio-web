import { makeCanvas } from '../shared/canvas'
import { BAYER } from '../shared/dither'
import type { Layout } from '../types'

/**
 * Fog banks: a halftone layer two widths wide whose noise repeats every
 * `cols`, so drawing it at a scrolling offset loops seamlessly.
 */
export function renderFog(l: Layout, color: string) {
  const canvas = makeCanvas(l.cols * 2, l.rows)
  const ctx = canvas.getContext('2d')!
  const k = (Math.PI * 2) / l.cols
  ctx.fillStyle = color
  for (let y = 0; y < l.rows; y += 2) {
    const band = Math.max(
      Math.exp(-(((y / l.rows - 0.3) / 0.12) ** 2)),
      Math.exp(-(((y / l.rows - 0.62) / 0.14) ** 2))
    )
    for (let x = 0; x < l.cols * 2; x += 2) {
      const n = 0.55 + 0.25 * Math.sin(x * k * 3 + y * 0.04) + 0.2 * Math.sin(x * k * 7 - y * 0.09)
      if (band * n * 22 > BAYER[(y >> 1) & 3][(x >> 1) & 3]) ctx.fillRect(x, y, 1, 1)
    }
  }
  return canvas
}

export function paintFog(
  ctx: CanvasRenderingContext2D,
  fog: HTMLCanvasElement,
  cols: number,
  night: boolean,
  still: boolean
) {
  const shift = still ? 0 : (performance.now() * 0.003) % cols
  ctx.globalAlpha = night ? 0.5 : 0.75
  ctx.drawImage(fog, -Math.round(shift) & ~1, 0)
  ctx.globalAlpha = 1
}
