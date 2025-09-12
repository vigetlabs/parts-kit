import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await expect(page.getByTestId('app')).toBeVisible()
})

test.describe('Keyboard Shortcuts', () => {
  test('F toggles fullscreen and Escape exits', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Go Fullscreen [F]' })).toBeVisible()

    await page.keyboard.press('f')
    await expect(page.getByRole('button', { name: 'Exit Fullscreen [F]' })).toBeVisible()

    // Verify that the nav content is hidden and the grid has collapsed the nav column
    await expect(page.getByRole('searchbox', { name: 'search' })).not.toBeVisible()
    const grid = page.getByTestId('app-grid')
    await expect(grid).toHaveClass(/.*!grid-cols-\[0px,1fr\].*/)

    // Confirm toggle by pressing f again
    await page.keyboard.press('f')
    await expect(page.getByRole('button', { name: 'Go Fullscreen [F]' })).toBeVisible()

    await page.keyboard.press('f')
    await expect(page.getByRole('button', { name: 'Exit Fullscreen [F]' })).toBeVisible()

    // Confirm exit by pressing escape
    await page.keyboard.press('Escape')
    await expect(page.getByRole('button', { name: 'Go Fullscreen [F]' })).toBeVisible()
  })

  test('F does not toggle while typing in the search input', async ({ page }) => {
    // Ensure we are not in fullscreen to start
    await expect(page.getByRole('button', { name: 'Go Fullscreen [F]' })).toBeVisible()

    const search = page.getByRole('searchbox', { name: 'search' })
    await search.click()
    await search.fill('foo')
    await page.keyboard.press('f')

    // Should still show "Go Fullscreen" while focused in input
    await expect(page.getByRole('button', { name: 'Go Fullscreen [F]' })).toBeVisible()

    // Blur input and verify toggle works
    await page.getByRole('heading', { name: /welcome/i }).click()
    await page.keyboard.press('f')
    await expect(page.getByRole('button', { name: 'Exit Fullscreen [F]' })).toBeVisible()

    // Reset state
    await page.keyboard.press('Escape')
    await expect(page.getByRole('button', { name: 'Go Fullscreen [F]' })).toBeVisible()
  })

  test('Shift+V toggles viewport size dropdown', async ({ page }) => {
    // Sanity check the dropdown is invisible
    await expect(page.getByRole('menuitemradio', { name: 'Mobile' })).toBeHidden()
    await expect(page.getByRole('menuitemradio', { name: 'Tablet' })).toBeHidden()
    await expect(page.getByRole('menuitemradio', { name: 'Desktop' })).toBeHidden()
    await expect(page.getByRole('menuitem', { name: 'Responsive' })).toBeHidden()

    // Toggle dropdown
    await page.keyboard.press('Shift+V')

    // Check that the dropdown is visible
    await expect(page.getByRole('menuitemradio', { name: 'Mobile' })).toBeVisible()
    await expect(page.getByRole('menuitemradio', { name: 'Tablet' })).toBeVisible()
    await expect(page.getByRole('menuitemradio', { name: 'Desktop' })).toBeVisible()
    await expect(page.getByRole('menuitem', { name: 'Responsive' })).toBeVisible()
  })

  test('Shift+S opens settings', async ({ page }) => {
    await page.keyboard.press('Shift+S')
    await expect(page.getByTestId('SettingsPanel')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible()
  })

  test('Shift+T toggles theme dark and back to light', async ({ page }) => {
    const app = page.getByTestId('app')
    // Toggle to dark
    await page.keyboard.press('Shift+T')
    await expect(app).toHaveClass(/dark/)
    // Toggle back to light
    await page.keyboard.press('Shift+T')
    await expect(app).toHaveClass(/light/)
  })
})


