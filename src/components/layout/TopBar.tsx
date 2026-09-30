import { motion } from 'motion/react'
import { Brand } from './Brand'
import { ThemeToggle } from './ThemeToggle'

/** Hero chrome: fades out when the dock takes over. */
export function TopBar({ hidden }: { hidden: boolean }) {
  return (
    <motion.header
      inert={hidden}
      initial={{ opacity: 0, y: -16 }}
      animate={hidden ? { opacity: 0, y: -16 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-40"
    >
      <div className="container-page flex items-center justify-between py-5">
        <Brand />
        <ThemeToggle className="glass size-11 border border-border" />
      </div>
    </motion.header>
  )
}
