import type { Metadata } from 'next'

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
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <p className="font-mono text-accent text-xs tracking-[0.25em] uppercase mb-4">
          About
        </p>
        <h1 className="font-display font-bold text-white text-5xl md:text-6xl mb-20 max-w-xl">
          Chiel Bleumink
        </h1>

        <div className="grid md:grid-cols-2 gap-20 items-start">
          {/* Photo column */}
          <div className="flex flex-col gap-8">
            <div className="aspect-square bg-surface border border-surface flex items-center justify-center max-w-sm">
              {/* Replace with: <Image src="/images/chiel.jpg" alt="Chiel Bleumink" fill className="object-cover" /> */}
              <div className="flex flex-col items-center gap-4 text-text-muted">
                <div className="w-24 h-24 rounded-full border-2 border-accent opacity-30" />
                <span className="font-mono text-xs tracking-widest">Photo coming soon</span>
              </div>
            </div>

            {/* Certs */}
            <div>
              <p className="font-mono text-accent text-xs tracking-widest uppercase mb-4">
                Certifications
              </p>
              <div className="flex flex-wrap gap-3">
                {certs.map(({ name, abbr }) => (
                  <div
                    key={abbr}
                    title={name}
                    className="border border-accent text-accent font-mono text-sm px-4 py-2 hover:bg-accent hover:text-background transition-colors cursor-default"
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
                I&apos;m a senior QA consultant based in Arnhem, Netherlands, with 17+ years of
                experience across finance, retail, energy, and government sectors.
              </p>
              <p>
                I specialize in Playwright-based test automation, helping teams move from
                manual regression cycles to fast, reliable CI/CD pipelines. I work hands-on
                with developers, UX designers, and business stakeholders to make quality
                everyone&apos;s responsibility.
              </p>
              <p>
                More recently I&apos;ve been integrating AI — Claude, GitHub Copilot, OpenCode —
                into testing workflows to generate smarter test cases, triage failures faster,
                and reduce maintenance overhead.
              </p>
              <p>
                I hold an ISTQB Foundation certification and a PSM1 Scrum Master credential,
                and studied Technical Computer Science (HTS).
              </p>
            </div>

            {/* Skills */}
            <div>
              <p className="font-mono text-accent text-xs tracking-widest uppercase mb-6">
                Skills &amp; tooling
              </p>
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
              <p className="font-mono text-accent text-xs tracking-widest uppercase mb-4">
                Education
              </p>
              <p className="text-text-muted">HTS Technical Computer Science</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
