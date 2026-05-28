import type { Meta, StoryObj } from '@storybook/tanstack-react'

import * as Field from '../field'
import { Textarea } from '.'

const meta = {
    component: Textarea,
    tags: ['autodocs'],
    args: {
        'aria-label': 'Project notes',
        placeholder: 'Describe the next setup step',
    },
} satisfies Meta<typeof Textarea>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
    args: {
        disabled: true,
        placeholder: 'Disabled textarea',
    },
}

export const InField: Story = {
    render: () => (
        <Field.Root className="max-w-sm">
            <Field.Label>Project notes</Field.Label>
            <Textarea placeholder="Describe the next setup step" />
            <Field.Description>Keep this short enough for the handoff card.</Field.Description>
        </Field.Root>
    ),
}
