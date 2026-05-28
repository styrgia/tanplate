import type { Meta, StoryObj } from '@storybook/tanstack-react'

import * as Checkbox from '.'

const meta = {
    component: Checkbox.Root,
    tags: ['autodocs'],
    args: {
        'aria-label': 'Receive weekly updates',
        defaultChecked: true,
    },
    render: (args) => (
        <div className="flex items-center gap-3 text-sm font-medium text-zinc-950">
            <Checkbox.Root {...args}>
                <Checkbox.Indicator />
            </Checkbox.Root>
            Receive weekly updates
        </div>
    ),
} satisfies Meta<typeof Checkbox.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Checked: Story = {}

export const Unchecked: Story = {
    args: {
        defaultChecked: false,
    },
}
