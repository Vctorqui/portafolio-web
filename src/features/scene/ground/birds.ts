import { MAX_BIRDS } from '../config'
import { mulberry32 } from '../shared/random'
import type { Layout, Palette } from '../types'

export type Bird = {
  x: number
  y: number
  vx: number
  vy: number
  flying: boolean
  tree: number
  phase: number
}

/**
 * Bird sprites, 5×3 cells, centred on the body. Flying birds cycle
 * up → glide → down → glide so the whole shape flaps, not just the tips.
 */
const FLAP = [
  ['#...#', '.#.#.', '..#..'],
  ['.....', '##.##', '..#..'],
  ['.....', '..#..', '##.##'],
  ['.....', '##.##', '..#..'],
]
/** Perched: a little round body with a tail. */
const PERCHED = ['.....', '..##.', '.##..']

/** A few birds perched on one pine's branches. */
export function perchBirds(l: Layout, index: number): Bird[] {
  const t = l.trees[index]
  const rand = mulberry32(index * 97 + t.x)
  const count = 1 + Math.floor(rand() * 3)
  const height = t.base - t.top
  return Array.from({ length: count }, () => ({
    x: t.x + Math.round((rand() - 0.5) * t.half * 1.2),
    y: t.top + Math.round(height * (0.2 + rand() * 0.5)),
    vx: 0,
    vy: 0,
    flying: false,
    tree: index,
    phase: Math.floor(rand() * 4),
  }))
}

export function perchAll(l: Layout): Bird[] {
  return l.trees.flatMap((_, i) => perchBirds(l, i))
}

/** A bird bursting out of a pine: random side, upward, a bit of spread. */
function launch(bird: Bird): Bird {
  const side = Math.random() < 0.5 ? -1 : 1
  return {
    ...bird,
    flying: true,
    vx: side * (0.5 + Math.random() * 1.1),
    vy: -(0.45 + Math.random() * 0.75),
    phase: Math.floor(Math.random() * 4),
  }
}

/** Perched birds on `index` take off and a fresh flock bursts out of it. */
export function startle(birds: Bird[], l: Layout, index: number): Bird[] {
  const t = l.trees[index]
  const height = t.base - t.top
  const flock = Array.from({ length: 3 + Math.floor(Math.random() * 4) }, () =>
    launch({
      x: t.x + Math.round((Math.random() - 0.5) * t.half * 1.4),
      y: t.top + Math.round(height * (0.15 + Math.random() * 0.45)),
      vx: 0,
      vy: 0,
      flying: true,
      tree: index,
      phase: 0,
    })
  )
  return [...birds.map((b) => (!b.flying && b.tree === index ? launch(b) : b)), ...flock].slice(-MAX_BIRDS)
}

/** One 12fps step: flying birds climb away with a gentle bob. */
export function flyBirds(birds: Bird[], frame: number, cols: number): Bird[] {
  return birds
    .map((b) =>
      b.flying
        ? {
            ...b,
            x: b.x + b.vx,
            y: b.y + b.vy + Math.sin((frame + b.phase * 3) * 0.7) * 0.35,
            vy: b.vy - 0.015,
          }
        : b
    )
    .filter((b) => b.y > -4 && b.x > -4 && b.x < cols + 4)
}

export function paintBird(ctx: CanvasRenderingContext2D, p: Palette, b: Bird, frame: number) {
  const sprite = b.flying ? FLAP[(frame + b.phase) % FLAP.length] : PERCHED
  const x0 = Math.round(b.x) - 2
  const y0 = Math.round(b.y) - 1
  ctx.fillStyle = p.ink
  sprite.forEach((row, dy) => {
    for (let dx = 0; dx < row.length; dx++) {
      if (row[dx] === '#') ctx.fillRect(x0 + dx, y0 + dy, 1, 1)
    }
  })
}
