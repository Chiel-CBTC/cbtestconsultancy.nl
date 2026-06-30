import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as fs from 'fs'

vi.mock('fs', () => {
  const readdirSync = vi.fn()
  const readFileSync = vi.fn()
  const existsSync = vi.fn()
  return {
    default: { readdirSync, readFileSync, existsSync },
    readdirSync,
    readFileSync,
    existsSync,
  }
})

const mockMdx = `---
title: "Test Post"
date: "2026-01-15"
excerpt: "A test post."
tags: ["testing"]
---

This is the body of the post. It has some words in it for reading time calculation.
`

describe('getAllPosts', () => {
  beforeEach(() => {
    vi.mocked(fs.readdirSync).mockReturnValue(['test-post.mdx'] as unknown as fs.Dirent[])
    vi.mocked(fs.readFileSync).mockReturnValue(mockMdx)
  })

  it('returns posts sorted newest-first', async () => {
    const { getAllPosts } = await import('@/lib/blog')
    const posts = getAllPosts()
    expect(posts).toHaveLength(1)
    expect(posts[0].slug).toBe('test-post')
    expect(posts[0].title).toBe('Test Post')
    expect(posts[0].date).toBe('2026-01-15')
    expect(posts[0].excerpt).toBe('A test post.')
    expect(posts[0].tags).toEqual(['testing'])
    expect(posts[0].readingTime).toMatch(/\d+ min read/)
  })
})

describe('getPostBySlug', () => {
  beforeEach(() => {
    vi.mocked(fs.existsSync).mockReturnValue(true)
    vi.mocked(fs.readFileSync).mockReturnValue(mockMdx)
  })

  it('returns null for missing slug', async () => {
    vi.mocked(fs.existsSync).mockReturnValue(false)
    const { getPostBySlug } = await import('@/lib/blog')
    expect(getPostBySlug('does-not-exist')).toBeNull()
  })

  it('returns post with source content', async () => {
    const { getPostBySlug } = await import('@/lib/blog')
    const post = getPostBySlug('test-post')
    expect(post).not.toBeNull()
    expect(post!.source).toContain('body of the post')
    expect(post!.source).not.toContain('title:')
  })
})
