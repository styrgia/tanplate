import { expect, test, vi } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import * as Select from '#/components/ui/select'

import { useAppForm } from '.'

type DemoFormValues = {
    acceptsTerms: boolean
    projectName: string
    stack: string
}

function DemoForm({ onSubmit }: { onSubmit: (value: DemoFormValues) => void }) {
    const form = useAppForm({
        defaultValues: {
            acceptsTerms: false,
            projectName: '',
            stack: 'start',
        },
        onSubmit: ({ value }) => onSubmit(value),
    })

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault()
                event.stopPropagation()
                void form.handleSubmit()
            }}
        >
            <form.AppField name="projectName">
                {(field) => (
                    <field.TextField
                        description="Shown in project lists."
                        label="Project name"
                        placeholder="Tanplate"
                    />
                )}
            </form.AppField>

            <form.AppField name="acceptsTerms">
                {(field) => <field.CheckboxField label="Accept terms" />}
            </form.AppField>

            <form.AppField name="stack">
                {(field) => (
                    <field.SelectField label="Stack">
                        <Select.Item value="start">
                            <Select.ItemIndicator />
                            <Select.ItemText>TanStack Start</Select.ItemText>
                        </Select.Item>
                        <Select.Item value="query">
                            <Select.ItemIndicator />
                            <Select.ItemText>TanStack Query</Select.ItemText>
                        </Select.Item>
                    </field.SelectField>
                )}
            </form.AppField>

            <form.AppForm>
                <form.SubmitButton>Save project</form.SubmitButton>
            </form.AppForm>
        </form>
    )
}

test('binds app form fields to existing UI controls', async () => {
    const onSubmit = vi.fn<(value: DemoFormValues) => void>()
    const screen = await render(<DemoForm onSubmit={onSubmit} />)

    await screen.getByLabelText('Project name').fill('Apollo')
    await screen.getByText('Accept terms').click()
    await screen.getByRole('combobox', { name: 'Stack' }).click()
    await screen.getByRole('option', { name: 'TanStack Query' }).click()
    await screen.getByRole('button', { name: 'Save project' }).click()

    await expect
        .poll(() => onSubmit.mock.calls.at(0)?.at(0))
        .toEqual({
            acceptsTerms: true,
            projectName: 'Apollo',
            stack: 'query',
        })
})
