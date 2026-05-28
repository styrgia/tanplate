import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import * as Avatar from '.'

test('shows fallback initials when no image source is available', async () => {
    const screen = await render(
        <Avatar.Root>
            <Avatar.Image alt="Pat profile" />
            <Avatar.Fallback>PV</Avatar.Fallback>
        </Avatar.Root>,
    )

    await expect.element(screen.getByText('PV')).toHaveTextContent('PV')
    await expect.element(screen.getByText('PV')).toBeVisible()
})
