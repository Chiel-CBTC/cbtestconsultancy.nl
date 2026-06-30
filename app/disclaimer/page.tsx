import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer en aansprakelijkheidsinformatie voor CB Test Consultancy.',
}

export default function DisclaimerPage() {
  return (
    <>
      <PageHeader title="Disclaimer" />
      <div className="bg-background pb-24">
        <div className="max-w-3xl mx-auto px-6 pt-16">
        <div className="flex flex-col gap-12 text-text-primary text-lg leading-relaxed">
          <section>
            <h2 className="font-display font-bold text-text-primary text-2xl mb-4">
              Aansprakelijkheid
            </h2>
            <p>
              CB Test Consultancy besteedt de grootst mogelijke zorg aan de betrouwbaarheid en
              actualiteit van de informatie op deze website. Onjuistheden kunnen echter voorkomen.
              CB Test Consultancy is niet aansprakelijk voor schade die ontstaat als gevolg van
              onjuistheid, onvolledigheid of onrechtmatigheid van de aangeboden informatie.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-text-primary text-2xl mb-4">
              Intellectueel eigendom
            </h2>
            <p>
              De inhoud van deze website — waaronder teksten, afbeeldingen en vormgeving — is
              eigendom van CB Test Consultancy, tenzij anders aangegeven. Niets van deze website
              mag worden verveelvoudigd, opgeslagen in een geautomatiseerd gegevensbestand of
              openbaar gemaakt zonder voorafgaande schriftelijke toestemming.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-text-primary text-2xl mb-4">
              Externe links
            </h2>
            <p>
              Deze website kan links bevatten naar externe websites. CB Test Consultancy is niet
              verantwoordelijk voor de inhoud van deze externe websites en aanvaardt geen
              aansprakelijkheid voor eventuele schade die voortvloeit uit het gebruik ervan.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-text-primary text-2xl mb-4">
              Wijzigingen
            </h2>
            <p>
              CB Test Consultancy behoudt zich het recht voor de inhoud van deze website op elk
              moment te wijzigen zonder voorafgaande aankondiging. Het verdient aanbeveling
              periodiek te controleren of de op deze website aangeboden informatie, inclusief
              deze disclaimer, is gewijzigd.
            </p>
          </section>
        </div>
        </div>
      </div>
    </>
  )
}
