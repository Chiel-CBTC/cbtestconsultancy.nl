import type { ReactNode } from 'react'

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="bg-surface border border-surface p-8 flex flex-col gap-4">
      <div className="text-accent">{icon}</div>
      <h3 className="font-display font-bold text-text-primary text-xl">
        {title}
      </h3>
      <p className="text-text-muted leading-relaxed">{description}</p>
    </div>
  )
}
