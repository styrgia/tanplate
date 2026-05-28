import type { Meta, StoryObj } from '@storybook/tanstack-react'

import { Markdown } from '.'

const sampleMarkdown = `
# Markdown renderer

TanStack Start can render **GitHub-flavored markdown** with tables, raw HTML sanitation,
and Shiki-highlighted code blocks.

| Piece | Role |
| --- | --- |
| unified | Processing pipeline |
| Shiki | Syntax highlighting |

\`\`\`ts
export function greet(name: string) {
    return \`Hello, \${name}\`
}
\`\`\`
`

const meta = {
    component: Markdown,
    tags: ['autodocs'],
    args: {
        content: sampleMarkdown,
    },
    render: (args) => (
        <div className="max-w-3xl p-6">
            <Markdown {...args} />
        </div>
    ),
} satisfies Meta<typeof Markdown>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
