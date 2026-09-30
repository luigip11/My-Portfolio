import type { ReactNode } from 'react'
import type { SectionId } from '../../data/navigation'
import { Reveal } from '../motion/Reveal'
import { SplitText } from '../motion/SplitText'

type SectionProps = {
  id: SectionId
  index: string
  title: string
  intro?: ReactNode
  children: ReactNode
  className?: string
}

export function Section({ id, index, title, intro, children, className = '' }: SectionProps) {
  const titleId = `${id}-title`

  return (
    <section
      id={id}
      tabIndex={-1}
      aria-labelledby={titleId}
      className={`relative py-24 outline-none md:py-32 ${className}`}
    >
      <div className="container-page">
        <header className="mb-12 max-w-3xl md:mb-16">
          <Reveal>
            <p className="flex items-center gap-3 font-mono text-sm text-accent">
              <span>{index}</span>
              <span aria-hidden="true" className="h-px w-10 bg-accent/60" />
            </p>
          </Reveal>
          <h2 id={titleId} className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            <SplitText text={title} />
          </h2>
          {intro && (
            <Reveal delay={0.15}>
              <div className="mt-5 text-lg text-muted">{intro}</div>
            </Reveal>
          )}
        </header>
        {children}
      </div>
    </section>
  )
}
