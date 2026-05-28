import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import * as Checkbox from '.'

test('toggles checked state when clicked', async () => {
    const screen = await render(
        <>
            <Checkbox.Root id="weekly-updates">
                <Checkbox.Indicator />
            </Checkbox.Root>
            <label htmlFor="weekly-updates">Receive weekly updates</label>
        </>,
    )
    const checkbox = screen.getByRole('checkbox', { name: 'Receive weekly updates' })

    await expect.element(checkbox).toHaveAttribute('aria-checked', 'false')

    await screen.getByText('Receive weekly updates').click()

    await expect.element(checkbox).toHaveAttribute('aria-checked', 'true')
})
