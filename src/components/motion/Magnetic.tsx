import { motion, useReducedMotion, useSpring } from 'motion/react'
import { useRef, type PointerEvent, type ReactNode } from 'react'
import { useFinePointer } from '../../hooks/useMediaQuery'

type MagneticProps = {
  children: ReactNode
  strength?: number
  className?: string
}

const spring = { stiffness: 220, damping: 16, mass: 0.4 }

/** Pulls its child towards the cursor. Mouse only, off with reduced motion. */
export function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, spring)
  const y = useSpring(0, spring)
  const finePointer = useFinePointer()
  const reduceMotion = useReducedMotion()
  const enabled = finePointer && !reduceMotion

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className ?? 'inline-block'}
      style={enabled ? { x, y } : undefined}
      onPointerMove={enabled ? handleMove : undefined}
      onPointerLeave={enabled ? reset : undefined}
    >
      {children}
    </motion.div>
  )
}
