import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await expect(page.getByTestId('app')).toBeVisible()
})

test.describe('Routing', () => {
  test('clicking Child button navigates to child/example.html', async ({ page }) => {
    // Click on the button with text "Child"
    const childButton = page.getByRole('button', { name: 'Child' })
    await expect(childButton).toBeVisible()
    await childButton.click()

    // Wait for navigation to complete
    await page.waitForLoadState('networkidle')

    // Verify the URL is ?part=child/example.html
    await expect(page).toHaveURL(/\?part=child\/example\.html/)

    // Verify the iframe has the correct src
    const iframe = page.getByTestId('iframe')
    await expect(iframe).toHaveAttribute('src', 'child/example.html')
  })

  test('visiting URL with ?part=child/example.html loads correct iframe', async ({ page }) => {
    // Navigate directly to the URL with the part query parameter
    await page.goto('/?part=child/example.html')
    await page.waitForLoadState('networkidle')
    await expect(page.getByTestId('app')).toBeVisible()

    // Verify the URL is ?part=child/example.html
    await expect(page).toHaveURL(/\?part=child\/example\.html/)

    // Verify the iframe has the correct src
    const iframe = page.getByTestId('iframe')
    await expect(iframe).toHaveAttribute('src', 'child/example.html')
  })
})

