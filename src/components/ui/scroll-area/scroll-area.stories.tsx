import type { Meta, StoryObj } from '@storybook/tanstack-react'

import * as ScrollArea from '.'

const releaseNotes = [
    'Added colocated Base UI wrappers.',
    'Kept each component export local to its folder.',
    'Covered the public component API with browser tests.',
    'Added Storybook examples for visual review.',
    'Preserved Tailwind v4 utility styling through CVA.',
]

const meta = {
    component: ScrollArea.Root,
    tags: ['autodocs'],
    render: () => (
        <ScrollArea.Root className="h-36 w-80">
            <ScrollArea.Viewport>
                <ScrollArea.Content className="space-y-3 p-4">
                    {releaseNotes.map((note) => (
                        <p key={note}>{note}</p>
                    ))}
                </ScrollArea.Content>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar>
                <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner />
        </ScrollArea.Root>
    ),
} satisfies Meta<typeof ScrollArea.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
