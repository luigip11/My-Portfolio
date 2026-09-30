import { useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { useFinePointer } from '../../hooks/useMediaQuery'

/** Soft page-wide light that trails the mouse. Desktop only. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  const finePointer = useFinePointer()
  const reduceMotion = useReducedMotion()
  const enabled = finePointer && !reduceMotion

  useEffect(() => {
    if (!enabled) return

    let frame = 0
    const handleMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const node = ref.current
        if (!node) return
        node.style.setProperty('--cx', `${event.clientX}px`)
        node.style.setProperty('--cy', `${event.clientY}px`)
        node.style.opacity = '1'
      })
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', handleMove)
      cancelAnimationFrame(frame)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-0 transition-opacity duration-700"
      style={{
        background: 'radial-gradient(600px circle at var(--cx) var(--cy), var(--glow-soft), transparent 70%)',
      }}
    />
  )
}
