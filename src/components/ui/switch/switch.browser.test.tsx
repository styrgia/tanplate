import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import * as Switch from '.'

test('toggles switch checked state when clicked', async () => {
    const screen = await render(
        <>
            <Switch.Root id="compact-mode">
                <Switch.Thumb />
            </Switch.Root>
            <label htmlFor="compact-mode">Enable compact mode</label>
        </>,
    )
    const toggle = screen.getByRole('switch', { name: 'Enable compact mode' })

    await expect.element(toggle).toHaveAttribute('aria-checked', 'false')

    await screen.getByText('Enable compact mode').click()

    await expect.element(toggle).toHaveAttribute('aria-checked', 'true')
})
