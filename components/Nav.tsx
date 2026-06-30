'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-surface bg-background/80 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display font-bold text-white text-lg tracking-tight hover:text-accent transition-colors"
        >
          CB Test Consultancy
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm font-medium transition-colors ${
                  pathname === href
                    ? 'text-accent'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile: simple contact CTA — aria-hidden because /contact already in nav list */}
        <Link
          href="/contact"
          aria-hidden="true"
          tabIndex={-1}
          className="md:hidden text-sm font-semibold text-accent border border-accent px-4 py-2 hover:bg-accent hover:text-background transition-colors"
        >
          Contact
        </Link>
      </nav>
    </header>
  )
}
