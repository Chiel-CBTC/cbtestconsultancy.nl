import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import PulsingDot from '@/components/PulsingDot'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Chiel Bleumink — QA consultant based in Arnhem, Netherlands.',
}

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Let's work together" />
      <div className="bg-background pb-24">
        <div className="max-w-7xl mx-auto px-6 pt-8 md:pt-16">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-start">
          {/* Left: contact info */}
          <div>

            <div className="flex flex-col gap-10">
              <div>
                <p className="font-display font-bold text-text-primary text-sm mb-4">Direct contact</p>
                <div className="flex flex-col gap-3 text-text-primary text-lg">
                  <a href="mailto:chiel@cbtestconsultancy.nl" className="hover:text-accent transition-colors">
                    chiel@cbtestconsultancy.nl
                  </a>
                  <a href="tel:+31646270584" className="hover:text-accent transition-colors">
                    +31 (0)6 46 27 05 84
                  </a>
                </div>
              </div>

              <div>
                <p className="font-display font-bold text-text-primary text-sm mb-4">Location</p>
                <p className="text-text-primary text-lg">Arnhem, Netherlands</p>
              </div>

              <div>
                <p className="font-display font-bold text-text-primary text-sm mb-4">Business</p>
                <p className="text-text-primary text-lg">KvK 09217715</p>
              </div>
            </div>
          </div>

          {/* Right: availability card */}
          <div className="flex flex-col gap-8 pt-8 md:pt-4">
            <div className="bg-surface border border-surface p-10 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <PulsingDot />
                <p className="font-display font-semibold text-text-primary text-sm">Currently on assignment</p>
              </div>
              <p className="text-text-primary text-xl leading-relaxed">
                Available for small, focused engagements.
              </p>
              <p className="text-text-muted leading-relaxed">
                Think of short audits, automation kickstarts or second opinions.
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  )
}
