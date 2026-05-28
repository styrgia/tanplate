import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import * as Checkbox from '.'

test('renders an accessible Base UI checkbox', async () => {
    const screen = await render(
        <Checkbox.Root aria-label="Receive weekly updates">
            <Checkbox.Indicator />
        </Checkbox.Root>,
    )

    await expect
        .element(screen.getByRole('checkbox', { name: 'Receive weekly updates' }))
        .toHaveAttribute('aria-checked', 'false')
})
