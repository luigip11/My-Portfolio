import { useLenis } from 'lenis/react'
import { useCallback, useSyncExternalStore } from 'react'
import type { SectionId } from '../data/navigation'

const SCROLL_DURATION = 1.2

/*
 * Section the page is travelling to after a nav click. While it is set it
 * wins over the observed active section, so nav indicators go straight to
 * the destination instead of flicking through every section in between.
 */
let navigationTarget: SectionId | null = null
let releaseNavigation: (() => void) | null = null
const listeners = new Set<() => void>()
const notify = () => listeners.forEach((listener) => listener())

function lockNavigation(id: SectionId) {
  releaseNavigation?.()

  const release = () => {
    window.clearTimeout(timer)
    window.removeEventListener('wheel', release)
    window.removeEventListener('touchstart', release)
    if (releaseNavigation !== release) return
    releaseNavigation = null
    navigationTarget = null
    notify()
  }

  // Wheel/touch interrupt the smooth scroll, and then it never completes:
  // hand control back to the observer. The timer is a last-resort fallback.
  const timer = window.setTimeout(release, SCROLL_DURATION * 1000 + 400)
  window.addEventListener('wheel', release, { passive: true })
  window.addEventListener('touchstart', release, { passive: true })

  releaseNavigation = release
  navigationTarget = id
  notify()
  return release
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useNavigationTarget() {
  return useSyncExternalStore(subscribe, () => navigationTarget, () => null)
}

/**
 * Smooth-scrolls to a section (Lenis when available, native otherwise),
 * keeps the URL hash in sync for deep links and moves focus for keyboard users.
 */
export function useScrollTo() {
  const lenis = useLenis()

  return useCallback(
    (id: SectionId) => {
      const target = document.getElementById(id)
      if (!target) return

      const release = lockNavigation(id)

      if (lenis) {
        lenis.scrollTo(id === 'hero' ? 0 : target, { duration: SCROLL_DURATION, onComplete: release })
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
