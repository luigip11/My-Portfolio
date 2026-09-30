import { motion, useReducedMotion } from 'motion/react'
import type { IconType } from 'react-icons'
import { LuBriefcase, LuGraduationCap, LuMail, LuMapPin, LuSparkles } from 'react-icons/lu'
import work from '../../assets/img/work.webp'
import { about, type AboutFactKey } from '../../data/profile'
import { EASE_OUT_EXPO, inViewOnce } from '../../lib/motion'
import { Reveal, Stagger, StaggerItem } from '../motion/Reveal'
import { Rich } from '../ui/Rich'
import { Section } from '../ui/Section'

const factIcons: Record<AboutFactKey, IconType> = {
  work: LuBriefcase,
  degree: LuGraduationCap,
  email: LuMail,
  city: LuMapPin,
  passions: LuSparkles,
}

const wideFacts: AboutFactKey[] = ['work', 'passions']

export function About() {
  return (
    <Section id="about" index="01" title="Chi sono">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <Portrait />

        <div>
          <Stagger className="space-y-4 text-lg text-muted">
            {about.intro.map((paragraph) => (
              <StaggerItem key={paragraph}>
                <p>
                  <Rich text={paragraph} />
                </p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal>
            <h3 className="mt-12 text-2xl font-semibold">In breve</h3>
          </Reveal>
          <Stagger as="ul" className="mt-6 grid gap-3 sm:grid-cols-2" stagger={0.06}>
            {about.facts.map((fact) => {
              const Icon = factIcons[fact.key]
              return (
                <StaggerItem
                  as="li"
                  key={fact.key}
                  className={`flex gap-4 rounded-2xl border border-border bg-card p-4 ${
                    wideFacts.includes(fact.key) ? 'sm:col-span-2' : ''
                  }`}
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-glow-soft text-accent">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-xs tracking-widest text-muted uppercase">
                      {fact.label}
                    </span>
                    <span className="mt-1 block font-medium break-words text-fg">
                      {'href' in fact ? (
                        <a href={fact.href} className="underline-offset-4 hover:text-accent hover:underline">
                          {fact.value}
                        </a>
                      ) : (
                        fact.value
                      )}
                      {'link' in fact && (
                        <>
                          {' '}
                          <a
                            href={fact.link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent underline-offset-4 hover:underline"
                          >
                            {fact.link.label}
                          </a>
                        </>
                      )}
                    </span>
                  </span>
                </StaggerItem>
              )
            })}
          </Stagger>

          <Reveal className="mt-12">
            <p className="text-lg text-muted">{about.closing}</p>
            <blockquote className="mt-6 border-l-2 border-accent pl-5 font-display text-2xl font-medium md:text-3xl">
              Il mio motto? <span className="text-accent">{about.motto}</span>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

function Portrait() {
  const reduceMotion = useReducedMotion()
  const transition = { duration: 1.2, ease: EASE_OUT_EXPO }

  return (
    <div className="lg:sticky lg:top-24 lg:self-start">
      <motion.figure
        initial={reduceMotion ? false : { clipPath: 'inset(100% 0% 0% 0% round 24px)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 24px)' }}
        viewport={inViewOnce}
        transition={transition}
        className="group relative aspect-4/5 overflow-hidden rounded-3xl border border-border bg-card"
      >
        <motion.img
          src={work}
          width={1170}
          height={681}
          loading="lazy"
          alt="Luigi al lavoro in postazione, con occhiali e cuffie con microfono"
          initial={reduceMotion ? false : { scale: 1.25 }}
          whileInView={{ scale: 1 }}
          viewport={inViewOnce}
          transition={transition}
          className="size-full object-cover object-[32%_50%] transition-[filter] duration-500 group-hover:brightness-110"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent"
        />
        <figcaption className="absolute inset-x-4 bottom-4 bg-black/55 backdrop-blur-md flex items-center gap-2.5 rounded-xl border border-white/10 px-4 py-3 font-mono text-xs text-white">
          <span aria-hidden="true" className="size-2 rounded-full bg-[#0f93ff] shadow-[0_0_10px_#0f93ff]" />
          Mobile Design Developer @ Wacebo Europe
        </figcaption>
      </motion.figure>
    </div>
  )
}
