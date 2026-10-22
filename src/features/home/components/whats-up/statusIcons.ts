import type { PixelFrameMap } from '../../../../shared/ui/pixel'

type Cell = [number, number]

/** Builds frames that reveal `cells` a few at a time, then hold the finished picture. */
function reveal(base: readonly string[], cells: Cell[], perFrame: number, hold: number, cursor = false) {
  const grid = base.map((row) => [...row])
  const frames: PixelFrameMap[] = []
  const draw = (count: number, withCursor: boolean) => {
    const g = grid.map((row) => [...row])
    cells.slice(0, count).forEach(([x, y]) => (g[y][x] = '#'))
    const next = cells[count]
    if (withCursor && next) g[next[1]][next[0]] = '#'
    return g.map((row) => row.join(''))
  }
  for (let n = 0; n <= cells.length; n += perFrame) frames.push(draw(n, cursor))
  for (let i = 0; i < hold; i++) frames.push(draw(cells.length, false))
  return frames
}

/** Cells of `#` in `rows`, offset by (dx, dy), read left to right, top to bottom. */
function cellsOf(rows: string[], dx: number, dy: number): Cell[] {
  return rows.flatMap((row, y) => [...row].flatMap((c, x) => (c === '#' ? [[x + dx, y + dy] as Cell] : [])))
}

/** Working: a laptop whose screen fills with code as it's typed, with a cursor. */
const LAPTOP = [
  '.#############.',
  '.#...........#.',
  '.#...........#.',
  '.#...........#.',
  '.#...........#.',
  '.#...........#.',
  '.#...........#.',
  '.#...........#.',
  '.#############.',
  '###############',
  '.#############.',
]
/** Code lines on every other row so they read as text, not a block. */
const CODE = ['##.####', '', '..###.##', '', '..####', '', '##.###']
export const LAPTOP_CODING = reveal(LAPTOP, cellsOf(CODE, 3, 1), 2, 5, true)

/** Building: a brick wall going up brick by brick, bottom course first. */
const COURSES = [
  [0, 4, 8],
  [2, 6, 10],
]
const WALL_W = 13
const WALL_H = 11
const EMPTY = Array.from({ length: WALL_H }, () => '.'.repeat(WALL_W))
/** Bricks are 3×2 with a 1px mortar gap; courses alternate like a running bond. */
const bricks: Cell[] = Array.from({ length: 4 }, (_, course) => course).flatMap((course) => {
  const top = WALL_H - 2 - course * 3
  return COURSES[course % 2].flatMap((x0) =>
    [0, 1, 2].flatMap((dx) => {
      const x = x0 + dx - (course % 2 ? 1 : 0)
      return x < 0 || x >= WALL_W ? [] : ([[x, top], [x, top + 1]] as Cell[])
    })
  )
})
export const WALL_BUILDING = reveal(EMPTY, bricks, 6, 5)

/** Playing: an arcade joystick. */
export const JOYSTICK: PixelFrameMap[] = [
  ['...####...', '...####...', '....##....', '....##....', '....##....', '..######..', '.########.', '##########'],
]
