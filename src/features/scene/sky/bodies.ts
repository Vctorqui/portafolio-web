import { makeCanvas } from '../shared/canvas'
import { BAYER } from '../shared/dither'
import type { Layout, Palette, Sprite } from '../types'

/** Craters in moon-radius units: centre x, centre y, radius. */
const CRATERS: Array<[number, number, number]> = [
  [-0.28, -0.55, 0.17],
  [0.12, -0.22, 0.2],
  [-0.52, 0.08, 0.13],
  [-0.08, 0.48, 0.26],
  [0.38, 0.3, 0.12],
  [0.42, -0.5, 0.1],
]

/** Light comes from the upper left and slightly in front. */
const LIGHT = (() => {
  const v = [-0.5, -0.55, 0.68]
  const n = Math.hypot(...v)
  return v.map((c) => c / n)
})()

/** Sprite canvas centred on (half, half); `half` is even to keep the dot grid aligned. */
function bodyCanvas(glow: number) {
  const half = (Math.ceil(glow) + 2) & ~1
  return { canvas: makeCanvas(half * 2 + 1, half * 2 + 1), half }
}

/**
 * Full moon: Lambert shading quantised to four greys with ordered dithering,
 * craters one shade darker with a lit rim on the far side, and a halftone halo.
 */
export function renderMoon(p: Palette, r: number): Sprite {
  const glow = r * 2
  const { canvas, half } = bodyCanvas(glow)
  const ctx = canvas.getContext('2d')!
  const shades = [p.moon4, p.moon3, p.moon2, p.moon1]

  for (let y = -half; y <= half; y++) {
    for (let x = -half; x <= half; x++) {
      const dist = Math.hypot(x, y)
      const gx = half + x
      const gy = half + y

      if (dist > r) {
        if (dist > glow || gx & 1 || gy & 1) continue
        const falloff = 1 - (dist - r) / (glow - r)
        if (falloff * 9 > BAYER[(gy >> 1) & 3][(gx >> 1) & 3]) {
          ctx.globalAlpha = 0.3 + falloff * 0.25
          ctx.fillStyle = p.moon2
          ctx.fillRect(gx, gy, 1, 1)
        }
        continue
      }

      const nx = x / r
      const ny = y / r
      const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny))
      let v = Math.max(0, nx * LIGHT[0] + ny * LIGHT[1] + nz * LIGHT[2]) * 3.4 - 0.1

      for (const [kx, ky, kr] of CRATERS) {
        const dx = nx - kx
        const dy = ny - ky
        const k = Math.hypot(dx, dy) / kr
        if (k > 1) continue
        v -= 1.1
        // Rim catches the light on the side facing away from it.
        if (k > 0.7 && dx + dy > 0) v += 1.4
      }

      const level = Math.max(0, Math.min(3, Math.floor(v + BAYER[gy & 3][gx & 3] / 16 - 0.5)))
      ctx.globalAlpha = 1
      ctx.fillStyle = shades[level]
      ctx.fillRect(gx, gy, 1, 1)
    }
  }
  return { canvas, half }
}

/**
 * Daytime sun: a near-white core that warms to cream and a pale yellow rim
 * (dithered between the three), tiny flares at the four points, and a wide
 * golden halftone halo.
 */
export function renderSun(p: Palette, moonR: number): Sprite {
  const r = Math.round(moonR * 0.85)
  const glow = r * 2.1
  const { canvas, half } = bodyCanvas(glow)
  const ctx = canvas.getContext('2d')!
  const rings = [p.sun, p.sunMid, p.sunEdge]

  for (let y = -half; y <= half; y++) {
    for (let x = -half; x <= half; x++) {
      const dist = Math.hypot(x, y)
      const gx = half + x
      const gy = half + y
      if (dist <= r) {
        // 0 at the centre → 2 at the rim, dithered between neighbouring rings.
        const t = (dist / r) ** 1.6 * 2.4
        const ring = Math.min(2, Math.floor(t + BAYER[gy & 3][gx & 3] / 16 - 0.3))
        ctx.globalAlpha = 1
        ctx.fillStyle = rings[Math.max(0, ring)]
        ctx.fillRect(gx, gy, 1, 1)
        continue
      }
      // Little flares poking out top, bottom, left and right.
      if (dist <= r + 2 && (Math.abs(x) <= 0.5 || Math.abs(y) <= 0.5)) {
        ctx.globalAlpha = 1
        ctx.fillStyle = p.sunEdge
        ctx.fillRect(gx, gy, 1, 1)
        continue
      }
      if (dist > glow || gx & 1 || gy & 1) continue
      const falloff = 1 - (dist - r) / (glow - r)
      if (falloff * 11 + 1 > BAYER[(gy >> 1) & 3][(gx >> 1) & 3]) {
        ctx.globalAlpha = 0.55 + falloff * 0.45
        ctx.fillStyle = p.sunGlow
        ctx.fillRect(gx, gy, 1, 1)
      }
    }
  }
  return { canvas, half }
}

export function sunHit(l: Layout, x: number, y: number) {
  return (x - l.sun.x) ** 2 + (y - l.sun.y) ** 2 <= (l.sun.r + 3) ** 2
}
