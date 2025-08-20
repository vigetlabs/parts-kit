import { test, expect } from '@playwright/test'

test('has welcome message', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'welcome' })).toBeVisible()
})
