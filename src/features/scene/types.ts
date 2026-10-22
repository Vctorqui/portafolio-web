import type { WeatherKind } from '../weather/weather'

export type SceneVariant = 'sky' | 'ground'

/** Scene colours resolved from the --scene-* tokens of the active theme. */
export type Palette = {
  page: string
  skyTop: string
  skyMid: string
  hill: string
  hillDark: string
  ground: string
  grass: string
  grassLight: string
  groundDark: string
  bush: string
  bushDark: string
  flowers: string[]
  rock: string
  tree: string
  treeShade: string
  trunk: string
  cloud: string
  cloudShade: string
  sun: string
  sunMid: string
  sunEdge: string
  sunGlow: string
  moon1: string
  moon2: string
  moon3: string
  moon4: string
  ink: string
}

export type Rgba = [number, number, number, number]

/** A pre-rendered sprite centred on (half, half). */
export type Sprite = { canvas: HTMLCanvasElement; half: number }

export type Tree = { x: number; top: number; base: number; half: number; scale: number }

/** Logical grid of a scene, in cells. */
export type Layout = {
  cols: number
  rows: number
  sun: { x: number; y: number; r: number }
  trees: Tree[]
}

/** The fine 2px grid that stars and precipitation are drawn on. */
export type FxGrid = { cols: number; rows: number }

/** What the shared runtime needs from each scene. */
export type SceneController = {
  /** Wrapper size changed (or first mount). */
  resize: () => void
  /** Theme/tokens changed: rebuild palette-dependent sprites. */
  refresh: () => void
  setWeather: (kind: WeatherKind) => void
  /** Advance by `dt` ms; `tick` is true on the 12fps world beat. Returns whether to redraw. */
  update: (now: number, dt: number, tick: boolean) => boolean
  draw: () => void
  dispose: () => void
}

export type SceneContext = {
  wrap: HTMLDivElement
  canvas: HTMLCanvasElement
  /** Footer only: fine-grid canvas for stars and precipitation. */
  overlay: HTMLCanvasElement | null
  reduceMotion: boolean
  isVisible: () => boolean
}
