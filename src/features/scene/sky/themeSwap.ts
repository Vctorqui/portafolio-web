import { SWAP_HALF_MS } from '../config'
import { easeInOut, mixStops } from '../shared/color'
import { SKY_DUSK, setSkyStops } from './gradient'

/**
 * Sunset/sunrise played when the theme changes. Progress runs 0 → 2: the
 * body sinks (0 → 1), the theme is applied, then the new body rises (1 → 2),
 * while the sky stops glide old theme → dusk → new theme.
 */
export function createThemeSwap(wrap: HTMLElement, stopsFor: (night: boolean) => string[]) {
  let swap: { start: number; applied: boolean; apply: () => void; toNight: boolean } | null = null
  let progress = 0

  return {
    get active() {
      return swap !== null
    },

    /** 0 → 1 → 0: how far below the edge the sun/moon has sunk. */
    get sink() {
      return progress <= 1 ? easeInOut(progress) : 1 - easeInOut(progress - 1)
    },

    /** Stars fade out on the way to day and in on the way to night. */
    get starFade() {
      return swap ? Math.min(1, Math.abs(1 - progress)) : 1
    },

    start(apply: () => void, toNight: boolean) {
      if (swap) return
      swap = { start: performance.now(), applied: false, apply, toNight }
    },

    update(now: number) {
      if (!swap) return
      progress = Math.min(2, (now - swap.start) / SWAP_HALF_MS)
      if (progress >= 1 && !swap.applied) {
        swap.applied = true
        swap.apply()
      }

      const from = stopsFor(!swap.toNight)
      const to = stopsFor(swap.toNight)
      setSkyStops(
        wrap,
        progress <= 1
          ? mixStops(from, SKY_DUSK, easeInOut(progress))
          : mixStops(SKY_DUSK, to, easeInOut(progress - 1))
      )

      if (progress >= 2) {
        swap = null
        progress = 0
        setSkyStops(wrap, to)
      }
    },
  }
}
