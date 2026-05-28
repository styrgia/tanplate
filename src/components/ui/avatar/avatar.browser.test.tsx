import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import * as Avatar from '.'

test('renders avatar fallback content', async () => {
    const screen = await render(
        <Avatar.Root>
            <Avatar.Fallback>PV</Avatar.Fallback>
        </Avatar.Root>,
    )

    await expect.element(screen.getByText('PV')).toBeVisible()
})
