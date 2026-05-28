import type { Meta, StoryObj } from '@storybook/tanstack-react'

import { Button } from '.'

const meta = {
    component: Button,
    tags: ['autodocs'],
    args: {
        children: 'Save changes',
    },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
    args: {
        children: 'Saving',
        disabled: true,
    },
}
