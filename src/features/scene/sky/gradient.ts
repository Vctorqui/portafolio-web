import { mixStops } from '../shared/color'

/**
 * Sky gradient stops, top → bottom (0%, 38%, 68%, 100%), applied as CSS
 * variables on the wrapper (.scene-sky in globals.css). The wrapper's mask
 * fades the bottom into the page. Swaps go DAY ↔ DUSK ↔ NIGHT, so these
 * live here rather than in theme tokens.
 */
export const SKY_DAY = ['oklch(80% 0.075 240)', 'oklch(87% 0.05 225)', 'oklch(91% 0.045 55)', 'oklch(96% 0.012 80)']
export const SKY_DUSK = ['oklch(58% 0.045 262)', 'oklch(66% 0.06 15)', 'oklch(70% 0.12 45)', 'oklch(80% 0.1 70)']
const SKY_NIGHT = ['oklch(17% 0.045 275)', 'oklch(15.5% 0.04 275)', 'oklch(14.5% 0.036 275)', 'oklch(14% 0.035 275)']
/** Overcast greys the base sky towards these, by the weather's `tint`. */
const SKY_GREY_DAY = ['oklch(70% 0.018 250)', 'oklch(78% 0.014 250)', 'oklch(85% 0.012 240)', 'oklch(93% 0.008 85)']
const SKY_GREY_NIGHT = ['oklch(23% 0.02 270)', 'oklch(19.5% 0.022 272)', 'oklch(16% 0.028 275)', 'oklch(14% 0.035 275)']

/** Base sky for a theme, greyed by the weather's tint (0–1). */
export function skyStops(night: boolean, tint: number) {
  return mixStops(night ? SKY_NIGHT : SKY_DAY, night ? SKY_GREY_NIGHT : SKY_GREY_DAY, tint)
}

export function setSkyStops(el: HTMLElement, stops: string[]) {
  stops.forEach((color, i) => el.style.setProperty(`--sky-${i}`, color))
}
