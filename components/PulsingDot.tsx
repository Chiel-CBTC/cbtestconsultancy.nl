'use client'
import { motion } from 'framer-motion'

export default function PulsingDot() {
  return (
    <motion.span
      className="inline-flex rounded-full w-2.5 h-2.5 bg-accent shrink-0"
      animate={{ boxShadow: ['0 0 0 0px rgba(192,48,42,0.5)', '0 0 0 5px rgba(192,48,42,0)'] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
    />
  )
}
