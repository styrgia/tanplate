import type { Meta, StoryObj } from '@storybook/tanstack-react'

import * as Radio from '.'

const meta = {
    component: Radio.Group,
    tags: ['autodocs'],
    render: () => (
        <Radio.Group defaultValue="email" aria-label="Notification channel">
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-950">
                <Radio.Root aria-label="Email" value="email">
                    <Radio.Indicator />
                </Radio.Root>
                Email
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-950">
                <Radio.Root aria-label="Slack" value="slack">
                    <Radio.Indicator />
                </Radio.Root>
                Slack
            </div>
        </Radio.Group>
    ),
} satisfies Meta<typeof Radio.Group>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
