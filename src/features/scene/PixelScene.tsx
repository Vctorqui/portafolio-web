'use client'

import { useEffect, useRef } from 'react'
import { runScene } from './engine/runScene'
import type { SceneVariant } from './types'

const bandClass: Record<SceneVariant, string> = {
  sky: 'scene-sky h-[300px] sm:h-[420px]',
  ground: 'scene-ground-sky h-[240px] sm:h-[320px]',
}

/**
 * Full-bleed dithered scene drawn cell by cell: the header sky or the footer
 * ground. Rendering lives in engine/ + sky/ + ground/; this only mounts it.
 */
export function PixelScene({ variant, className = '' }: { variant: SceneVariant; className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const overlayRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    return runScene(variant, { wrap, canvas, overlay: overlayRef.current })
  }, [variant])

  return (
    <div ref={wrapRef} aria-hidden className={`relative w-full overflow-hidden ${bandClass[variant]} ${className}`}>
      <canvas ref={canvasRef} className='block touch-pan-y select-none [image-rendering:pixelated]' />
      {variant === 'ground' && (
        <canvas
          ref={overlayRef}
          className='pointer-events-none absolute left-0 top-0 [image-rendering:pixelated]'
        />
      )}
    </div>
  )
}
