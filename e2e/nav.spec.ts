import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('logo image is visible with correct alt text', async ({ page }) => {
    await expect(page.getByAltText('CB Test Consultancy')).toBeVisible()
  })

  test('all five nav links are present', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: 'Primary' })
    await expect(nav.getByRole('link', { name: 'Home' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Portfolio' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'About' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Blog' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Contact' })).toBeVisible()
  })

  test('active link highlights current page and sets aria-current', async ({ page }) => {
    await page.goto('/portfolio')
    const nav = page.getByRole('navigation', { name: 'Primary' })
    const portfolioLink = nav.getByRole('link', { name: 'Portfolio' })
    await expect(portfolioLink).toHaveClass(/text-accent/)
    await expect(portfolioLink).toHaveAttribute('aria-current', 'page')
  })

  test('header and footer navigation landmarks have distinct accessible names', async ({ page }) => {
    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible()
    await expect(page.getByRole('navigation', { name: 'Footer' })).toBeVisible()
  })
})

test.describe('Mobile navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('desktop link list stays hidden behind a menu toggle', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: 'Primary' })
    await expect(page.getByRole('button', { name: 'Menu' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Portfolio' })).toBeHidden()
  })

  test('opening the menu reveals all links and marks the toggle expanded', async ({ page }) => {
    const toggle = page.getByRole('button', { name: 'Menu' })
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    const dialog = page.getByRole('dialog')
    for (const label of ['Home', 'Portfolio', 'About', 'Blog', 'Contact']) {
      await expect(dialog.getByRole('link', { name: label })).toBeVisible()
    }
  })

  test('menu toggle meets minimum touch target size', async ({ page }) => {
    const box = await page.getByRole('button', { name: 'Menu' }).boundingBox()
    expect(box?.width).toBeGreaterThanOrEqual(44)
    expect(box?.height).toBeGreaterThanOrEqual(44)
  })

  test('Escape closes the menu and returns focus to the toggle', async ({ page }) => {
    const toggle = page.getByRole('button', { name: 'Menu' })
    await toggle.click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).toBeHidden()
    await expect(toggle).toBeFocused()
  })

  test('clicking a link closes the menu and navigates', async ({ page }) => {
    const toggle = page.getByRole('button', { name: 'Menu' })
    await toggle.click()
    await page.getByRole('dialog').getByRole('link', { name: 'Portfolio' }).click()
    await expect(page).toHaveURL(/\/portfolio$/)
    await expect(page.getByRole('dialog')).toBeHidden()
  })

  test('active page is marked aria-current inside the mobile menu', async ({ page }) => {
    await page.goto('/portfolio')
    await page.getByRole('button', { name: 'Menu' }).click()
    const activeLink = page.getByRole('dialog').getByRole('link', { name: 'Portfolio' })
    await expect(activeLink).toHaveAttribute('aria-current', 'page')
  })
})
