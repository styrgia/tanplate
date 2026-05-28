import { expect, test } from '@playwright/test'

test('renders the starter dashboard', async ({ page }) => {
    await page.goto('/')

    await expect(
        page.getByRole('heading', {
            name: /Bun-ready starter workspace|Стартовый workspace для Bun/,
        }),
    ).toBeVisible()
    await expect(page.getByText('TanStack Start').first()).toBeVisible()
    await expect(page.getByText('Bun').first()).toBeVisible()
    await expect(page.getByRole('heading', { name: /Form handoff|Передача формы/ })).toBeVisible()
    await expect(page.getByLabel(/Name|Имя/)).toBeVisible()
    await expect(page.getByLabel(/Next step|Следующий шаг/)).toBeVisible()
})
