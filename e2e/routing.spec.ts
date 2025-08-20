import { test, expect } from '@playwright/test'

test.describe('Hash-based routing', () => {
  test('loads iframe from hash on initial load', async ({ page }) => {
    await page.goto('/#/button-secondary.html')
    const iframe = page.locator('parts-kit').locator('iframe')
    await expect(iframe).toHaveAttribute('src', 'button-secondary.html')
    await expect(page).toHaveURL(/#\/button-secondary\.html$/)
  })

  test('clicking nav updates hash and iframe', async ({ page }) => {
    await page.goto('/')
    // Click Card in nav
    await page.getByRole('button', { name: 'Card' }).click()
    await expect(page).toHaveURL(/#\/card\.html$/)
    const iframe = page.locator('parts-kit').locator('iframe')
    await expect(iframe).toHaveAttribute('src', 'card.html')
  })

  test('back/forward navigation via hashchange', async ({ page }) => {
    await page.goto('/#/button-primary.html')
    await page.getByRole('button', { name: 'Secondary' }).click()
    await expect(page).toHaveURL(/#\/button-secondary\.html$/)

    await page.goBack()
    await expect(page).toHaveURL(/#\/button-primary\.html$/)

    await page.goForward()
    await expect(page).toHaveURL(/#\/button-secondary\.html$/)
  })
})


