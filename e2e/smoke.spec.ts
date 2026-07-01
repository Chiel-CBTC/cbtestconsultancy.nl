import { test, expect } from '@playwright/test'

test.describe('Navigation smoke tests', () => {
  test('home page loads with hero heading', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Testing at the')
    await expect(page.locator('text=CB Test Consultancy').first()).toBeVisible()
  })

  test('clients page shows client cards', async ({ page }) => {
    await page.goto('/clients')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Clients')
    await expect(page.getByText('Rabobank')).toBeVisible()
    await expect(page.getByText('TenneT')).toBeVisible()
  })

  test('about page shows Chiel Bleumink', async ({ page }) => {
    await page.goto('/about')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Chiel Bleumink')
    await expect(page.getByText('ISTQB', { exact: true })).toBeVisible()
    await expect(page.getByText('PSM1', { exact: true })).toBeVisible()
  })

  test('blog page lists posts', async ({ page }) => {
    await page.goto('/blog')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Thoughts on QA')
    await expect(page.getByText('A Smart Job Alert System with N8N and AI')).toBeVisible()
  })

  test('blog post page renders MDX content', async ({ page }) => {
    await page.goto('/blog/a-smart-job-alert-system-with-n8n-and-ai')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('A Smart Job Alert System')
    // back link renders as "← All posts"
    await expect(page.getByRole('link', { name: /← all posts/i })).toBeVisible()
  })

  test('contact page shows heading and contact details', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.getByRole('heading', { level: 1 })).toContainText("Let's work together")
    await expect(page.getByText('chiel@cbtestconsultancy.nl')).toBeVisible()
  })

  test('nav links navigate correctly', async ({ page }) => {
    await page.goto('/')
    await page.click('nav >> text=Clients')
    await expect(page).toHaveURL('/clients')
    await page.click('nav >> text=About')
    await expect(page).toHaveURL('/about')
    await page.click('nav >> text=Blog')
    await expect(page).toHaveURL('/blog')
    await page.click('nav >> text=Contact')
    await expect(page).toHaveURL('/contact')
  })
})
