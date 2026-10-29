/** Class recipes shared by the home sections. */
export const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]'

export const sectionTitleClass = 'font-body text-lg font-medium text-ink-3'

/** Mono uppercase pill used for header links/toggles and the work rail arrows. */
export const pillClass = `inline-flex min-h-8 items-center bg-paper-2 px-xs font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-2 no-underline transition-colors duration-short ease-out hover:bg-paper-3 hover:text-ink ${focusRing}`

/** Header contact links: larger and in full ink so they read before the site toggles. */
export const contactPillClass = `inline-flex min-h-9 items-center border-2 border-rule px-sm font-mono text-xs uppercase tracking-[0.12em] text-ink no-underline transition-colors duration-short ease-out hover:border-ink ${focusRing}`

/** The one filled pill: the main call to action (Email). */
export const primaryPillClass = `inline-flex min-h-9 items-center border-2 border-ink bg-ink px-sm font-mono text-xs uppercase tracking-[0.12em] text-paper no-underline transition-opacity duration-short ease-out hover:opacity-85 ${focusRing}`

/** Quiet icon-sized toggle for the fixed settings cluster. */
export const controlClass = `inline-flex h-8 min-w-8 items-center justify-center px-2xs font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-2 transition-colors duration-short ease-out hover:bg-paper-3 hover:text-ink ${focusRing}`
