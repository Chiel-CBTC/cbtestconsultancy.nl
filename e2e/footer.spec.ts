import { test, expect } from '@playwright/test'

test.describe('Footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('shows brand name and KvK number', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer.getByText(/CB Test Consultancy/i)).toBeVisible()
    await expect(footer.getByText(/09217715/)).toBeVisible()
  })

  test('disclaimer link navigates to disclaimer page', async ({ page }) => {
    const footer = page.locator('footer')
    await footer.getByRole('link', { name: /disclaimer/i }).click()
    await expect(page).toHaveURL('/disclaimer')
  })
})
