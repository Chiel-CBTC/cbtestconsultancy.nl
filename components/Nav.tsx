'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const links = [
  { href: '/', label: 'Home' },
  { href: '/clients', label: 'Clients' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const reduced = useReducedMotion()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isOpen) return

    document.body.style.overflow = 'hidden'
    firstLinkRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-surface">
      <nav aria-label="Primary" className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/cbtc-logo.png"
            alt="CB Test Consultancy"
            className="h-14 md:h-20 w-auto"
          />
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-accent'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label="Menu"
          className="md:hidden inline-flex items-center justify-center w-11 h-11 -mr-2.5 text-text-primary"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {isOpen ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="md:hidden fixed inset-x-0 top-20 bottom-0 bg-background z-40 overflow-y-auto"
            initial={{ opacity: 0, y: reduced ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -8 }}
            transition={{ duration: reduced ? 0 : 0.2, ease: 'easeOut' }}
          >
            <nav aria-label="Mobile" className="px-6 py-8">
              <ul className="flex flex-col">
                {links.map(({ href, label }, index) => {
                  const isActive = pathname === href
                  return (
                    <li key={href} className="border-b border-surface">
                      <Link
                        ref={index === 0 ? firstLinkRef : undefined}
                        href={href}
                        aria-current={isActive ? 'page' : undefined}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center min-h-14 text-lg font-display font-semibold transition-colors ${
                          isActive ? 'text-accent' : 'text-text-primary hover:text-accent'
                        }`}
                      >
                        {label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
