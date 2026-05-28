import type { Meta, StoryObj } from '@storybook/tanstack-react'

import { Input } from '.'

const meta = {
    component: Input,
    tags: ['autodocs'],
    args: {
        placeholder: 'Tanplate',
    },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
    args: {
        disabled: true,
        placeholder: 'Disabled input',
    },
}
