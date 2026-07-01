import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('logo image is visible with correct alt text', async ({ page }) => {
    await expect(page.getByAltText('CB Test Consultancy')).toBeVisible()
  })

  test('all five nav links are present', async ({ page }) => {
    const nav = page.locator('header nav')
    await expect(nav.getByRole('link', { name: 'Home' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Portfolio' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'About' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Blog' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Contact' }).first()).toBeVisible()
  })

  test('active link highlights current page', async ({ page }) => {
    await page.goto('/portfolio')
    const nav = page.locator('header nav')
    const portfolioLink = nav.getByRole('link', { name: 'Portfolio' })
    await expect(portfolioLink).toHaveClass(/text-accent/)
  })
})
