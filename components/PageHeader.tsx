'use client'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

interface PageHeaderProps {
  title: string
  subtitle?: string
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  const reduced = useReducedMotion()

  return (
    <section className="relative flex items-end overflow-hidden pt-24 min-h-[40vh]">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={{ scale: reduced ? 1 : 1.15 }}
        transition={{ duration: reduced ? 0 : 8, ease: 'linear' }}
      >
        <Image
          src="/images/poster-2.avif"
          alt=""
          fill
          priority
          className="object-cover object-center"
          aria-hidden
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(105deg, rgba(5,15,30,0.82) 0%, rgba(5,15,30,0.60) 55%, rgba(5,15,30,0.35) 100%)',
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
        <h1 className="font-display font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-balance">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/70 text-xl mt-4 max-w-2xl leading-relaxed">{subtitle}</p>
        )}
      </div>
    </section>
  )
}
