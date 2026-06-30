import type { ReactNode } from 'react'

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="bg-surface border border-surface hover:border-accent transition-colors p-8 flex flex-col gap-4 group">
      <div className="text-accent">{icon}</div>
      <h3 className="font-display font-bold text-text-primary text-xl group-hover:text-accent transition-colors">
        {title}
      </h3>
      <p className="text-text-muted leading-relaxed">{description}</p>
    </div>
  )
}
