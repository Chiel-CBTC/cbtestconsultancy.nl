import { test, expect } from '@playwright/test'

test.describe('Portfolio page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portfolio')
  })

  test('shows all six client cards', async ({ page }) => {
    const clients = ['Rabobank', 'TenneT', 'Action', 'Europarcs', 'Gadero', 'Provincie Gelderland']
    for (const client of clients) {
      await expect(page.getByRole('heading', { name: client })).toBeVisible()
    }
  })

  test('shows sector badges', async ({ page }) => {
    await expect(page.getByText('Finance')).toBeVisible()
    await expect(page.getByText('Energy')).toBeVisible()
    await expect(page.getByText('Retail')).toBeVisible()
    await expect(page.getByText('Government')).toBeVisible()
  })

  test('Rabobank card shows blurb and tags', async ({ page }) => {
    await expect(page.getByText(/reducing regression cycles/i)).toBeVisible()
    await expect(page.getByText('Playwright').first()).toBeVisible()
    await expect(page.getByText('Azure DevOps')).toBeVisible()
  })

  test('Provincie Gelderland card mentions accessibility', async ({ page }) => {
    await expect(page.getByText(/WCAG accessibility/i)).toBeVisible()
  })
})
