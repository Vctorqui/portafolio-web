import type { Palette } from '../types'

export function isNight() {
  return document.documentElement.classList.contains('dark')
}

/** Scene colours live in tokens.css (--scene-*), per theme. */
export function readPalette(): Palette {
  const css = getComputedStyle(document.documentElement)
  const v = (name: string) => css.getPropertyValue(name).trim()

  return {
    page: v('--color-paper'),
    skyTop: v('--scene-sky-top'),
    skyMid: v('--scene-sky-mid'),
    hill: v('--scene-hill'),
    hillDark: v('--scene-hill-dark'),
    // Same token as .scene-ground in globals.css so the footer text sits on it.
    ground: v('--scene-ground'),
    grass: v('--scene-grass'),
    grassLight: v('--scene-grass-light'),
    groundDark: v('--scene-ground-dark'),
    bush: v('--scene-bush'),
    bushDark: v('--scene-bush-dark'),
    flowers: [v('--scene-flower-1'), v('--scene-flower-2'), v('--scene-flower-3')],
    rock: v('--scene-rock'),
    tree: v('--scene-tree'),
    treeShade: v('--scene-tree-shade'),
    trunk: v('--scene-trunk'),
    cloud: v('--scene-cloud'),
    cloudShade: v('--scene-cloud-shade'),
    sun: v('--scene-sun'),
    sunMid: v('--scene-sun-mid'),
    sunEdge: v('--scene-sun-edge'),
    sunGlow: v('--scene-sun-glow'),
    moon1: v('--scene-moon-1'),
    moon2: v('--scene-moon-2'),
    moon3: v('--scene-moon-3'),
    moon4: v('--scene-moon-4'),
    ink: v('--color-ink'),
  }
}
