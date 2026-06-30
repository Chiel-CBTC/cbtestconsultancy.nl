import Link from 'next/link'
import React from 'react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-surface bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="font-display font-bold text-text-primary mb-1">CB Test Consultancy</p>
          <p className="text-text-muted text-sm">Chiel Bleumink · KvK 09217715</p>
          <p className="text-text-muted text-sm">Arnhem, Netherlands</p>
        </div>

        <nav className="flex flex-wrap items-center gap-3 text-sm text-text-muted">
          {[
            { href: '/', label: 'Home' },
            { href: '/portfolio', label: 'Portfolio' },
            { href: '/about', label: 'About' },
            { href: '/blog', label: 'Blog' },
            { href: '/contact', label: 'Contact' },
            { href: '/disclaimer', label: 'Disclaimer' },
          ].map(({ href, label }, i, arr) => (
            <React.Fragment key={href}>
              <Link href={href} className="hover:text-accent transition-colors">
                {label}
              </Link>
              {i < arr.length - 1 && <span className="text-text-muted opacity-30">|</span>}
            </React.Fragment>
          ))}
        </nav>

        <p className="text-text-muted text-sm">© {year}</p>
      </div>
    </footer>
  )
}
