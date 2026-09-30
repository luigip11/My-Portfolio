import { ReactLenis } from 'lenis/react'
import { MotionConfig, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { CursorGlow } from './components/layout/CursorGlow'
import { Dock } from './components/layout/Dock'
import { Footer } from './components/layout/Footer'
import { ScrollProgress } from './components/layout/ScrollProgress'
import { TopBar } from './components/layout/TopBar'
import { About } from './components/sections/About'
import { Blog } from './components/sections/Blog'
import { Contact } from './components/sections/Contact'
import { Facts } from './components/sections/Facts'
import { Hero } from './components/sections/Hero'
import { Portfolio } from './components/sections/Portfolio'
import { Resume } from './components/sections/Resume'
import { Skills } from './components/sections/Skills'
import { navItems } from './data/navigation'
import { useActiveSection } from './hooks/useActiveSection'

const sectionIds = navItems.map((item) => item.id)

/** The dock replaces the top bar once most of the hero has scrolled away. */
const isPastHero = (scrollY: number) => scrollY > window.innerHeight * 0.55

export default function App() {
  const active = useActiveSection(sectionIds)
  const { scrollY } = useScroll()
  const [pastHero, setPastHero] = useState(() => isPastHero(window.scrollY))

  useMotionValueEvent(scrollY, 'change', (value) => setPastHero(isPastHero(value)))

  // Deep links (e.g. /My-Portfolio/#portfolio) land on their section.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [])

  return (
    <ReactLenis root options={{ lerp: 0.1 }}>
      {/* "user": transforms and layout animations are skipped with prefers-reduced-motion */}
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="sr-only rounded-full bg-accent-solid px-5 py-3 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60]"
        >
          Vai al contenuto
        </a>
        <ScrollProgress />
        <CursorGlow />
        <TopBar hidden={pastHero} />

        <main id="main" tabIndex={-1} className="relative z-10 outline-none">
          <Hero />
          <About />
          <Facts />
          <Skills />
          <Resume />
          <Portfolio />
          <Blog />
          <Contact />
        </main>

        <Footer />
        <Dock visible={pastHero} active={active} />
      </MotionConfig>
    </ReactLenis>
  )
}
