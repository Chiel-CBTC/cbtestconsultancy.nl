import type { Metadata } from 'next'
import PortfolioCard from '@/components/PortfolioCard'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'QA consulting work for Rabobank, TenneT, Action, and more.',
}

const clients = [
  {
    client: 'Action',
    url: 'https://www.action.com',
    sector: 'Retail',
    blurb:
      'QA specialist across multiple dev teams for web and iOS/Android, covering CMS migrations, conversion optimisations and loyalty features. Delivered Playwright/TypeScript automation and K6 performance scripts with AI tooling integrated throughout.',
    tags: ['Playwright', 'TypeScript', 'K6', 'iOS & Android', 'AI Testing'],
  },
  {
    client: 'Europarcs',
    url: 'https://www.europarcs.nl',
    sector: 'Hospitality',
    blurb:
      'Led QA for a Microsoft Dynamics CRM rollout covering system and acceptance tests, exploratory testing and CodeceptJS/Playwright automation. Set up Azure DevOps CI/CD pipelines for daily regression runs with Testomat.io reporting.',
    tags: ['Playwright', 'CodeceptJS', 'Azure DevOps', 'MS Dynamics', 'CI/CD'],
  },
  {
    client: 'Gadero',
    url: 'https://www.gadero.nl',
    sector: 'E-commerce',
    blurb:
      'Built a Playwright automation framework for the renewed website using the Page Object Model, and configured Checkly for continuous availability monitoring. Enabled the test team to work independently from day one.',
    tags: ['Playwright', 'JavaScript', 'Page Object Model', 'Checkly', 'Vercel'],
  },
  {
    client: 'TenneT',
    url: 'https://www.tennet.eu',
    sector: 'Energy',
    blurb:
      'QA lead for system and chain testing of the Delphi-based platform handling market and asset data. Built a FitNesse automation framework with custom Java fixtures and contributed to the SCRUM/DevOps transition.',
    tags: ['FitNesse', 'Java', 'SQL', 'SOAP/XML', 'DevOps'],
  },
  {
    client: 'Rabobank',
    url: 'https://www.rabobank.nl',
    sector: 'Finance',
    blurb:
      'QA specialist within banking development teams, responsible for test strategy and execution of system, chain, performance and security tests on Java applications. Set up and maintained FitNesse and Selenium automation frameworks, with an active role in DevOps transitions and release coordination.',
    tags: ['FitNesse', 'Selenium', 'Java', 'SQL', 'Performance Testing'],
  },
  {
    client: 'Provincie Gelderland',
    url: 'https://www.gelderland.nl',
    sector: 'Government',
    blurb:
      'QA lead within government development teams, coordinating and executing system, chain and performance tests across complex environments. Coached colleagues on quality and test automation, and played an active role in DevOps transitions.',
    tags: ['Test Strategy', 'QA Lead', 'Selenium', 'Java', 'DevOps'],
  },
]

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        title="Clients & work"
        subtitle="Over the years I supported finance, retail, energy and government teams shipping flawless digital products"
      />
      <div className="bg-background pb-24">
        <div className="max-w-7xl mx-auto px-6 pt-8 md:pt-16">
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
