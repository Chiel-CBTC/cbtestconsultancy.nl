import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer and liability information for CB Test Consultancy.',
}

export default function DisclaimerPage() {
  return (
    <>
      <PageHeader title="Disclaimer" />
      <div className="bg-background pb-24">
        <div className="max-w-3xl mx-auto px-6 pt-8 md:pt-16">
        <div className="flex flex-col gap-12 text-text-primary text-lg leading-relaxed">
          <section>
            <h2 className="font-display font-bold text-text-primary text-2xl mb-4">
              Liability
            </h2>
            <p>
              CB Test Consultancy takes the utmost care to ensure the reliability and accuracy of
              the information on this website. However, inaccuracies may occur. CB Test Consultancy
              accepts no liability for any damage resulting from inaccurate, incomplete or unlawful
              information on this website.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-text-primary text-2xl mb-4">
              Intellectual property
            </h2>
            <p>
              All content on this website — including texts, images and design — is the property of
              CB Test Consultancy, unless stated otherwise. Nothing on this website may be
              reproduced, stored in an automated data system or made public without prior written
              permission.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-text-primary text-2xl mb-4">
              External links
            </h2>
            <p>
              This website may contain links to external websites. CB Test Consultancy is not
              responsible for the content of these external websites and accepts no liability for
              any damage arising from their use.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-text-primary text-2xl mb-4">
              Changes
            </h2>
            <p>
              CB Test Consultancy reserves the right to modify the content of this website at any
              time without prior notice. We recommend checking periodically whether the information
              on this website, including this disclaimer, has been updated.
            </p>
          </section>
        </div>
        </div>
      </div>
    </>
  )
}
