'use client'

import { useEffect, useState } from 'react'

/** A frame drawn as rows of characters: '#' is a filled pixel, anything else is empty. */
export type PixelFrameMap = readonly string[]

type PixelIconProps = {
  /** One map for a still icon, several to animate through them. */
  frames: readonly PixelFrameMap[]
  /** Milliseconds per frame. */
  frameMs?: number
  /** CSS px per pixel. */
  scale?: number
  className?: string
}

/**
 * Crisp pixel-art icon as inline SVG, filled with currentColor so it follows
 * the text colour and theme. Animated icons hold their first frame when the
 * visitor prefers reduced motion.
 */
export function PixelIcon({ frames, frameMs = 400, scale = 2, className = '' }: PixelIconProps) {
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    if (frames.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setFrame((f) => (f + 1) % frames.length), frameMs)
    return () => window.clearInterval(id)
  }, [frames.length, frameMs])

  const map = frames[frame]
  const cols = Math.max(...map.map((row) => row.length))

  return (
    <svg
      aria-hidden
      width={cols * scale}
      height={map.length * scale}
      viewBox={`0 0 ${cols} ${map.length}`}
      shapeRendering='crispEdges'
      className={`inline-block shrink-0 fill-current ${className}`}
    >
      {map.flatMap((row, y) =>
        [...row].map((cell, x) => (cell === '#' ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} /> : null))
      )}
    </svg>
  )
}
