import type { Meta, StoryObj } from '@storybook/tanstack-react'

import * as Field from '.'

const meta = {
    component: Field.Root,
    tags: ['autodocs'],
    render: () => (
        <Field.Root className="max-w-sm">
            <Field.Label>Email</Field.Label>
            <Field.Control placeholder="team@example.com" type="email" />
            <Field.Description>Used for workspace notifications.</Field.Description>
        </Field.Root>
    ),
} satisfies Meta<typeof Field.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithError: Story = {
    render: () => (
        <Field.Root className="max-w-sm" invalid>
            <Field.Label>Email</Field.Label>
            <Field.Control defaultValue="team" type="email" />
            <Field.Error>Use a valid email address.</Field.Error>
        </Field.Root>
    ),
}
