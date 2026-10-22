/** The world (clouds, birds, twinkles) advances at 12fps for a pixel-art feel. */
export const FRAME_MS = 1000 / 12
/** Each half of a theme swap: the body sets, then the new one rises. */
export const SWAP_HALF_MS = 1100
export const MAX_BIRDS = 90
/** Ground scene: where the sky meets the hills, in cells from the top. */
export const HORIZON = 44
/** Cloud sprites keep this margin around the cloud box (even, for the dot grid). */
export const CLOUD_PAD_X = 20
export const CLOUD_PAD_Y = 4

/** Grove layout as [viewport fraction, scale]; drawn back (small) to front (big). */
export const GROVE: Array<[number, number]> = [
  [0.07, 0.72],
  [0.15, 0.9],
  [0.24, 0.6],
  [0.62, 0.66],
  [0.71, 1],
  [0.8, 0.78],
  [0.92, 0.85],
]

export const SCENE_SHAKE_EVENT = 'scene:shake'
