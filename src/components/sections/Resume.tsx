import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import type { IconType } from 'react-icons'
import { LuBriefcase, LuDownload, LuGraduationCap } from 'react-icons/lu'
import { profile } from '../../data/profile'
import { education, experience, type EducationItem, type ExperienceItem } from '../../data/resume'
import { inViewOnce, revealTransition } from '../../lib/motion'
import { Reveal } from '../motion/Reveal'
import { ButtonLink } from '../ui/ButtonLink'
import { Section } from '../ui/Section'

export function Resume() {
  return (
    <Section id="resume" index="04" title="Curriculum Vitae">
      <Reveal>
        <ButtonLink variant="secondary" href={profile.cv.href} download={profile.cv.downloadName}>
          {profile.cv.label}
          <LuDownload aria-hidden="true" />
        </ButtonLink>
      </Reveal>

      <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:gap-12">
        <Timeline title="Formazione" icon={LuGraduationCap}>
          {education.map((item) => (
            <EducationEntry key={item.title} item={item} />
          ))}
        </Timeline>
        <Timeline title="Esperienze lavorative" icon={LuBriefcase}>
          {experience.map((item) => (
            <ExperienceEntry key={`${item.title}-${item.period}`} item={item} />
          ))}
        </Timeline>
      </div>
    </Section>
  )
}

/** Vertical timeline whose line draws itself as you scroll through it. */
function Timeline({ title, icon: Icon, children }: { title: string; icon: IconType; children: ReactNode }) {
  const ref = useRef<HTMLOListElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 55%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <div>
      <Reveal>
        <h3 className="flex items-center gap-3 text-2xl font-semibold">
          <span className="grid size-11 place-items-center rounded-xl bg-glow-soft text-accent">
            <Icon aria-hidden="true" className="size-5" />
          </span>
          {title}
        </h3>
      </Reveal>
      <div className="relative mt-10">
        <div aria-hidden="true" className="absolute top-2 bottom-2 left-[7px] w-px bg-border" />
        <motion.div
          aria-hidden="true"
          style={reduceMotion ? undefined : { scaleY }}
          className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-linear-to-b from-accent via-accent to-accent-soft shadow-[0_0_10px_var(--glow)]"
        />
        <ol ref={ref} className="space-y-10">
          {children}
        </ol>
      </div>
    </div>
  )
}

function TimelineEntry({ children }: { children: ReactNode }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={inViewOnce}
      transition={revealTransition}
      className="relative pl-10"
    >
      <span
        aria-hidden="true"
        className="absolute top-1.5 left-0 grid size-[15px] place-items-center rounded-full border border-accent bg-bg"
      >
        <span className="size-[7px] rounded-full bg-accent shadow-[0_0_8px_var(--glow)]" />
      </span>
      {children}
    </motion.li>
  )
}

function EducationEntry({ item }: { item: EducationItem }) {
  return (
    <TimelineEntry>
      <h4 className="text-lg font-semibold">{item.title}</h4>
      <p className="mt-1 text-sm font-medium text-accent">{item.org}</p>
      {item.issued && <p className="mt-3 text-sm text-muted">Data di rilascio: {item.issued}</p>}
      {item.credentialId && (
        <p className="mt-1 text-sm text-muted">
          ID credenziale:{' '}
          <code className="font-mono text-xs break-all text-fg/80">{item.credentialId}</code>
        </p>
      )}
      {item.skills && <p className="mt-1 text-sm text-muted">Competenze: {item.skills}</p>}
      {item.description && <p className="mt-3 text-muted">{item.description}</p>}
    </TimelineEntry>
  )
}

function ExperienceEntry({ item }: { item: ExperienceItem }) {
  return (
    <TimelineEntry>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h4 className="text-lg font-semibold">{item.title}</h4>
        {item.current && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-glow-soft px-2.5 py-0.5 text-xs font-medium text-accent">
            <span aria-hidden="true" className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-[live-ping_1.8s_ease-out_infinite] rounded-full bg-accent" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
            </span>
            In corso
          </span>
        )}
      </div>
      <p className="mt-2 font-mono text-xs tracking-wide text-muted uppercase">{item.period}</p>
      <p className="mt-1 text-sm font-medium text-accent">{item.org}</p>
      <ul className="mt-3 space-y-1.5 text-muted">
        {item.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-3">
            <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent/70" />
            {bullet}
          </li>
        ))}
      </ul>
    </TimelineEntry>
  )
}
