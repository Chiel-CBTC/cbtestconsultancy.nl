import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import BlogPostCard from '@/components/BlogPostCard'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'QA insights, Playwright patterns, and AI automation from Chiel Bleumink.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      <PageHeader title="Thoughts on QA" subtitle="QA insights, Playwright patterns, and AI automation." />
      <div className="bg-background pb-24">
        <div className="max-w-7xl mx-auto px-6 pt-16">
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
    </>
  )
}
