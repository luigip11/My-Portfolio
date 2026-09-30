import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { skillGroups, type Skill } from '../../data/skills'
import { inViewOnce } from '../../lib/motion'
import { CountUp } from '../motion/CountUp'
import { Reveal } from '../motion/Reveal'
import { SpotlightCard } from '../motion/SpotlightCard'
import { Section } from '../ui/Section'

/** easeOutCubic, as in the old progress-bar animation. */
const EASE_OUT_CUBIC = [0.33, 1, 0.68, 1] as const

export function Skills() {
  return (
    <Section id="skills" index="03" title="Skills">
      <div className="grid gap-6 lg:grid-cols-2">
        {skillGroups.map((group, groupIndex) => (
          <Reveal key={group.title} delay={groupIndex * 0.1}>
            <SpotlightCard className="h-full p-6 md:p-8" size={480}>
              <h3 className="font-mono text-sm tracking-widest text-muted uppercase">{group.title}</h3>
              <ul className="mt-7 space-y-6">
                {group.skills.map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill} index={index} />
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, inViewOnce)
  const Icon = skill.icon
  // Same timing as the old site: 1100ms + 45ms per row.
  const duration = 1.1 + index * 0.045
  const delay = index * 0.045

  return (
    <li ref={ref}>
      <div className="flex items-center justify-between gap-4">
        <span className="flex items-center gap-3 font-medium">
          <Icon aria-hidden="true" className="size-5 shrink-0 text-accent" />
          {skill.name}
        </span>
        <CountUp to={skill.level} suffix="%" duration={duration} delay={delay} className="font-mono text-sm text-muted" />
      </div>
      <div
        role="progressbar"
        aria-label={skill.name}
        aria-valuenow={skill.level}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-border"
      >
        <div className="h-full" style={{ width: `${skill.level}%` }}>
          <motion.div
            className="h-full origin-left rounded-full bg-linear-to-r from-accent-solid to-accent-soft shadow-[0_0_12px_var(--glow)]"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : undefined}
            transition={{ duration, delay, ease: EASE_OUT_CUBIC }}
          />
        </div>
      </div>
    </li>
  )
}
