import { useLenis } from 'lenis/react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { useCallback, useEffect, useRef, useState, type MouseEvent, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { LuMenu, LuX } from 'react-icons/lu'
import { navItems, type NavItem, type SectionId } from '../../data/navigation'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useScrollTo } from '../../hooks/useScrollTo'
import { ThemeToggle } from './ThemeToggle'

type DockProps = {
  visible: boolean
  active: SectionId
}

const indicatorSpring = { type: 'spring', stiffness: 380, damping: 32 } as const

export function Dock({ visible, active }: DockProps) {
  const isDesktop = useMediaQuery('(min-width: 48rem)')
  const scrollTo = useScrollTo()

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:pb-5">
      <motion.nav
        aria-label="Sezioni del sito"
        inert={!visible}
        initial={false}
        animate={visible ? { y: 0, opacity: 1 } : { y: 32, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        className="pointer-events-auto"
      >
        {isDesktop ? (
          <DesktopDock active={active} onNavigate={scrollTo} />
        ) : (
          <MobileDock active={active} onNavigate={scrollTo} />
        )}
      </motion.nav>
    </div>
  )
}

type DockVariantProps = {
  active: SectionId
  onNavigate: (id: SectionId) => void
}

/* -----------------------------------------------------------------------------
 * Desktop: macOS-style magnification
 * -------------------------------------------------------------------------- */

function DesktopDock({ active, onNavigate }: DockVariantProps) {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY)

  return (
    <ul
      onMouseMove={(event) => mouseX.set(event.clientX)}
      onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
      className="glass flex h-16 items-end gap-2 rounded-2xl border border-border px-3 pb-2.5 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.6)]"
    >
      {navItems.map((item) => (
        <li key={item.id}>
          <DockIcon item={item} mouseX={mouseX} isActive={active === item.id} onNavigate={onNavigate} />
        </li>
      ))}
      <li aria-hidden="true" className="mx-1 h-8 w-px self-center bg-border" />
      <li>
        <ThemeToggle className="size-11 hover:bg-glow-soft" />
      </li>
    </ul>
  )
}

type DockIconProps = {
  item: NavItem
  mouseX: MotionValue<number>
  isActive: boolean
  onNavigate: (id: SectionId) => void
}

function DockIcon({ item, mouseX, isActive, onNavigate }: DockIconProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduceMotion = useReducedMotion()
  const [showTooltip, setShowTooltip] = useState(false)

  const distance = useTransform(mouseX, (x) => {
    const rect = ref.current?.getBoundingClientRect()
    return rect ? x - rect.left - rect.width / 2 : Number.POSITIVE_INFINITY
  })
  const targetSize = useTransform(distance, [-140, 0, 140], [44, 60, 44])
  const size = useSpring(targetSize, { mass: 0.1, stiffness: 180, damping: 14 })
  const Icon = item.icon

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onNavigate(item.id)
  }

  return (
    <motion.a
      ref={ref}
      href={`#${item.id}`}
      onClick={handleClick}
      aria-label={item.label}
      aria-current={isActive ? 'location' : undefined}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      style={reduceMotion ? undefined : { width: size, height: size }}
      className={`relative grid size-11 place-items-center rounded-xl transition-colors ${
        isActive ? 'text-accent' : 'text-muted hover:text-fg'
      }`}
    >
      {isActive && (
        <motion.span
          layoutId="dock-active"
          transition={indicatorSpring}
          className="absolute inset-0 rounded-xl bg-glow-soft ring-1 ring-accent/40"
        />
      )}
      <Icon aria-hidden="true" className="relative h-[46%] w-[46%]" />
      {isActive && (
        <motion.span
          layoutId="dock-dot"
          transition={indicatorSpring}
          className="absolute -bottom-2 size-1 rounded-full bg-accent shadow-[0_0_8px_var(--glow)]"
        />
      )}
      <AnimatePresence>
        {showTooltip && (
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0, y: 6, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 4, x: '-50%' }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute -top-10 left-1/2 rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-medium whitespace-nowrap text-fg shadow-lg"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  )
}

/* -----------------------------------------------------------------------------
 * Mobile: 4 primary sections + menu sheet (the skill's "bottom nav ≤ 5")
 * -------------------------------------------------------------------------- */

const primaryItems = navItems.filter((item) => item.primary)

function MobileDock({ active, onNavigate }: DockVariantProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const activeIsPrimary = primaryItems.some((item) => item.id === active)

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    event.preventDefault()
    onNavigate(id)
  }

  return (
    <>
      <ul className="glass flex items-center gap-1 rounded-2xl border border-border p-1.5 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.6)]">
        {primaryItems.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(event) => handleClick(event, item.id)}
                aria-current={isActive ? 'location' : undefined}
                className={`relative flex h-13 w-15 flex-col items-center justify-center gap-0.5 rounded-xl text-xs font-medium transition-colors ${
                  isActive ? 'text-accent' : 'text-muted'
                }`}
              >
                {isActive && <MobileIndicator />}
                <Icon aria-hidden="true" className="relative size-5" />
                <span className="relative">{item.label}</span>
              </a>
            </li>
          )
        })}
        <li>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={`relative flex h-13 w-15 flex-col items-center justify-center gap-0.5 rounded-xl text-xs font-medium transition-colors ${
              activeIsPrimary ? 'text-muted' : 'text-accent'
            }`}
          >
            {!activeIsPrimary && <MobileIndicator />}
            <LuMenu aria-hidden="true" className="relative size-5" />
            <span className="relative">Menu</span>
          </button>
        </li>
      </ul>

      <MenuSheet
        open={menuOpen}
        active={active}
        onClose={closeMenu}
        onNavigate={onNavigate}
        returnFocusRef={menuButtonRef}
      />
    </>
  )
}

