'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-background overflow-hidden pt-16">
      {/* Subtle grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,212,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="font-mono text-accent text-xs tracking-[0.25em] uppercase mb-8">
            QA Consulting · Playwright · AI Testing
          </p>
          <h1 className="font-display font-bold text-white text-6xl md:text-7xl leading-[1.05] mb-8">
            Testing at the{' '}
            <span className="text-accent">speed</span>{' '}
            of modern teams.
          </h1>
          <p className="text-text-muted text-xl leading-relaxed mb-10 max-w-lg">
            17+ years helping finance, retail, energy, and government teams ship
            flawless digital products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-block bg-accent text-background px-8 py-4 font-semibold text-lg hover:bg-accent-dim transition-colors text-center"
            >
              Let&apos;s talk →
            </Link>
            <Link
              href="/portfolio"
              className="inline-block border border-accent text-accent px-8 py-4 font-semibold text-lg hover:bg-accent hover:text-background transition-colors text-center"
            >
              View work
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="hidden md:flex items-center justify-center"
          aria-hidden
        >
          <div className="relative w-72 h-72">
            {[0, 32, 64, 96].map((inset, i) => (
              <div
                key={inset}
                className="absolute rounded-full border border-accent"
                style={{
                  inset: `${inset}px`,
                  opacity: 0.1 + i * 0.1,
                }}
              />
            ))}
            <div className="absolute inset-[120px] rounded-full bg-accent opacity-10" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-accent opacity-10" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-accent opacity-10" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
