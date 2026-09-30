import { LuMail } from 'react-icons/lu'
import { contactIntro, contacts, mapEmbedUrl } from '../../data/contact'
import { profile } from '../../data/profile'
import { Magnetic } from '../motion/Magnetic'
import { Reveal, Stagger, StaggerItem } from '../motion/Reveal'
import { SpotlightCard } from '../motion/SpotlightCard'
import { ButtonLink } from '../ui/ButtonLink'
import { Section } from '../ui/Section'

export function Contact() {
  return (
    <Section id="contact" index="07" title="Contatti" intro={contactIntro}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div>
          <Stagger as="ul" className="space-y-3" stagger={0.06}>
            {contacts.map((contact) => {
              const Icon = contact.icon
              return (
                <StaggerItem as="li" key={contact.title}>
                  <SpotlightCard className="flex items-center gap-4 p-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-glow-soft text-accent">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-xs tracking-widest text-muted uppercase">
                        {contact.title}
                      </span>
                      {contact.href ? (
                        <a
                          href={contact.href}
                          {...(contact.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className="mt-0.5 block font-medium break-words text-fg underline-offset-4 after:absolute after:inset-0 hover:text-accent hover:underline"
                        >
                          {contact.text}
                          {contact.external && <span className="sr-only"> (si apre in una nuova scheda)</span>}
                        </a>
                      ) : (
                        <span className="mt-0.5 block font-medium text-fg">{contact.text}</span>
                      )}
                    </span>
                  </SpotlightCard>
                </StaggerItem>
              )
            })}
          </Stagger>
          <Reveal className="mt-8">
            <Magnetic>
              <ButtonLink href={`mailto:${profile.email}`}>
                Scrivimi una mail
                <LuMail aria-hidden="true" />
              </ButtonLink>
            </Magnetic>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="min-h-80 overflow-hidden rounded-3xl border border-border bg-card">
          <iframe
            title="Mappa di Gravina in Puglia"
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="block size-full min-h-80 border-0 lg:min-h-full"
            style={{ filter: 'var(--map-filter)' }}
          />
        </Reveal>
      </div>
    </Section>
  )
}
