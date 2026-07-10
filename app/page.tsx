import Hero from '@/components/Hero'
import ServiceCard from '@/components/ServiceCard'
import ClientLogoStrip from '@/components/ClientLogoStrip'
import Link from 'next/link'

const AgileIcon = () => (
  <svg width="56" height="56" viewBox="0 0 28 28" fill="none" aria-hidden>
    <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M9 14l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const PlaywrightIcon = () => (
  <svg width="56" height="56" viewBox="0 0 28 28" fill="none" aria-hidden>
    <path d="M6 8l-3 6 3 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 8l3 6-3 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 5l-6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const AIIcon = () => (
  <svg width="56" height="56" viewBox="0 0 28 28" fill="none" aria-hidden>
    <circle cx="14" cy="14" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="5" cy="9" r="2" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="23" cy="9" r="2" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="5" cy="19" r="2" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="23" cy="19" r="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M11.6 12.9L7 10.8M16.4 12.9L21 10.8M11.6 15.1L7 17.2M16.4 15.1L21 17.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const services = [
  {
    icon: <AgileIcon />,
    title: 'Agile / Scrum / DevOps QA',
    description:
      'Embedded quality in every sprint. I align testing with your delivery cadence — from backlog refinement to release gates.',
  },
  {
    icon: <PlaywrightIcon />,
    title: 'Playwright Test Automation',
    description:
      'Modern, maintainable test suites in TypeScript with Playwright. Fast feedback in CI/CD via GitHub Actions and Azure DevOps.',
  },
  {
    icon: <AIIcon />,
    title: 'AI-Powered Testing',
    description:
      'Smarter test coverage through AI-assisted generation, intelligent failure triage, and OpenAI / Claude integrations.',
  },
]

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Service pillars */}
      <section className="bg-background py-32">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display font-bold text-text-primary text-4xl md:text-5xl mb-16 md:whitespace-nowrap">
            Quality baked in, not bolted on
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>

      <ClientLogoStrip />

      {/* CTA */}
      <section className="bg-background py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-text-primary text-4xl md:text-5xl mb-6 text-balance">
            Interested in working together?
          </h2>
          <p className="text-text-muted text-xl mb-10">
            Let&apos;s talk about your product, your team, and how I can help you ship with confidence.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-accent text-white px-10 py-5 font-semibold text-lg hover:bg-accent-dim transition-colors"
          >
            Get in touch →
          </Link>
        </div>
      </section>
    </>
  )
}
