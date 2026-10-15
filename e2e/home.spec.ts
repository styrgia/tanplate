import { expect, test } from '@playwright/test'

// Exercise hydration when the browser and server use different time zones.
test.use({ timezoneId: 'America/New_York' })

test('renders the starter dashboard', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.goto('/')

    await expect(
        page.getByRole('heading', {
            name: /Bun-ready starter workspace|Стартовый workspace для Bun/,
        }),
    ).toBeVisible()
    await expect(page.getByText('TanStack Start').first()).toBeVisible()
    await expect(page.getByText('Bun').first()).toBeVisible()
    await expect(page.getByRole('heading', { name: /Form handoff|Передача формы/ })).toBeVisible()
    await expect(page.getByLabel(/Name|Имя/)).toBeEnabled()
    await expect(page.getByLabel(/Next step|Следующий шаг/)).toBeVisible()
    expect(errors).toEqual([])
})

test('submits a note through the Start server function', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel(/Name|Имя/).fill('Starter Tester')
    await page.getByLabel(/Next step|Следующий шаг/).fill('Verify the updated starter')
    await page.getByRole('button', { name: /Save note|Сохранить/ }).click()

    await expect(
        page.getByText(/Saved for Starter Tester|Сохранено для Starter Tester/),
    ).toHaveText(/Verify the updated starter/)
})

test('renders the Russian route after hydration', async ({ page }) => {
    await page.goto('/ru/')
    await expect(page.getByRole('heading', { name: 'Стартовый workspace для Bun' })).toBeVisible()
    await expect(page.locator('html')).toHaveAttribute('lang', 'ru')
})
