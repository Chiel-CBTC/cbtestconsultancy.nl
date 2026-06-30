import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Chiel Bleumink — QA consultant based in Arnhem, Netherlands.',
}

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-24 items-start">
          {/* Left: contact info */}
          <div>
            <h1 className="font-display font-bold text-text-primary text-5xl md:text-6xl mb-16 text-balance">
              Let&apos;s work together.
            </h1>

            <div className="flex flex-col gap-10">
              <div>
                <p className="font-mono text-accent text-xs tracking-widest uppercase mb-4">Direct contact</p>
                <div className="flex flex-col gap-3 text-text-primary text-lg">
                  <a href="mailto:chiel.bleumink@cbtestconsultancy.nl" className="hover:text-accent transition-colors">
                    chiel.bleumink@cbtestconsultancy.nl
                  </a>
                  <a href="tel:+31646270584" className="hover:text-accent transition-colors">
                    +31 (0)6 46 27 05 84
                  </a>
                </div>
              </div>

              <div>
                <p className="font-mono text-accent text-xs tracking-widest uppercase mb-4">Location</p>
                <p className="text-text-primary text-lg">Arnhem, Netherlands</p>
              </div>

              <div>
                <p className="font-mono text-accent text-xs tracking-widest uppercase mb-4">Business</p>
                <p className="text-text-primary text-lg">KvK 09217715</p>
              </div>
            </div>
          </div>

          {/* Right: availability card */}
          <div className="hidden md:flex flex-col gap-8 pt-4">
            <div className="bg-surface border border-surface p-10 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-accent inline-block" />
                <span className="font-mono text-accent text-xs tracking-widest uppercase">Available for projects</span>
              </div>
              <p className="text-text-primary text-xl leading-relaxed">
                Open to new assignments — QA consulting, Playwright automation, and AI-powered testing integrations.
              </p>
              <p className="text-text-muted leading-relaxed">
                Typically work as an embedded QA engineer or external consultant. Both short engagements and longer-term partnerships.
              </p>
            </div>

            <div className="border-t border-surface pt-8">
              <p className="font-mono text-accent text-xs tracking-widest uppercase mb-4">Response time</p>
              <p className="text-text-muted">Usually within one business day.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
