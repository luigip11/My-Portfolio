import { facts, factsIntro } from '../../data/facts'
import { CountUp } from '../motion/CountUp'
import { Stagger, StaggerItem } from '../motion/Reveal'
import { SpotlightCard } from '../motion/SpotlightCard'
import { Section } from '../ui/Section'

export function Facts() {
  return (
    <Section id="facts" index="02" title="Dati" intro={factsIntro}>
      <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((fact, index) => {
          const Icon = fact.icon
          return (
            <StaggerItem as="li" key={fact.highlight}>
              <SpotlightCard className="h-full p-6">
                <span className="grid size-11 place-items-center rounded-xl bg-glow-soft text-accent">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <CountUp
                  to={fact.value}
                  delay={index * 0.1}
                  className="mt-8 block font-display text-5xl font-bold tracking-tight md:text-6xl"
                />
                <p className="mt-2 text-muted">
                  <strong className="font-semibold text-fg">{fact.highlight}</strong> {fact.rest}
                </p>
              </SpotlightCard>
            </StaggerItem>
          )
        })}
      </Stagger>
    </Section>
  )
}
