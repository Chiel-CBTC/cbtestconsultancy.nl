import { render, screen } from '@testing-library/react'
import BlogPostCard from '@/components/BlogPostCard'

const props = {
  slug: 'hello-world',
  title: 'Hello World',
  date: '2026-06-30',
  excerpt: 'A short excerpt.',
  readingTime: '2 min read',
}

describe('BlogPostCard', () => {
  it('renders title as a link to the post', () => {
    render(<BlogPostCard {...props} />)
    const link = screen.getByRole('link', { name: /hello world/i })
    expect(link).toHaveAttribute('href', '/blog/hello-world')
  })

  it('renders excerpt and reading time', () => {
    render(<BlogPostCard {...props} />)
    expect(screen.getByText('A short excerpt.')).toBeInTheDocument()
    expect(screen.getByText('2 min read')).toBeInTheDocument()
  })
})
