import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'CB Test Consultancy — QA & Test Automation',
    template: '%s | CB Test Consultancy',
  },
  description:
    '17+ years of QA experience. Playwright test automation, AI-powered testing, and Agile QA consulting. Based in Arnhem, Netherlands.',
  keywords: ['QA consultant', 'test automation', 'Playwright', 'AI testing', 'Agile QA', 'Netherlands'],
  openGraph: {
    siteName: 'CB Test Consultancy',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-text-primary min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
