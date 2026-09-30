import { useLenis } from 'lenis/react'
import { useCallback } from 'react'

/**
 * Smooth-scrolls to a section (Lenis when available, native otherwise),
 * keeps the URL hash in sync for deep links and moves focus for keyboard users.
 */
export function useScrollTo() {
  const lenis = useLenis()

  return useCallback(
    (id: string) => {
      const target = document.getElementById(id)
      if (!target) return

      if (lenis) {
        lenis.scrollTo(id === 'hero' ? 0 : target, { duration: 1.2 })
      } else {
        target.scrollIntoView({ behavior: 'smooth' })
      }

      const url = id === 'hero' ? window.location.pathname : `#${id}`
      window.history.replaceState(null, '', url)
      target.focus({ preventScroll: true })
    },
    [lenis],
  )
}
