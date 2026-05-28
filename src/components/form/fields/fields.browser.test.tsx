import { expect, test, vi } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import { useAppForm } from '#/components/form'
import * as Select from '#/components/ui/select'

type FieldDemoValues = {
    acceptsTerms: boolean
    channel: string
    confidence: number
    enabled: boolean
    projectName: string
    seats: number | undefined
    stack: string
    summary: string
}

function FieldsDemo({ onSubmit }: { onSubmit: (value: FieldDemoValues) => void }) {
    const form = useAppForm({
        defaultValues: {
            acceptsTerms: false,
            channel: 'email',
            confidence: 40,
            enabled: false,
            projectName: '',
            seats: undefined as number | undefined,
            stack: 'start',
            summary: '',
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
                {(field) => <field.TextField label="Project name" />}
            </form.AppField>

            <form.AppField name="summary">
                {(field) => <field.TextareaField label="Summary" />}
            </form.AppField>

            <form.AppField name="seats">
                {(field) => <field.NumberField label="Seats" />}
            </form.AppField>

            <form.AppField name="acceptsTerms">
                {(field) => <field.CheckboxField label="Accept terms" />}
            </form.AppField>

            <form.AppField name="enabled">
                {(field) => <field.SwitchField label="Enable workspace" />}
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

            <form.AppField name="channel">
                {(field) => (
                    <field.RadioGroupField
                        label="Notification channel"
                        options={[
                            { label: 'Email alerts', value: 'email' },
                            { label: 'SMS alerts', value: 'sms' },
                        ]}
                    />
                )}
            </form.AppField>

            <form.AppField name="confidence">
                {(field) => <field.SliderField label="Confidence" />}
            </form.AppField>

            <form.AppForm>
                <form.SubmitButton>Submit field demo</form.SubmitButton>
            </form.AppForm>
        </form>
    )
}

test('binds every app field wrapper to TanStack Form state', async () => {
    const onSubmit = vi.fn<(value: FieldDemoValues) => void>()
    const screen = await render(<FieldsDemo onSubmit={onSubmit} />)

    await screen.getByLabelText('Project name').fill('Apollo')
    await screen.getByLabelText('Summary').fill('Launch checklist\nReview form fields')
    await screen.getByLabelText('Seats').fill('7')
    await screen.getByText('Accept terms').click()
    await screen.getByText('Enable workspace').click()
    await screen.getByRole('combobox', { name: 'Stack' }).click()
    await screen.getByRole('option', { name: 'TanStack Query' }).click()
    await screen.getByText('SMS alerts').click()

    await expect.element(screen.getByRole('slider', { name: 'Confidence' })).toHaveValue('40')
    await screen.getByRole('button', { name: 'Submit field demo' }).click()

    await expect
        .poll(() => onSubmit.mock.calls.at(0)?.at(0))
        .toEqual({
            acceptsTerms: true,
            channel: 'sms',
            confidence: 40,
            enabled: true,
            projectName: 'Apollo',
            seats: 7,
            stack: 'query',
            summary: 'Launch checklist\nReview form fields',
        })
})
