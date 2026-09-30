import { AnimatePresence, LayoutGroup, motion, useReducedMotion, useSpring } from 'motion/react'
import { useState, type PointerEvent, type Ref } from 'react'
import type { IconType } from 'react-icons'
import { LuArrowUpRight, LuGlobe } from 'react-icons/lu'
import { SiAppstore, SiGoogleplay } from 'react-icons/si'
import {
  portfolioIntro,
  projectFilters,
  projects,
  type Project,
  type ProjectCategory,
  type ProjectLinkKind,
} from '../../data/projects'
import { useFinePointer } from '../../hooks/useMediaQuery'
import { EASE_OUT_EXPO } from '../../lib/motion'
import { Reveal } from '../motion/Reveal'
import { SpotlightCard } from '../motion/SpotlightCard'
import { Section } from '../ui/Section'

type Filter = ProjectCategory | 'all'

const linkIcons: Record<ProjectLinkKind, IconType> = {
  'google-play': SiGoogleplay,
  'app-store': SiAppstore,
  site: LuGlobe,
  product: LuArrowUpRight,
}

const countFor = (filter: Filter) =>
  filter === 'all' ? projects.length : projects.filter((project) => project.category === filter).length

export function Portfolio() {
  const [filter, setFilter] = useState<Filter>('all')
  const visible = filter === 'all' ? projects : projects.filter((project) => project.category === filter)

  return (
    <Section id="portfolio" index="05" title="Portfolio" intro={portfolioIntro}>
      <Reveal>
        <div
          role="group"
          aria-label="Filtra i progetti"
          className="glass inline-flex rounded-full border border-border p-1"
        >
          {projectFilters.map((option) => {
            const isActive = filter === option.value
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={isActive}
                onClick={() => setFilter(option.value)}
                className={`relative min-h-11 rounded-full px-5 text-sm font-medium transition-colors ${
                  isActive ? 'text-on-accent' : 'text-muted hover:text-fg'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="portfolio-filter"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    className="absolute inset-0 rounded-full bg-accent-solid"
                  />
                )}
                <span className="relative">
                  {option.label}
                  <span className="ml-1.5 font-mono text-xs opacity-70">{countFor(option.value)}</span>
                </span>
              </button>
            )
          })}
        </div>
      </Reveal>

      <p role="status" className="sr-only">
        {visible.length === 1 ? '1 progetto mostrato' : `${visible.length} progetti mostrati`}
      </p>
      <Reveal delay={0.1}>
        <LayoutGroup>
          <motion.ul layout className="mt-10 grid gap-6 md:grid-cols-2">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
      </Reveal>
    </Section>
  )
}

const tiltSpring = { stiffness: 220, damping: 20 }

function ProjectCard({ project, ref }: { project: Project; ref?: Ref<HTMLLIElement> }) {
  const finePointer = useFinePointer()
  const reduceMotion = useReducedMotion()
  const tiltEnabled = finePointer && !reduceMotion
  const rotateX = useSpring(0, tiltSpring)
  const rotateY = useSpring(0, tiltSpring)

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * 7)
    rotateX.set(-py * 7)
  }

  const reset = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.li
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
    >
      <motion.div
        onPointerMove={tiltEnabled ? handleMove : undefined}
        onPointerLeave={tiltEnabled ? reset : undefined}
        style={tiltEnabled ? { rotateX, rotateY, transformPerspective: 1100 } : undefined}
        className="h-full"
      >
        <SpotlightCard className="flex h-full flex-col" size={520}>
          <article className="flex h-full flex-col">
            <div className="relative aspect-[1200/760] overflow-hidden border-b border-border">
              <img
                src={project.cover}
                alt={project.coverAlt}
                width={1200}
                height={760}
                loading="lazy"
                className="size-full object-cover transition-transform duration-700 ease-out-expo group-hover/spot:scale-[1.04]"
              />
            </div>
            <div className="flex flex-1 flex-col p-6 md:p-7">
              <span className="font-mono text-xs tracking-widest text-accent uppercase">{project.kind}</span>
              <h3 className="mt-2 text-2xl font-semibold">{project.title}</h3>
              <p className="mt-3 text-muted">{project.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tag">
                {project.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-3 pt-7">
                {project.links.map((link) => {
                  const Icon = linkIcons[link.kind]
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border-strong px-4 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                    >
                      <Icon aria-hidden="true" className="size-4" />
                      {link.label}
                      <span className="sr-only"> (si apre in una nuova scheda)</span>
                    </a>
                  )
                })}
              </div>
            </div>
          </article>
        </SpotlightCard>
      </motion.div>
    </motion.li>
  )
}
