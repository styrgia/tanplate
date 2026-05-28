import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import { Textarea } from '.'

test('accepts multi-line typed text', async () => {
    const screen = await render(<Textarea aria-label="Project notes" placeholder="Next steps" />)
    const textarea = screen.getByRole('textbox', { name: 'Project notes' })

    await textarea.fill('Ship routes\nReview forms')

    await expect.element(textarea).toHaveValue('Ship routes\nReview forms')
})
