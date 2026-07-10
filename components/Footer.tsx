import Link from 'next/link'

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

        <nav aria-label="Footer" className="flex flex-wrap gap-6 text-sm text-text-muted">
          {[
            { href: '/', label: 'Home' },
            { href: '/portfolio', label: 'Portfolio' },
            { href: '/about', label: 'About' },
            { href: '/blog', label: 'Blog' },
            { href: '/contact', label: 'Contact' },
            { href: '/disclaimer', label: 'Disclaimer' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-accent transition-colors">
              {label}
            </Link>
          ))}
        </nav>

        <p className="text-text-muted text-sm">© {year}</p>
      </div>
    </footer>
  )
}
