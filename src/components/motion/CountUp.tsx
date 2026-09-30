import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { EASE_OUT_EXPO } from '../../lib/motion'

type CountUpProps = {
  to: number
  suffix?: string
  duration?: number
  delay?: number
  className?: string
}

/** Counts from 0 to `to` the first time it becomes visible. */
export function CountUp({ to, suffix = '', duration = 1.6, delay = 0, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!inView || !node) return

    if (reduceMotion) {
      node.textContent = `${to}${suffix}`
      return
    }

    const controls = animate(0, to, {
      duration,
      delay,
      ease: EASE_OUT_EXPO,
      onUpdate: (value) => {
        node.textContent = `${Math.round(value)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, reduceMotion, to, suffix, duration, delay])

  return (
    <span className={className}>
      <span className="sr-only">{`${to}${suffix}`}</span>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {`0${suffix}`}
      </span>
    </span>
  )
}
