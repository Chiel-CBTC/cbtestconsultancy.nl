import { test, expect } from '@playwright/test'

test.describe('Blog', () => {
  test('blog card title links to correct post', async ({ page }) => {
    await page.goto('/blog')
    const link = page.getByRole('link', { name: /Welcome to the CB Test Consultancy Blog/i })
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('href', '/blog/hello-world')
  })

  test('blog card shows excerpt and reading time', async ({ page }) => {
    await page.goto('/blog')
    await expect(page.getByText(/Quality assurance insights/i)).toBeVisible()
    await expect(page.locator('text=/\\d+ min read/')).toBeVisible()
  })

  test('blog post page renders MDX content and back link', async ({ page }) => {
    await page.goto('/blog/hello-world')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcome to the CB')
    await expect(page.getByRole('link', { name: /← all posts/i })).toBeVisible()
  })
})
