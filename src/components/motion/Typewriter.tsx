import { useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

type TypewriterProps = {
  words: readonly string[]
  typeSpeed?: number
  backSpeed?: number
  holdDelay?: number
  className?: string
}

/**
 * Types and deletes each word in a loop (same timings the old Typed.js setup
 * used: 100 / 50 / 2000 ms). Pauses while offscreen; with reduced motion it
 * shows every word statically.
 */
export function Typewriter({
  words,
  typeSpeed = 100,
  backSpeed = 50,
  holdDelay = 2000,
  className,
}: TypewriterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref)
  const reduceMotion = useReducedMotion()
  const [wordIndex, setWordIndex] = useState(0)
  const [length, setLength] = useState(0)
  const [deleting, setDeleting] = useState(false)

  const word = words[wordIndex % words.length]

  useEffect(() => {
    if (reduceMotion || !inView) return

    let delay = deleting ? backSpeed : typeSpeed
    let next = () => setLength((current) => current + (deleting ? -1 : 1))

    if (!deleting && length === word.length) {
      delay = holdDelay
      next = () => setDeleting(true)
    } else if (deleting && length === 0) {
      next = () => {
        setDeleting(false)
        setWordIndex((current) => current + 1)
      }
    }

    const timeout = window.setTimeout(next, delay)
    return () => window.clearTimeout(timeout)
  }, [length, deleting, word, inView, reduceMotion, typeSpeed, backSpeed, holdDelay])

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{words.join(', ')}</span>
      <span aria-hidden="true">
        {reduceMotion ? words.join(' · ') : word.slice(0, length)}
        <span className="ml-0.5 inline-block h-[1.1em] w-[0.55ch] translate-y-[0.18em] animate-[caret-blink_1s_steps(1)_infinite] bg-accent" />
      </span>
    </span>
  )
}
