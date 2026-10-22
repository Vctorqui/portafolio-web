import { GROVE, HORIZON } from '../config'
import type { Layout, SceneVariant } from '../types'

/** Sky uses fine 2px cells; the ground keeps chunkier pixel-art cells. */
export function cellSize(variant: SceneVariant) {
  if (variant === 'sky') return 2
  return window.innerWidth < 640 ? 3 : 4
}

export function makeLayout(cols: number, rows: number, variant: SceneVariant): Layout {
  // `r` is the moon's radius; the daytime sun is drawn smaller (see sky/bodies).
  const sunR = variant === 'sky' ? Math.max(14, Math.min(28, Math.round(rows * 0.14))) : 7
  return {
    cols,
    rows,
    sun: { x: Math.round(cols * 0.5), y: Math.round(rows * 0.34), r: sunR },
    trees: GROVE.map(([f, scale]) => {
      // Smaller pines sit a little higher, as if further back.
      const base = HORIZON + 6 - Math.round((1 - scale) * 5)
      return {
        x: Math.round(cols * f),
        top: base - Math.round(42 * scale),
        base,
        half: Math.round(13 * scale),
        scale,
      }
    }).sort((a, b) => a.scale - b.scale),
  }
}

/** Sizes a canvas to `cols × rows` logical cells of `cell` CSS px. */
export function sizeCanvas(canvas: HTMLCanvasElement, cols: number, rows: number, cell: number) {
  canvas.width = cols
  canvas.height = rows
  canvas.style.width = `${cols * cell}px`
  canvas.style.height = `${rows * cell}px`
}
