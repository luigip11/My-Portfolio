import { motion, type Variants } from 'motion/react'
import { EASE_OUT_EXPO, inViewOnce, staggerContainer } from '../../lib/motion'

type SplitTextProps = {
  text: string
  className?: string
  /** Split into words (section titles) or characters (hero name). */
  by?: 'word' | 'char'
  delay?: number
  stagger?: number
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean
}

const segment: Variants = {
  hidden: { y: '110%', opacity: 0, filter: 'blur(8px)' },
  show: {
    y: '0%',
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
}

/**
 * Masked headline reveal. Keep it for short headlines only (the skill's GSAP
 * stagger preset: "reserve for headlines under ~8 words").
 * Screen readers get the plain text; the animated pieces are aria-hidden.
 */
export function SplitText({
  text,
  className,
  by = 'word',
  delay = 0,
  stagger,
  immediate = false,
}: SplitTextProps) {
  const words = text.split(' ')
  const step = stagger ?? (by === 'char' ? 0.035 : 0.08)
  const trigger = immediate ? { animate: 'show' } : { whileInView: 'show', viewport: inViewOnce }

  return (
    <motion.span
      className={className}
      variants={staggerContainer(step, delay)}
      initial="hidden"
      {...trigger}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} aria-hidden="true">
          <span className="-mb-[0.14em] inline-flex overflow-hidden pb-[0.14em] whitespace-nowrap">
            {by === 'word' ? (
              <motion.span className="inline-block" variants={segment}>
                {word}
              </motion.span>
            ) : (
              [...word].map((char, charIndex) => (
                <motion.span key={charIndex} className="inline-block" variants={segment}>
                  {char}
                </motion.span>
              ))
            )}
          </span>
          {wordIndex < words.length - 1 && ' '}
        </span>
      ))}
    </motion.span>
  )
}
