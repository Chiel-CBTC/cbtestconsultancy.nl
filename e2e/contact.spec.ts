import { test, expect } from '@playwright/test'

test.describe('Contact page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact')
  })

  test('shows heading', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText("Let's work together")
  })

  test('shows email and phone links', async ({ page }) => {
    await expect(page.getByRole('link', { name: /chiel.bleumink@cbtestconsultancy.nl/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /\+31/ })).toBeVisible()
  })

  test('shows location and KvK number', async ({ page }) => {
    await expect(page.getByText('Arnhem, Netherlands')).toBeVisible()
    await expect(page.getByText('KvK 09217715')).toBeVisible()
  })

  test('shows availability card', async ({ page }) => {
    await expect(page.getByText(/Available for projects/i)).toBeVisible()
    await expect(page.getByText(/Open to new assignments/i)).toBeVisible()
  })
})
