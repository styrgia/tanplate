import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import * as Fieldset from '.'

test('renders a grouped fieldset with legend', async () => {
    const screen = await render(
        <Fieldset.Root>
            <Fieldset.Legend>Project details</Fieldset.Legend>
            <input aria-label="Project name" />
        </Fieldset.Root>,
    )

    await expect.element(screen.getByRole('group', { name: 'Project details' })).toBeVisible()
    await expect.element(screen.getByRole('textbox', { name: 'Project name' })).toBeVisible()
})
