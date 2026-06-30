import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import BlogPostCard from '@/components/BlogPostCard'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'QA insights, Playwright patterns, and AI testing strategies from Chiel Bleumink.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="font-display font-bold text-text-primary text-5xl md:text-6xl mb-16 text-balance">
          Thoughts on QA
        </h1>

        {posts.length === 0 ? (
          <p className="text-text-muted text-xl">Posts coming soon.</p>
        ) : (
          <div>
            {posts.map((post) => (
              <BlogPostCard key={post.slug} {...post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
