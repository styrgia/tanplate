import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import * as Fieldset from '.'

test('groups controls under a legend while preserving form input behavior', async () => {
    const screen = await render(
        <Fieldset.Root>
            <Fieldset.Legend>Project details</Fieldset.Legend>
            <input aria-label="Project name" />
        </Fieldset.Root>,
    )
    const input = screen.getByRole('textbox', { name: 'Project name' })

    await expect.element(screen.getByRole('group', { name: 'Project details' })).toBeVisible()

    await input.fill('Tanplate')

    await expect.element(input).toHaveValue('Tanplate')
})
