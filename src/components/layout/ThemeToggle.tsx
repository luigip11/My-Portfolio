import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { MouseEvent } from 'react'
import { flushSync } from 'react-dom'
import { LuMoon, LuSun } from 'react-icons/lu'
import { setTheme, useTheme } from '../../hooks/useTheme'

type ThemeToggleProps = {
  className?: string
  showLabel?: boolean
}

/**
 * Switches theme with a circular reveal that grows from the button
 * (View Transitions API). Falls back to an instant switch.
 */
export function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const theme = useTheme()
  const reduceMotion = useReducedMotion()
  const next = theme === 'dark' ? 'light' : 'dark'
  const label = next === 'light' ? 'Passa al tema chiaro' : 'Passa al tema scuro'

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const apply = () => setTheme(next)

    if (reduceMotion || typeof document.startViewTransition !== 'function') {
      apply()
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

    const transition = document.startViewTransition(() => flushSync(apply))
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          {
            duration: 650,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            pseudoElement: '::view-transition-new(root)',
          },
        )
      })
      .catch(() => {
        // Transition skipped (e.g. tab hidden): the theme is already applied.
      })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={showLabel ? undefined : label}
      title={label}
      className={`relative inline-flex items-center justify-center gap-3 rounded-xl text-muted transition-colors hover:text-fg ${className}`}
    >
      <span className="relative grid size-5 place-items-center" aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            className="absolute"
            initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            {theme === 'dark' ? <LuSun className="size-5" /> : <LuMoon className="size-5" />}
          </motion.span>
        </AnimatePresence>
      </span>
      {showLabel && <span className="text-sm font-medium">{label}</span>}
    </button>
  )
}
