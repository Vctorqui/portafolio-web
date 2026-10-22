import type { PixelFrameMap } from '../../../../shared/ui/pixel'

/** Beaten: a trophy. */
export const TROPHY: PixelFrameMap[] = [
  [
    '..#####..',
    '##.###.##',
    '#..###..#',
    '.#.###.#.',
    '..#####..',
    '...###...',
    '....#....',
    '..#####..',
  ],
]

/** Playing now: a gamepad whose face buttons get pressed one after another. */
const PAD = [
  '...........',
  '.#########.',
  '##.#####.##',
  '#...###.#.#',
  '##.#####.##',
  '####...####',
  '.##.....##.',
]
const press = (x: number, y: number): PixelFrameMap =>
  PAD.map((row, r) => (r === y ? row.slice(0, x) + '#' + row.slice(x + 1) : row))

export const GAMEPAD: PixelFrameMap[] = [PAD, press(8, 2), PAD, press(9, 3), PAD, press(7, 3), press(8, 4), PAD]

/** Waiting for: an hourglass with the sand running down. */
export const HOURGLASS: PixelFrameMap[] = [
  ['#######', '.#####.', '..###..', '...#...', '..#.#..', '.#...#.', '#######'],
  ['#######', '.##.##.', '..###..', '...#...', '..###..', '.#...#.', '#######'],
  ['#######', '.#...#.', '..###..', '...#...', '..###..', '.##.##.', '#######'],
  ['#######', '.#...#.', '..#.#..', '...#...', '..###..', '.#####.', '#######'],
]
