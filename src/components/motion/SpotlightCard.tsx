import { useRef, type HTMLAttributes, type PointerEvent } from 'react'

type SpotlightCardProps = HTMLAttributes<HTMLDivElement> & {
  /** Radius of the light following the cursor, in px. */
  size?: number
}

/**
 * Card with a soft radial light that follows the cursor. The position is
 * written to CSS variables, so moving the mouse never re-renders React.
 */
export function SpotlightCard({ size = 360, className = '', children, style, ...rest }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    const node = ref.current
    if (!node || event.pointerType !== 'mouse') return
    const rect = node.getBoundingClientRect()
    node.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    node.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      style={{ ...style, ['--spot' as string]: `${size}px` }}
      className={`group/spot relative isolate overflow-hidden rounded-2xl border border-border bg-card transition-[border-color,background-color,box-shadow] duration-300 hover:border-border-strong ${className}`}
      {...rest}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background:
            'radial-gradient(var(--spot) circle at var(--mx, 50%) var(--my, 50%), var(--glow-soft), transparent 65%)',
        }}
      />
      {children}
    </div>
  )
}