function MobileIndicator() {
  return (
    <motion.span
      layoutId="dock-active-mobile"
      transition={indicatorSpring}
      className="absolute inset-0 rounded-xl bg-glow-soft ring-1 ring-accent/40"
    />
  )
}

type MenuSheetProps = {
  open: boolean
  active: SectionId
  onClose: () => void
  onNavigate: (id: SectionId) => void
  returnFocusRef: RefObject<HTMLButtonElement | null>
}

function MenuSheet({ open, active, onClose, onNavigate, returnFocusRef }: MenuSheetProps) {
  const lenis = useLenis()
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const navigatingRef = useRef(false)

  useEffect(() => {
    if (!open) return

    navigatingRef.current = false
    lenis?.stop()
    firstLinkRef.current?.focus()

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)

    const returnFocus = returnFocusRef.current
    return () => {
      window.removeEventListener('keydown', handleKey)
      lenis?.start()
      if (!navigatingRef.current) returnFocus?.focus()
    }
  }, [open, lenis, onClose, returnFocusRef])

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    event.preventDefault()
    navigatingRef.current = true
    onClose()
    // Let the sheet release the scroll lock before scrolling.
    requestAnimationFrame(() => onNavigate(id))
  }

  // Portal: the dock is transformed, which would trap `position: fixed`.
  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            aria-hidden="true"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-auto fixed inset-0 z-50 bg-black/55 backdrop-blur-sm"
          />
          <motion.div
            key="sheet"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            exit={{ y: '110%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="pointer-events-auto fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 rounded-3xl border border-border bg-surface p-4 shadow-2xl"
          >
            <div className="flex items-center justify-between px-2 pb-3">
              <h2 id="mobile-menu-title" className="font-mono text-xs tracking-[0.2em] text-muted uppercase">
                Sezioni
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Chiudi menu"
                className="grid size-11 place-items-center rounded-xl text-muted hover:text-fg"
              >
                <LuX aria-hidden="true" className="size-5" />
              </button>
            </div>
            <motion.ul
              className="grid grid-cols-2 gap-2"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.035, delayChildren: 0.08 } } }}
            >
              {navItems.map((item, index) => {
                const Icon = item.icon
                const isActive = active === item.id
                return (
                  <motion.li
                    key={item.id}
                    variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                  >
                    <a
                      ref={index === 0 ? firstLinkRef : undefined}
                      href={`#${item.id}`}
                      onClick={(event) => handleClick(event, item.id)}
                      aria-current={isActive ? 'location' : undefined}
                      className={`flex min-h-12 items-center gap-3 rounded-xl border px-4 text-sm font-medium transition-colors ${
                        isActive
                          ? 'border-accent/50 bg-glow-soft text-accent'
                          : 'border-border text-fg hover:border-border-strong'
                      }`}
                    >
                      <Icon aria-hidden="true" className="size-5 shrink-0" />
                      {item.label}
                    </a>
                  </motion.li>
                )
              })}
            </motion.ul>
            <div className="mt-3 border-t border-border pt-3">
              <ThemeToggle showLabel className="min-h-12 w-full justify-start px-4 hover:bg-glow-soft" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  )
}
