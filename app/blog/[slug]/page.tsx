import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
import { getAllPosts, getPostBySlug } from '@/lib/blog'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const formatted = new Date(post.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <Link
          href="/blog"
          className="text-text-muted text-sm font-mono hover:text-accent transition-colors mb-12 inline-block"
        >
          ← All posts
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-4 text-text-muted text-sm mb-6">
            <time dateTime={post.date}>{formatted}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="font-display font-bold text-text-primary text-4xl md:text-5xl leading-tight">
            {post.title}
          </h1>
        </header>

        <div className="prose-dark">
          <MDXRemote
            source={post.source}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  [rehypePrettyCode, { theme: 'github-dark-dimmed' }],
                ],
              },
            }}
          />
        </div>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-12">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono text-text-muted bg-surface border border-surface px-3 py-1"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
