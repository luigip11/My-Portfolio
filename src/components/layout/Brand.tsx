import type { MouseEvent } from 'react'
import { profile } from '../../data/profile'
import { useScrollTo } from '../../hooks/useScrollTo'

/** The "LP" circle with the pulsing neon glow from the old sidebar. */
export function Brand({ className = '' }: { className?: string }) {
  const scrollTo = useScrollTo()

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    scrollTo('hero')
  }

  return (
    <a
      href="#hero"
      onClick={handleClick}
      aria-label="Luigi Puzziferri, torna all'inizio"
      className={`grid size-12 place-items-center rounded-full border border-white/10 bg-[#050506] animate-[logo-pulse_5s_ease-in-out_infinite] ${className}`}
    >
      <span aria-hidden="true" className="font-logo text-lg leading-none text-[#0f93ff]">
        {profile.initials}
      </span>
    </a>
  )
}
