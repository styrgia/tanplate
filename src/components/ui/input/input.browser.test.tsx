import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import { Input } from '.'

test('renders a styled Base UI input', async () => {
    const screen = await render(<Input aria-label="Project name" placeholder="Tanplate" />)

    await expect.element(screen.getByRole('textbox', { name: 'Project name' })).toBeVisible()
})
