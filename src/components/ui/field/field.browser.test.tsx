import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import * as Field from '.'

test('links label, description, and error state to a field control', async () => {
    const screen = await render(
        <Field.Root invalid>
            <Field.Label>Email</Field.Label>
            <Field.Control placeholder="team@example.com" type="email" />
            <Field.Description>Used for project updates.</Field.Description>
            <Field.Error match>Use a valid email address.</Field.Error>
        </Field.Root>,
    )
    const input = screen.getByLabelText('Email')

    await input.fill('team@example.com')

    await expect.element(input).toHaveValue('team@example.com')
    await expect.element(screen.getByText('Used for project updates.')).toBeVisible()
    await expect.element(screen.getByText('Use a valid email address.')).toBeVisible()
})
