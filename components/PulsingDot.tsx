'use client'
import { motion, useReducedMotion } from 'framer-motion'

export default function PulsingDot() {
  const reduced = useReducedMotion()

  return (
    <motion.span
      className="inline-flex rounded-full w-2.5 h-2.5 bg-accent shrink-0"
      animate={
        reduced
          ? undefined
          : { boxShadow: ['0 0 0 0px rgba(192,48,42,0.5)', '0 0 0 5px rgba(192,48,42,0)'] }
      }
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
    />
  )
}
