import type { Meta, StoryObj } from '@storybook/tanstack-react'

import { CodeBlock } from '.'

const meta = {
    component: CodeBlock,
    tags: ['autodocs'],
    args: {
        code: `type User = {
    id: string
    name: string
}

const user: User = {
    id: 'user_1',
    name: 'Ada',
}`,
        lang: 'ts',
    },
    render: (args) => (
        <div className="max-w-3xl p-6">
            <CodeBlock {...args} />
        </div>
    ),
} satisfies Meta<typeof CodeBlock>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
