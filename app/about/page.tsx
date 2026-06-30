import type { Metadata } from 'next'
import Image from 'next/image'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Chiel Bleumink — senior QA consultant with 17+ years in finance, retail, energy, and government.',
}

const skills = [
  'Playwright', 'TypeScript', 'GitHub Actions', 'Azure DevOps',
  'Postman', 'GraphQL / Apollo', 'iOS Testing', 'Android Testing',
  'AI / Claude Integration', 'Scrum / Agile', 'DevOps', 'CI/CD',
]

const certs = [
  { name: 'ISTQB Foundation', abbr: 'ISTQB' },
  { name: 'Professional Scrum Master 1', abbr: 'PSM1' },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader title="Chiel Bleumink" subtitle="Senior QA Consultant" />
      <div className="bg-background pb-24">
        <div className="max-w-7xl mx-auto px-6 pt-8 md:pt-16">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Photo column */}
          <div className="flex flex-col gap-8">
            <div className="relative aspect-[3/4] max-w-sm overflow-hidden bg-surface">
              <Image src="/images/chiel.jpg" alt="Chiel Bleumink" fill className="object-contain object-top" />
            </div>

            {/* Certs */}
            <div>
              <p className="font-mono text-accent text-xs tracking-widest uppercase mb-4">Certifications</p>
              <div className="flex flex-wrap gap-3">
                {certs.map(({ name, abbr }) => (
                  <div
                    key={abbr}
                    title={name}
                    className="border border-accent text-accent font-mono text-sm px-4 py-2 hover:bg-accent hover:text-white transition-colors cursor-default"
                  >
                    {abbr}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bio + skills column */}
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-5 text-text-primary text-lg leading-relaxed">
              <p>
                I&apos;m a senior Quality Assurance consultant based in Arnhem, Netherlands, with 17+ years of
                experience helping organizations deliver quality digital products across finance,
                retail, energy, and government sectors.
              </p>
              <p>
                I specialize in Playwright and TypeScript-based test automation, helping teams
                move from manual regression cycles to fast, reliable CI/CD pipelines. Beyond
                the technical work, I develop test strategies for complex initiatives, support
                DevOps transitions, and coordinate across developers, UX designers, and business
                stakeholders — building trust through communication and partnership.
              </p>
              <p>
                More recently I&apos;ve been integrating AI into testing workflows to generate
                smarter test cases, triage failures faster, and reduce maintenance overhead.
              </p>
              <p>
                I hold an ISTQB Foundation certification and a PSM1 Scrum Master credential,
                and studied Technical Computer Science (HTS).
              </p>
            </div>

            {/* Skills */}
            <div>
              <p className="font-mono text-accent text-xs tracking-widest uppercase mb-6">Skills &amp; tooling</p>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm font-mono text-text-muted bg-surface border border-surface px-3 py-2 hover:border-accent hover:text-accent transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <p className="font-mono text-accent text-xs tracking-widest uppercase mb-4">Education</p>
              <p className="text-text-muted">HTS Technical Computer Science</p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  )
}
