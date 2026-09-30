import { profile } from '../../data/profile'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border pt-10 pb-36 md:pb-32">
      <div className="container-page flex flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
        <p>
          &copy; {year} · Designed &amp; Developed by{' '}
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-fg underline-offset-4 hover:text-accent hover:underline"
          >
            {profile.firstName} {profile.lastName}
          </a>
        </p>
        <p className="font-mono text-xs">
          <span className="text-accent">&gt;</span> built with React &amp; Motion
        </p>
      </div>
    </footer>
  )
}
