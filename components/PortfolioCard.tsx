interface PortfolioCardProps {
  client: string
  sector: string
  blurb: string
  tags: string[]
}

export default function PortfolioCard({ client, sector, blurb, tags }: PortfolioCardProps) {
  return (
    <div className="bg-surface border border-surface hover:border-accent transition-colors p-8 flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display font-bold text-white text-xl">{client}</h3>
        <span className="text-xs font-mono tracking-widest uppercase text-accent border border-accent px-2 py-1 whitespace-nowrap">
          {sector}
        </span>
      </div>
      <p className="text-text-muted leading-relaxed flex-1">{blurb}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono text-text-muted bg-background border border-surface px-2 py-1"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
