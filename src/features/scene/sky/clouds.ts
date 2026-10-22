import { CLOUD_PAD_X, CLOUD_PAD_Y } from '../config'
import { makeCanvas } from '../shared/canvas'
import { BAYER } from '../shared/dither'
import { mulberry32 } from '../shared/random'
import type { Layout, Palette } from '../types'

type Blob = { dx: number; dy: number; r: number }

export type Cloud = {
  x: number
  y: number
  w: number
  h: number
  blobs: Blob[]
  speed: number
  sprite?: HTMLCanvasElement
}

export function makeClouds(l: Layout, amount = 1): Cloud[] {
  const rand = mulberry32(l.cols * 7 + 3 + Math.round(amount * 10))
  const count = Math.max(3, Math.round((l.cols / 150) * amount))
  // Heavy weather: bigger clouds spread lower down the sky.
  const grow = amount > 2 ? 1.25 : 1
  const spread = amount > 2 ? 0.6 : 0.45
  return Array.from({ length: count }, (_, i) => {
    const w = Math.round((80 + rand() * 60) * grow)
    const h = Math.round((42 + rand() * 20) * grow)
    // A tall central dome flanked by two lower ones, all sharing a flat base.
    const lean = (rand() - 0.5) * 0.16
    const blobs = [
      { dx: Math.round(w * (0.5 + lean)), dy: Math.round(h * 0.8), r: Math.round(h * 0.78) },
      { dx: Math.round(w * 0.2), dy: Math.round(h * 0.86), r: Math.round(h * (0.42 + rand() * 0.14)) },
      { dx: Math.round(w * 0.8), dy: Math.round(h * 0.86), r: Math.round(h * (0.38 + rand() * 0.16)) },
    ]
    return {
      x: Math.round(((i + rand() * 0.6) / count) * l.cols),
      // Scattered through the upper sky; the top ones can be cut off by the edge.
      y: Math.round(-h * 0.3 + rand() * l.rows * spread),
      w,
      h,
      blobs,
      speed: 0.12 + rand() * 0.12,
    }
  })
}

/** 0 outside the cloud, rising towards 1 at the heart of its puffs. */
export function cloudDensity(c: Cloud, x: number, y: number) {
  // Flat base: clouds read as domes sitting on an invisible line.
  if (y > c.y + c.h * 0.82) return 0
  let d = 0
  for (const b of c.blobs) {
    const dist = Math.hypot(x - (c.x + b.dx), y - (c.y + b.dy))
    d = Math.max(d, 1 - dist / b.r)
  }
  return d
}

/** Clouds are a dot grid whose density follows the blob field, like halftone. */
export function renderCloud(p: Palette, c: Cloud, night: boolean) {
  const canvas = makeCanvas(c.w + CLOUD_PAD_X * 2 + 2, c.h + CLOUD_PAD_Y * 2 + 2)
  const ctx = canvas.getContext('2d')!
  // Local copy positioned inside the sprite's padding.
  const local = { ...c, x: CLOUD_PAD_X, y: CLOUD_PAD_Y }
  // The lower part of each cloud picks up the shade colour.
  const shadeFrom = local.y + c.h * 0.62
  // Night clouds are airy dots; day clouds fill the grid so they read white.
  const size = night ? 1 : 2
  ctx.globalAlpha = night ? 0.85 : 1

  for (let y = 0; y < canvas.height; y += 2) {
    ctx.fillStyle = y > shadeFrom ? p.cloudShade : p.cloud
    for (let x = 0; x < canvas.width; x += 2) {
      const d = cloudDensity(local, x, y)
      if (d <= 0) continue
      const threshold = BAYER[(y >> 1) & 3][(x >> 1) & 3]
      if (d * 34 > threshold) ctx.fillRect(x, y, size, size)
      // At night the core gets in-between dots (a checkerboard), so clouds
      // read denser while the edges keep the airy dot grid.
      if (night && d > 0.4 && d * 34 > threshold + 10) ctx.fillRect(x + 1, y + 1, 1, 1)
    }
  }
  return canvas
}

export function paintCloud(ctx: CanvasRenderingContext2D, c: Cloud) {
  if (!c.sprite) return
  ctx.drawImage(c.sprite, (Math.round(c.x) - CLOUD_PAD_X) & ~1, (Math.round(c.y) - CLOUD_PAD_Y) & ~1)
}
