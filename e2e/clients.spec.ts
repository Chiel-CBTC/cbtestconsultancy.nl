import { test, expect } from '@playwright/test'

test.describe('Clients page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/clients')
  })

  test('shows all six client cards', async ({ page }) => {
    const clients = ['Zwijsen', 'Rabobank', 'TenneT', 'Action', 'Europarcs', 'Provincie Gelderland']
    for (const client of clients) {
      await expect(page.getByRole('heading', { name: client })).toBeVisible()
    }
  })

  test('shows sector badges', async ({ page }) => {
    await expect(page.getByText('Finance', { exact: true })).toBeVisible()
    await expect(page.getByText('Energy', { exact: true })).toBeVisible()
    await expect(page.getByText('Retail', { exact: true })).toBeVisible()
    await expect(page.getByText('Government', { exact: true })).toBeVisible()
    await expect(page.getByText('Education', { exact: true })).toBeVisible()
  })

  test('Rabobank card shows blurb and tags', async ({ page }) => {
    await expect(page.getByText(/test strategy and execution/i)).toBeVisible()
    await expect(page.getByText('Selenium').first()).toBeVisible()
    await expect(page.getByText('Performance Testing')).toBeVisible()
  })

  test('Provincie Gelderland card mentions DevOps transition', async ({ page }) => {
    await expect(page.getByText(/QA lead within government development teams/i)).toBeVisible()
  })
})
