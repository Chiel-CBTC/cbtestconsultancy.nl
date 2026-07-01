import { test, expect } from '@playwright/test'

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test.describe('Hero', () => {
    test('shows h1 heading and CTA buttons', async ({ page }) => {
      await expect(page.getByRole('heading', { level: 1 })).toContainText('Testing at the')
      await expect(page.getByRole('link', { name: /let's talk/i })).toBeVisible()
      await expect(page.getByRole('link', { name: /view work/i })).toBeVisible()
    })
  })

  test.describe('ServiceCard', () => {
    test('renders all three service cards', async ({ page }) => {
      await expect(page.getByRole('heading', { name: /Agile \/ Scrum \/ DevOps QA/i })).toBeVisible()
      await expect(page.getByRole('heading', { name: /Playwright Test Automation/i })).toBeVisible()
      await expect(page.getByRole('heading', { name: /AI-Powered Testing/i })).toBeVisible()
    })

    test('each service card shows a description', async ({ page }) => {
      await expect(page.getByText(/Embedded quality in every sprint/i)).toBeVisible()
      await expect(page.getByText(/Modern, maintainable test suites/i)).toBeVisible()
      await expect(page.getByText(/Smarter test coverage through AI/i)).toBeVisible()
    })
  })

  test.describe('ClientLogoStrip', () => {
    test('shows all six client names', async ({ page }) => {
      await expect(page.getByRole('link', { name: 'Rabobank' })).toBeVisible()
      await expect(page.getByRole('link', { name: 'TenneT' })).toBeVisible()
      await expect(page.getByRole('link', { name: 'Action' })).toBeVisible()
      await expect(page.getByRole('link', { name: 'Europarcs' })).toBeVisible()
      await expect(page.getByRole('link', { name: 'Gadero' })).toBeVisible()
      await expect(page.getByRole('link', { name: 'Provincie Gelderland' })).toBeVisible()
    })
  })

  test.describe('CTA section', () => {
    test('shows call-to-action with link to contact', async ({ page }) => {
      await expect(page.getByText(/Interested in working together/i)).toBeVisible()
      const cta = page.getByRole('link', { name: /Get in touch/i })
      await expect(cta).toBeVisible()
      await expect(cta).toHaveAttribute('href', '/contact')
    })
  })
})
