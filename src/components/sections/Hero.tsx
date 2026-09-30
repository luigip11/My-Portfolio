import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef, type MouseEvent } from 'react'
import { LuArrowRight, LuDownload } from 'react-icons/lu'
import hero1280 from '../../assets/img/hero-1280.webp'
import hero1920 from '../../assets/img/hero-1920.webp'
import hero2400 from '../../assets/img/hero-2400.webp'
import type { SectionId } from '../../data/navigation'
import { profile } from '../../data/profile'
import { useScrollTo } from '../../hooks/useScrollTo'
import { EASE_OUT_EXPO } from '../../lib/motion'
import { Magnetic } from '../motion/Magnetic'
import { SplitText } from '../motion/SplitText'
import { Typewriter } from '../motion/Typewriter'
import { ButtonLink } from '../ui/ButtonLink'

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE_OUT_EXPO, delay },
})

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const scrollTo = useScrollTo()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // Parallax on the decorative background only (skill: yPercent 5–15, never on text).
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const cueOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  const goTo = (id: SectionId) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    scrollTo(id)
  }

  return (
    <section
      id="hero"
      ref={ref}
      tabIndex={-1}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh items-center overflow-hidden outline-none"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-30"
        style={reduceMotion ? undefined : { y: backgroundY, scale: backgroundScale }}
      >
        <img
          src={hero2400}
          srcSet={`${hero1280} 1280w, ${hero1920} 1920w, ${hero2400} 2400w`}
          sizes="100vw"
          width={2400}
          height={1600}
          alt=""
          fetchPriority="high"
          className="size-full object-cover"
        />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        style={{
          background:
            'linear-gradient(180deg, var(--hero-overlay) 0%, var(--hero-overlay) 60%, var(--bg) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="dot-grid absolute inset-0 -z-10 animate-[grid-drift_18s_linear_infinite] opacity-50 mask-[radial-gradient(ellipse_at_30%_45%,black_10%,transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/4 -left-40 -z-10 size-[36rem] rounded-full bg-glow-soft blur-3xl"
      />

      <motion.div style={{ opacity: contentOpacity }} className="container-page pt-28 pb-36">
        <motion.p
          {...enter(0.1)}
          className="glass inline-flex items-center gap-2.5 rounded-full border border-border px-3.5 py-1.5 font-mono text-xs tracking-[0.2em] text-accent uppercase"
        >
          <span aria-hidden="true" className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-[live-ping_1.8s_ease-out_infinite] rounded-full bg-accent" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          {profile.eyebrow}
        </motion.p>

        <h1
          id="hero-title"
          className="mt-6 text-[clamp(3.25rem,12vw,9rem)] leading-[0.92] font-bold tracking-tighter"
        >
          <SplitText text={profile.firstName} by="char" immediate delay={0.2} className="block" />
          <SplitText
            text={profile.lastName}
            by="char"
            immediate
            delay={0.4}
            // drop-shadow on the wrapper: a text-shadow would be clipped by the reveal masks
            className="block text-accent drop-shadow-[0_0_36px_var(--glow)]"
          />
        </h1>

        <motion.p {...enter(0.85)} className="mt-8 max-w-xl text-lg text-muted md:text-xl">
          {profile.lead}
        </motion.p>

        <motion.p {...enter(1)} className="mt-6 min-h-[1.75em] font-mono text-base text-fg md:text-lg">
          <span aria-hidden="true" className="mr-2 text-accent">
            &gt;
          </span>
          <Typewriter words={profile.roles} />
        </motion.p>

        <motion.div {...enter(1.15)} className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic>
            <ButtonLink href="#portfolio" onClick={goTo('portfolio')}>
              Vedi i progetti
              <LuArrowRight aria-hidden="true" />
            </ButtonLink>
          </Magnetic>
          <Magnetic>
            <ButtonLink variant="secondary" href={profile.cv.href} download={profile.cv.downloadName}>
              {profile.cv.label}
              <LuDownload aria-hidden="true" />
            </ButtonLink>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          onClick={goTo('about')}
          style={{ opacity: cueOpacity }}
          className="flex flex-col items-center gap-3 font-mono text-xs tracking-[0.3em] text-muted uppercase hover:text-fg"
        >
          <span
            aria-hidden="true"
            className="flex h-10 w-6 justify-center rounded-full border border-border-strong pt-2"
          >
            <motion.span
              className="size-1.5 rounded-full bg-accent"
              animate={reduceMotion ? undefined : { y: [0, 14, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
          Scroll down
        </motion.a>
      </motion.div>
    </section>
  )
}
