import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import * as Switch from '.'

test('renders an accessible Base UI switch', async () => {
    const screen = await render(
        <Switch.Root aria-label="Enable compact mode">
            <Switch.Thumb />
        </Switch.Root>,
    )

    await expect
        .element(screen.getByRole('switch', { name: 'Enable compact mode' }))
        .toHaveAttribute('aria-checked', 'false')
})
