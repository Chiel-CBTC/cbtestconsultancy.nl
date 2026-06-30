import type { Metadata } from 'next'
import PortfolioCard from '@/components/PortfolioCard'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'QA consulting work for Rabobank, TenneT, Action, and more.',
}

const clients = [
  {
    client: 'Rabobank',
    sector: 'Finance',
    blurb:
      'Built and maintained a Playwright test suite for the online banking portal, reducing regression cycles from 3 days to 4 hours. Introduced shift-left testing practices across three scrum teams.',
    tags: ['Playwright', 'TypeScript', 'Azure DevOps', 'ISTQB'],
  },
  {
    client: 'TenneT',
    sector: 'Energy',
    blurb:
      'Established an end-to-end automated testing strategy for grid management software. Coached internal QA engineers in modern test automation principles.',
    tags: ['Playwright', 'GitHub Actions', 'Test Strategy'],
  },
  {
    client: 'Action',
    sector: 'Retail',
    blurb:
      'Delivered API and UI test coverage for the e-commerce platform during peak-season deployments. Integrated test reporting into the CI/CD pipeline.',
    tags: ['API Testing', 'Postman', 'CI/CD'],
  },
  {
    client: 'Europarcs',
    sector: 'Hospitality',
    blurb:
      'Tested and validated the booking flow across web and iOS/Android apps, ensuring a consistent guest experience across all channels.',
    tags: ['Mobile Testing', 'iOS', 'Android', 'Playwright'],
  },
  {
    client: 'Gadero',
    sector: 'E-commerce',
    blurb:
      'Set up automated regression coverage for the product catalog and checkout flow, enabling weekly releases with confidence.',
    tags: ['Playwright', 'TypeScript', 'GitHub Actions'],
  },
  {
    client: 'Provincie Gelderland',
    sector: 'Government',
    blurb:
      'Coordinated QA across UX, development, and business stakeholders for citizen-facing web applications. Ensured WCAG accessibility compliance.',
    tags: ['Accessibility', 'Test Strategy', 'Stakeholder Coordination'],
  },
]

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        title="Clients & work"
        subtitle="Over the years I've helped businesses in finance, retail, energy, and government ship flawless digital products."
      />
      <div className="bg-background pb-24">
        <div className="max-w-7xl mx-auto px-6 pt-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((c) => (
            <PortfolioCard key={c.client} {...c} />
          ))}
        </div>
        </div>
      </div>
    </>
  )
}
