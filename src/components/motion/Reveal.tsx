import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { fadeUp, inViewOnce, revealTransition, staggerContainer } from '../../lib/motion'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

/** Fades and lifts its content in once, when it scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewOnce}
      transition={{ ...revealTransition, delay }}
    >
      {children}
    </motion.div>
  )
}

type StaggerProps = {
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
  as?: 'div' | 'ul' | 'ol'
}

/** Reveals `<StaggerItem>` children one after another. */
export function Stagger({ children, className, stagger = 0.08, delay = 0, as = 'div' }: StaggerProps) {
  const Component = motion[as]
  return (
    <Component
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={inViewOnce}
    >
      {children}
    </Component>
  )
}

type StaggerItemProps = {
  children: ReactNode
  className?: string
  as?: 'div' | 'li' | 'article'
}

export function StaggerItem({ children, className, as = 'div' }: StaggerItemProps) {
  const Component = motion[as]
  return (
    <Component className={className} variants={fadeUp}>
      {children}
    </Component>
  )
}
