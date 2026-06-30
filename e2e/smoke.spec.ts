import { test, expect } from '@playwright/test'

test.describe('Navigation smoke tests', () => {
  test('home page loads with hero heading', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Testing at the')
    await expect(page.locator('text=CB Test Consultancy').first()).toBeVisible()
  })

  test('portfolio page shows client cards', async ({ page }) => {
    await page.goto('/portfolio')
    // h1 renders as "Clients & work"
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
    await expect(page.getByText('Welcome to the CB Test Consultancy Blog')).toBeVisible()
  })

  test('blog post page renders MDX content', async ({ page }) => {
    await page.goto('/blog/hello-world')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcome to the CB')
    // back link renders as "← All posts"
    await expect(page.getByRole('link', { name: /← all posts/i })).toBeVisible()
  })

  test('contact page shows heading and contact details', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.getByRole('heading', { level: 1 })).toContainText("Let's work together")
    await expect(page.getByText('chiel.bleumink@cbtestconsultancy.nl')).toBeVisible()
  })

  test('nav links navigate correctly', async ({ page }) => {
    await page.goto('/')
    await page.click('nav >> text=Portfolio')
    await expect(page).toHaveURL('/portfolio')
    await page.click('nav >> text=About')
    await expect(page).toHaveURL('/about')
    await page.click('nav >> text=Blog')
    await expect(page).toHaveURL('/blog')
    await page.click('nav >> text=Contact')
    await expect(page).toHaveURL('/contact')
  })
})
