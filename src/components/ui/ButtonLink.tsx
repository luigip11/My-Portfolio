import type { AnchorHTMLAttributes } from 'react'

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'primary' | 'secondary'
}

const base =
  'group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-[background-color,box-shadow,color,border-color] duration-200 [&_svg]:size-4 [&_svg]:transition-transform [&_svg]:duration-200'

const variants = {
  primary:
    'bg-accent-solid text-on-accent shadow-[0_0_0_0_var(--glow)] hover:shadow-[0_0_36px_-6px_var(--glow)] [&_svg]:group-hover:translate-x-0.5',
  secondary:
    'glass border border-border-strong text-fg hover:border-accent hover:text-accent [&_svg]:group-hover:translate-y-0.5',
}

export function ButtonLink({ variant = 'primary', className = '', ...rest }: ButtonLinkProps) {
  return <a className={`${base} ${variants[variant]} ${className}`} {...rest} />
}
