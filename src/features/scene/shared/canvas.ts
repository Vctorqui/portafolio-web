import type { Rgba } from '../types'

export function makeCanvas(w: number, h: number) {
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, w)
  canvas.height = Math.max(1, h)
  return canvas
}

/** Writes one pixel into ImageData, ignoring out-of-bounds coordinates. */
export function setPixel(img: ImageData, x: number, y: number, c: Rgba) {
  if (x < 0 || y < 0 || x >= img.width || y >= img.height) return
  const i = (y * img.width + x) * 4
  img.data[i] = c[0]
  img.data[i + 1] = c[1]
  img.data[i + 2] = c[2]
  img.data[i + 3] = c[3]
}

/** Pointer position in logical cells of a canvas laid out on `cols × rows`. */
export function toCells(event: PointerEvent, canvas: HTMLCanvasElement, cols: number, rows: number) {
  const rect = canvas.getBoundingClientRect()
  return {
    x: ((event.clientX - rect.left) / rect.width) * cols,
    y: ((event.clientY - rect.top) / rect.height) * rows,
  }
}

/** Pixel cursors defined in globals.css (--cursor-*). */
export function setCursor(canvas: HTMLCanvasElement, cursor: 'default' | 'pointer' | 'grab' | 'grabbing') {
  canvas.style.cursor = `var(--cursor-${cursor})`
}
