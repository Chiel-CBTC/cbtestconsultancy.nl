import Link from 'next/link'

interface BlogPostCardProps {
  slug: string
  title: string
  date: string
  excerpt: string
  readingTime: string
}

export default function BlogPostCard({ slug, title, date, excerpt, readingTime }: BlogPostCardProps) {
  const formatted = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <article className="border-b border-surface py-10 group">
      <div className="flex items-center gap-4 text-text-muted text-sm mb-4">
        <time dateTime={date}>{formatted}</time>
        <span>·</span>
        <span>{readingTime}</span>
      </div>
      <h2 className="font-display font-bold text-text-primary text-2xl mb-3 group-hover:text-accent transition-colors">
        <Link href={`/blog/${slug}`}>{title}</Link>
      </h2>
      <p className="text-text-muted leading-relaxed mb-4">{excerpt}</p>
      <Link
        href={`/blog/${slug}`}
        className="text-accent text-sm font-medium hover:text-accent-dim transition-colors"
      >
        Read post →
      </Link>
    </article>
  )
}
