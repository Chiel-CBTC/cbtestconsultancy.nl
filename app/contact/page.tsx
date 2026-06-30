import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Chiel Bleumink — QA consultant based in Arnhem, Netherlands.',
}

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <p className="font-mono text-accent text-xs tracking-[0.25em] uppercase mb-4">
          Contact
        </p>
        <h1 className="font-display font-bold text-white text-5xl md:text-6xl mb-20 max-w-xl">
          Let&apos;s work together.
        </h1>

        <div className="grid md:grid-cols-2 gap-20">
          {/* Contact details */}
          <div className="flex flex-col gap-10">
            <div>
              <p className="font-mono text-accent text-xs tracking-widest uppercase mb-4">
                Direct contact
              </p>
              <div className="flex flex-col gap-4 text-text-primary">
                <a
                  href="mailto:chiel.bleumink@cbtestconsultancy.nl"
                  className="hover:text-accent transition-colors"
                >
                  chiel.bleumink@cbtestconsultancy.nl
                </a>
                <a href="tel:+31646270584" className="hover:text-accent transition-colors">
                  +31 (0)6 46 27 05 84
                </a>
              </div>
            </div>

            <div>
              <p className="font-mono text-accent text-xs tracking-widest uppercase mb-4">
                Location
              </p>
              <p className="text-text-muted">Arnhem, Netherlands</p>
            </div>

            <div>
              <p className="font-mono text-accent text-xs tracking-widest uppercase mb-4">
                Business
              </p>
              <p className="text-text-muted">KvK 09217715</p>
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
