import type { Transition, Variants } from 'motion/react'

/** expo.out — the skill's preset for reveals and staggers (400–700ms). */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

export const revealTransition: Transition = { duration: 0.7, ease: EASE_OUT_EXPO }

/** Trigger slightly before the element's bottom edge enters the viewport. */
export const inViewOnce = { once: true, margin: '0px 0px -12% 0px' } as const

export const staggerContainer = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: revealTransition },
}
