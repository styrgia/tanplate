import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import { Input } from '.'

test('accepts typed text as a controlled form textbox would', async () => {
    const screen = await render(<Input aria-label="Project name" placeholder="Tanplate" />)
    const input = screen.getByRole('textbox', { name: 'Project name' })

    await input.fill('Launch plan')

    await expect.element(input).toHaveValue('Launch plan')
})
