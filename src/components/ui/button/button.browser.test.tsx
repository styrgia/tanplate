import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import { Button } from '.'

test('renders a styled Base UI button', async () => {
    const screen = await render(<Button>Save changes</Button>)

    await expect.element(screen.getByRole('button', { name: 'Save changes' })).toBeVisible()
})
