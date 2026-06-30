import Hero from '@/components/Hero'
import ServiceCard from '@/components/ServiceCard'
import ClientLogoStrip from '@/components/ClientLogoStrip'
import Link from 'next/link'

const services = [
  {
    icon: '⚡',
    title: 'Agile / Scrum / DevOps QA',
    description:
      'Embedded quality in every sprint. I align testing with your delivery cadence — from backlog refinement to release gates.',
  },
  {
    icon: '🎭',
    title: 'Playwright Test Automation',
    description:
      'Modern, maintainable test suites in TypeScript with Playwright. Fast feedback in CI/CD via GitHub Actions and Azure DevOps.',
  },
  {
    icon: '🤖',
    title: 'AI-Powered Testing',
    description:
      'Smarter test coverage through AI-assisted generation, intelligent failure triage, and OpenAI / Claude integrations in your pipeline.',
  },
]

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Service pillars */}
      <section className="bg-background py-32">
        <div className="max-w-7xl mx-auto px-6">
          <p className="font-mono text-accent text-xs tracking-[0.25em] uppercase mb-4">
            What I do
          </p>
          <h2 className="font-display font-bold text-white text-4xl md:text-5xl mb-16 max-w-2xl">
            Quality baked in, not bolted on.
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
          <h2 className="font-display font-bold text-white text-4xl md:text-5xl mb-6">
            Interested in working together?
          </h2>
          <p className="text-text-muted text-xl mb-10">
            Let&apos;s talk about your product, your team, and how I can help you ship with confidence.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-accent text-background px-10 py-5 font-semibold text-lg hover:bg-accent-dim transition-colors"
          >
            Get in touch →
          </Link>
        </div>
      </section>
    </>
  )
}
