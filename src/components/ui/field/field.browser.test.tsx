import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import * as Field from '.'

test('links label and description to a Base UI field control', async () => {
    const screen = await render(
        <Field.Root>
            <Field.Label>Email</Field.Label>
            <Field.Control placeholder="team@example.com" type="email" />
            <Field.Description>Used for project updates.</Field.Description>
        </Field.Root>,
    )

    await expect.element(screen.getByLabelText('Email')).toBeVisible()
    await expect.element(screen.getByText('Used for project updates.')).toBeVisible()
})
