import type { Meta, StoryObj } from '@storybook/tanstack-react'

import * as Switch from '.'

const meta = {
    component: Switch.Root,
    tags: ['autodocs'],
    args: {
        'aria-label': 'Compact mode',
        defaultChecked: true,
    },
    render: (args) => (
        <div className="flex items-center gap-3 text-sm font-medium text-zinc-950">
            <Switch.Root {...args}>
                <Switch.Thumb />
            </Switch.Root>
            Compact mode
        </div>
    ),
} satisfies Meta<typeof Switch.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Checked: Story = {}

export const Unchecked: Story = {
    args: {
        defaultChecked: false,
    },
}
