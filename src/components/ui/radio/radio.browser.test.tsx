import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import * as Radio from '.'

test('renders a checked radio control', async () => {
    const screen = await render(
        <Radio.Group defaultValue="email" aria-label="Notification channel">
            <Radio.Root aria-label="Email alerts" value="email">
                <Radio.Indicator />
            </Radio.Root>
        </Radio.Group>,
    )

    await expect.element(screen.getByRole('radio', { name: 'Email alerts' })).toBeChecked()
})
