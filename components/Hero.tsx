'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

export default function Hero() {
  const reduced = useReducedMotion()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
      {/* Background image */}
      <Image
        src="/images/poster.jpg"
        alt=""
        fill
        priority
        className="object-cover object-center"
        aria-hidden
      />
      {/* Dark overlay for text readability */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(105deg, rgba(5,15,30,0.82) 0%, rgba(5,15,30,0.60) 55%, rgba(5,15,30,0.35) 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.7, ease: 'easeOut' }}
        >
          <p className="font-mono text-accent text-xs tracking-[0.25em] uppercase mb-8">
            QA Consulting · Playwright · AI Testing
          </p>
          <h1 className="font-display font-bold text-white text-6xl md:text-7xl leading-[1.05] mb-8 text-balance">
            Testing at the{' '}
            <span className="text-accent">speed</span>{' '}
            of modern teams.
          </h1>
          <p className="text-white/70 text-xl leading-relaxed mb-10 max-w-lg">
            17+ years helping finance, retail, energy, and government teams ship
            flawless digital products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-block bg-accent text-white px-8 py-4 font-semibold text-lg hover:bg-accent-dim transition-colors text-center"
            >
              Let&apos;s talk →
            </Link>
            <Link
              href="/portfolio"
              className="inline-block border border-white text-white px-8 py-4 font-semibold text-lg hover:bg-white hover:text-background transition-colors text-center"
            >
              View work
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
