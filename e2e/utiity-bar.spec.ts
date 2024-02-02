import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test.describe('Toggle To Dark Theme', () => {
  // Always have the dark class
  test.afterEach(async ({ page }) => {
    await expect(page.getByTestId('app')).toHaveClass(/dark/)
  })

  test('Click', async ({ page }) => {
    await page.getByRole('button', { name: 'Toggle Theme [Shift + T]' }).click()
  })

  test('Keyboard', async ({ page }) => {
    await page.keyboard.press('Shift+T')
  })
})

test.describe('Toggle back to Light Theme from dark', () => {
  // Always have the light theme
  test.afterEach(async ({ page }) => {
    await expect(page.getByTestId('app')).toHaveClass(/light/)
  })

  test('Click', async ({ page }) => {
    await page.getByRole('button', { name: 'Toggle Theme [Shift + T]' }).click()
    await page.getByRole('button', { name: 'Toggle Theme [Shift + T]' }).click()
  })

  test('Keyboard', async ({ page }) => {
    await page.keyboard.press('Shift+T')
    await page.keyboard.press('Shift+T')
  })
})

test.describe('Viewport Size Dropdown', () => {
  test.afterEach(async ({ page }) => {
    await expect(
      page.getByRole('menuitemradio', { name: 'Mobile' }),
    ).toBeVisible()
    await expect(
      page.getByRole('menuitemradio', { name: 'Tablet' }),
    ).toBeVisible()
    await expect(
      page.getByRole('menuitemradio', { name: 'Desktop' }),
    ).toBeVisible()
    await expect(
      page.getByRole('menuitem', { name: 'Responsive' }),
    ).toBeVisible()
  })

  test('Click', async ({ page }) => {
    await page
      .getByRole('button', { name: 'Viewport Size [Shift + V]' })
      .click()
  })

  test('Keyboard', async ({ page }) => {
    await page.keyboard.press('Shift+V')
  })
})

test.describe('Viewport Size Affects Iframe', () => {
  // TODO -> Compare iFrame sizes with Enums?
})

test.describe('Settings', () => {
  test.afterEach(async ({ page }) => {
    await expect(page.getByTestId('SettingsPanel')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible()
  })

  test('Click', async ({ page }) => {
    await page.getByRole('button', { name: 'Settings [Shift + S]' }).click()
  })

  test('Keyboard', async ({ page }) => {
    await page.keyboard.press('Shift+S')
  })
})

