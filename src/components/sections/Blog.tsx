import { LuArrowUpRight } from 'react-icons/lu'
import { blog, offers } from '../../data/blog'
import { Reveal, Stagger, StaggerItem } from '../motion/Reveal'
import { SpotlightCard } from '../motion/SpotlightCard'
import { Section } from '../ui/Section'

const blogHost = new URL(blog.href).host

export function Blog() {
  return (
    <Section id="blog" index="06" title="Blog" intro={blog.intro}>
      <Reveal>
        <a
          href={blog.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block overflow-hidden rounded-3xl border border-border bg-card p-8 transition-colors hover:border-border-strong md:p-12"
        >
          <div
            aria-hidden="true"
            className="dot-grid absolute inset-0 opacity-60 mask-[linear-gradient(90deg,transparent,black_70%)]"
          />
          <div
            aria-hidden="true"
            className="absolute -right-24 -bottom-24 size-72 rounded-full bg-glow-soft blur-3xl transition-transform duration-700 group-hover:scale-125"
          />
          <span className="relative font-mono text-xs tracking-widest text-accent uppercase">Il mio blog</span>
          <span className="relative mt-4 flex items-center justify-between gap-6">
            <span className="font-display text-3xl font-bold tracking-tight break-words md:text-5xl">
              {blog.name}
            </span>
            <span className="grid size-14 shrink-0 place-items-center rounded-full bg-accent-solid text-on-accent transition-transform duration-300 group-hover:rotate-45">
              <LuArrowUpRight aria-hidden="true" className="size-6" />
            </span>
          </span>
          <span className="relative mt-3 block font-mono text-sm text-muted">{blogHost}</span>
          <span className="sr-only"> (si apre in una nuova scheda)</span>
        </a>
      </Reveal>

      <Reveal>
        <p className="mt-16 text-lg text-muted">{blog.offersIntro}</p>
      </Reveal>
      <Stagger as="ul" className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {offers.map((offer) => {
          const Icon = offer.icon
          return (
            <StaggerItem as="li" key={offer.title}>
              <a
                href={offer.href}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="group block h-full rounded-2xl transition-transform duration-300 hover:-translate-y-1"
              >
                <SpotlightCard className="flex h-full flex-col p-6">
                  <span className="grid size-12 place-items-center rounded-xl bg-glow-soft text-accent transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                  <span className="mt-5 font-display text-lg font-semibold tracking-wide">{offer.title}</span>
                  <span className="mt-2 flex-1 text-sm text-muted">{offer.description}</span>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent">
                    Scopri l'offerta
                    <LuArrowUpRight
                      aria-hidden="true"
                      className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                  <span className="sr-only"> (link affiliato, si apre in una nuova scheda)</span>
                </SpotlightCard>
              </a>
            </StaggerItem>
          )
        })}
      </Stagger>
    </Section>
  )
}
