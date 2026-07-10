import { test, expect } from '@playwright/test'

test.describe('Blog', () => {
  test('blog card title links to correct post', async ({ page }) => {
    await page.goto('/blog')
    const link = page.getByRole('link', { name: /A Smart Job Alert System with N8N and AI/i })
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('href', '/blog/a-smart-job-alert-system-with-n8n-and-ai')
  })

  test('blog card shows excerpt and reading time', async ({ page }) => {
    await page.goto('/blog')
    await expect(page.getByText(/Automating my job search/i)).toBeVisible()
    await expect(page.locator('text=/\\d+ min read/').first()).toBeVisible()
  })

  test('blog post page renders MDX content and back link', async ({ page }) => {
    await page.goto('/blog/a-smart-job-alert-system-with-n8n-and-ai')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('A Smart Job Alert System')
    await expect(page.getByRole('link', { name: /← all posts/i })).toBeVisible()
  })
})
