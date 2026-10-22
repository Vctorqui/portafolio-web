import { makeCanvas } from '../shared/canvas'
import { BAYER } from '../shared/dither'
import type { Layout, Palette, Tree } from '../types'

/** Three stacked tiers, each a stepped triangle dithered darker at the base. */
function paintTree(ctx: CanvasRenderingContext2D, p: Palette, t: Tree, offset: number) {
  const { x, top, base, half, scale } = t
  const height = base - top
  const trunkW = scale > 0.75 ? 3 : 2
  ctx.fillStyle = p.trunk
  ctx.fillRect(x - (trunkW >> 1), base - 6, trunkW, 8)
  const step = Math.round(10 * scale)
  const tH = Math.max(6, Math.round(16 * scale))
  const taper = Math.max(1, Math.round(3 * scale))
  for (let tier = 0; tier < 3; tier++) {
    const tTop = top + tier * step
    for (let row = 0; row < tH; row++) {
      const w = Math.round(((row + 2) / tH) * (half - (2 - tier) * taper))
      const sway = Math.round(offset * (1 - (tier * step + row) / height))
      for (let dx = -w; dx <= w; dx++) {
        const shade = (row / tH) * 19 > BAYER[(tTop + row) & 3][(x + dx) & 3] + 6
        ctx.fillStyle = shade ? p.treeShade : p.tree
        ctx.fillRect(x + dx + sway, tTop + row, 1, 1)
      }
    }
  }
}

/** Sprite origin, shifted by multiples of 4 so the dither matches the live tree. */
function origin(t: Tree) {
  return { x: (t.x - t.half - 4) & ~3, y: (t.top - 4) & ~3 }
}

/** Pines cached as sprites per sway offset (-1, 0, 1), so rain can run at 60fps. */
export function createTreeSprites() {
  const cache = new Map<string, HTMLCanvasElement>()

  const sprite = (p: Palette, t: Tree, index: number, offset: number) => {
    const key = `${index}:${offset}`
    const hit = cache.get(key)
    if (hit) return hit
    const o = origin(t)
    const canvas = makeCanvas(t.half * 2 + 12, t.base - t.top + 16)
    paintTree(canvas.getContext('2d')!, p, { ...t, x: t.x - o.x, top: t.top - o.y, base: t.base - o.y }, offset)
    cache.set(key, canvas)
    return canvas
  }

  return {
    clear: () => cache.clear(),
    paint(ctx: CanvasRenderingContext2D, p: Palette, l: Layout, shakes: number[]) {
      l.trees.forEach((t, i) => {
        const s = shakes[i] ?? 0
        const offset = s > 0 ? (s % 2 === 0 ? 1 : -1) : 0
        const o = origin(t)
        ctx.drawImage(sprite(p, t, i, offset), o.x, o.y)
      })
    },
  }
}

/** Front-most pine under the pointer, or -1. */
export function treeAt(l: Layout, x: number, y: number) {
  for (let i = l.trees.length - 1; i >= 0; i--) {
    const t = l.trees[i]
    if (Math.abs(x - t.x) <= t.half && y >= t.top && y <= t.base + 2) return i
  }
  return -1
}

/** The biggest pine (used by the colophon's "Try it" button). */
export function tallestTree(l: Layout) {
  return l.trees.reduce((best, t, i) => (t.scale > (l.trees[best]?.scale ?? 0) ? i : best), 0)
}
