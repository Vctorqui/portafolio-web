import { HORIZON } from '../config'
import { setPixel } from '../shared/canvas'
import { toRgba } from '../shared/color'
import { BAYER } from '../shared/dither'
import { mulberry32 } from '../shared/random'
import type { Layout, Palette } from '../types'

/**
 * Footer: hills, then a textured ground dressed with grass tufts, bushes,
 * flowers and pebbles, written straight into ImageData. The sky above the
 * hills stays transparent so the wrapper's smooth CSS gradient shows through.
 */
export function paintGroundBackdrop(ctx: CanvasRenderingContext2D, p: Palette, l: Layout) {
  const img = ctx.createImageData(l.cols, l.rows)
  const rand = mulberry32(l.cols * 13 + 7)
  const c = {
    hill: toRgba(p.hill),
    hillDark: toRgba(p.hillDark),
    ground: toRgba(p.ground),
    groundDark: toRgba(p.groundDark),
    grass: toRgba(p.grass),
    grassLight: toRgba(p.grassLight),
    bush: toRgba(p.bush),
    bushDark: toRgba(p.bushDark),
    rock: toRgba(p.rock),
    flowers: p.flowers.map(toRgba),
  }
  const top = HORIZON + 4
  // Keep the strip under the footer text calm so it stays readable.
  const calm = l.rows - 10
  const between = (a: number, b: number) => a + Math.floor(rand() * Math.max(1, b - a))
  const flower = () => c.flowers[Math.floor(rand() * c.flowers.length)]

  // Hills.
  for (let x = 0; x < l.cols; x++) {
    const back = Math.round(HORIZON - 6 - 5 * Math.sin(x / 23) - 3 * Math.sin(x / 9))
    for (let y = back; y < top; y++) {
      const shade = (y - back) * 2 > BAYER[y & 3][x & 3] + 4
      setPixel(img, x, y, shade ? c.hillDark : c.hill)
    }
  }

  // Ground: darker just under the horizon, then speckled soil.
  for (let y = top; y < l.rows; y++) {
    for (let x = 0; x < l.cols; x++) {
      const nearHorizon = (top + 4 - y) * 4 > BAYER[y & 3][x & 3]
      setPixel(img, x, y, nearHorizon || rand() < 0.05 ? c.groundDark : c.ground)
    }
  }

  // Grass edge along the horizon.
  for (let x = 0; x < l.cols; x++) {
    const h = 1 + Math.floor(rand() * (x % 5 === 0 ? 4 : 2))
    for (let k = 0; k < h; k++) {
      setPixel(img, x, top - 1 - k, k === h - 1 && h > 2 ? c.grassLight : c.grass)
    }
  }

  // Pebbles.
  for (let i = 0; i < Math.round(l.cols / 40); i++) {
    const x = between(2, l.cols - 4)
    const y = between(top + 3, calm)
    for (let dx = 0; dx < 3; dx++) setPixel(img, x + dx, y, c.rock)
    setPixel(img, x + 1, y - 1, c.rock)
    for (let dx = 0; dx < 3; dx++) setPixel(img, x + dx, y + 1, c.groundDark)
  }

  // Bushes: domes lit from the upper left, sometimes in bloom.
  for (let i = 0; i < Math.max(5, Math.round(l.cols / 26)); i++) {
    const cx = between(3, l.cols - 3)
    const base = between(top + 5, calm)
    const r = 3 + Math.floor(rand() * 3)
    for (let dy = -r; dy <= 0; dy++) {
      for (let dx = -r - 1; dx <= r + 1; dx++) {
        if (dx * dx * 0.8 + dy * dy * 1.6 > r * r) continue
        const lit = (-dx - dy) / r
        const tone = lit * 8 + 6 > BAYER[(base + dy) & 3][(cx + dx) & 3] ? c.bush : c.bushDark
        setPixel(img, cx + dx, base + dy, tone)
      }
    }
    for (let dx = -r; dx <= r; dx++) setPixel(img, cx + dx, base + 1, c.groundDark)
    if (rand() < 0.6) {
      const bloom = flower()
      for (let k = 0; k < 2 + Math.floor(rand() * 3); k++) {
        setPixel(img, cx + between(-r + 1, r), base - between(1, r), bloom)
      }
    }
  }

  // Grass tufts: a few blades of different heights with lighter tips.
  for (let i = 0; i < Math.round(l.cols / 6); i++) {
    const x = between(1, l.cols - 2)
    const y = between(top + 2, calm)
    const blades = 2 + Math.floor(rand() * 3)
    for (let b = 0; b < blades; b++) {
      const bx = x + b - (blades >> 1)
      const h = 1 + Math.floor(rand() * 3)
      for (let k = 0; k < h; k++) {
        setPixel(img, bx, y - k, k === h - 1 && h > 1 ? c.grassLight : c.grass)
      }
    }
  }

  // Wild flowers: a stem and a coloured head.
  for (let i = 0; i < Math.round(l.cols / 9); i++) {
    const x = between(1, l.cols - 1)
    const y = between(top + 3, calm)
    setPixel(img, x, y, c.grass)
    setPixel(img, x, y - 1, flower())
  }

  ctx.putImageData(img, 0, 0)
}
