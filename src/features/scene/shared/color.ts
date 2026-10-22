import type { Rgba } from '../types'

const cache = new Map<string, Rgba>()
let probe: CanvasRenderingContext2D | null = null

/** Resolves any CSS colour (oklch, lab…) by painting it on a 1×1 canvas. */
export function toRgba(color: string): Rgba {
  const hit = cache.get(color)
  if (hit) return hit

  if (!probe) {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 1
    probe = canvas.getContext('2d', { willReadFrequently: true })!
  }
  probe.clearRect(0, 0, 1, 1)
  probe.fillStyle = '#000'
  probe.fillStyle = color
  probe.fillRect(0, 0, 1, 1)
  const d = probe.getImageData(0, 0, 1, 1).data
  const rgba: Rgba = [d[0], d[1], d[2], d[3]]
  cache.set(color, rgba)
  return rgba
}

/** Blends two equal-length lists of colours; returns `rgb()` strings. */
export function mixStops(from: string[], to: string[], t: number) {
  return from.map((color, i) => {
    const a = toRgba(color)
    const b = toRgba(to[i])
    const c = [0, 1, 2].map((k) => Math.round(a[k] + (b[k] - a[k]) * t))
    return `rgb(${c[0]} ${c[1]} ${c[2]})`
  })
}

export const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2)
