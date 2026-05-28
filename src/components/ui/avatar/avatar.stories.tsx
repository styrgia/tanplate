import type { Meta, StoryObj } from '@storybook/tanstack-react'

import * as Avatar from '.'

const meta = {
    component: Avatar.Root,
    tags: ['autodocs'],
    render: () => (
        <Avatar.Root>
            <Avatar.Image
                alt="Product designer profile"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=80&h=80&q=80"
            />
            <Avatar.Fallback>PD</Avatar.Fallback>
        </Avatar.Root>
    ),
} satisfies Meta<typeof Avatar.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Fallback: Story = {
    render: () => (
        <Avatar.Root>
            <Avatar.Fallback>PV</Avatar.Fallback>
        </Avatar.Root>
    ),
}
