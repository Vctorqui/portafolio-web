'use client'

import { useEffect } from 'react'

export function useGsapSectionReveal() {
  useEffect(() => {
    let cancelled = false
    let cleanup: (() => void) | undefined

    const run = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])

      if (cancelled) {
        return
      }

      gsap.registerPlugin(ScrollTrigger)

      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
      const sections = gsap.utils.toArray<HTMLElement>('.section-reveal')

      if (reduceMotion) {
        sections.forEach((section) => {
          gsap.set(section.querySelectorAll('[data-gsap], [data-gsap-letter]'), {
            autoAlpha: 1,
            y: 0,
            yPercent: 0,
          })
        })
        return
      }

      const accentCleanups: Array<() => void> = []

      const context = gsap.context(() => {
        gsap.utils
          .toArray<HTMLElement>('[data-gsap-accent]')
          .forEach((accent) => {
            const enter = () => {
              gsap.killTweensOf(accent)
              gsap
                .timeline()
                .to(accent, {
                  y: -4,
                  scale: 1.055,
                  skewX: -4,
                  color: 'var(--color-ink)',
                  boxShadow:
                    'inset 0 -0.58em 0 color-mix(in oklch, var(--color-accent) 26%, transparent)',
                  duration: 0.18,
                  ease: 'power3.out',
                })
                .to(accent, {
                  skewX: 0,
                  duration: 0.16,
                  ease: 'back.out(2)',
                })
            }

            const leave = () => {
              gsap.killTweensOf(accent)
              gsap.to(accent, {
                y: 0,
                scale: 1,
                skewX: 0,
                color: 'var(--color-accent)',
                boxShadow:
                  'inset 0 0 0 color-mix(in oklch, var(--color-accent) 0%, transparent)',
                duration: 0.28,
                ease: 'power3.out',
              })
            }

            accent.addEventListener('mouseenter', enter)
            accent.addEventListener('mouseleave', leave)
            accentCleanups.push(() => {
              accent.removeEventListener('mouseenter', enter)
              accent.removeEventListener('mouseleave', leave)
            })
          })

        sections.forEach((section) => {
          const copy = section.querySelector('[data-gsap="section-copy"]')
          const proof = section.querySelector('[data-gsap="section-proof"]')
          const letters = section.querySelectorAll('[data-gsap-letter]')
          const targets = [copy, proof].filter(Boolean)

          if (targets.length === 0) {
            return
          }

          gsap.set(targets, { autoAlpha: 0, y: 24 })
          gsap.set(letters, { yPercent: 110 })

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top 78%',
              once: true,
            },
          })

          if (copy) {
            timeline.to(copy, {
              autoAlpha: 1,
              y: 0,
              duration: 0.55,
              ease: 'power3.out',
            })
          }

          if (letters.length > 0) {
            timeline.to(
              letters,
              {
                yPercent: 0,
                duration: 0.7,
                ease: 'power4.out',
                stagger: 0.012,
              },
              copy ? '-=0.35' : 0
            )
          }

          if (proof) {
            timeline.to(
              proof,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.62,
                ease: 'power3.out',
              },
              copy ? '-=0.32' : undefined
            )
          }
        })
      })

      cleanup = () => {
        accentCleanups.forEach((clean) => clean())
        context.revert()
      }
    }

    run()

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [])
}
