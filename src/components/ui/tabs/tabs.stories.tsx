import type { Meta, StoryObj } from '@storybook/tanstack-react'

import * as Tabs from '.'

const meta = {
    component: Tabs.Root,
    tags: ['autodocs'],
    render: () => (
        <Tabs.Root className="max-w-md" defaultValue="activity">
            <Tabs.List aria-label="Project sections">
                <Tabs.Tab value="activity">Activity</Tabs.Tab>
                <Tabs.Tab value="settings">Settings</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="activity">Recent deploys, notes, and integration events.</Tabs.Panel>
            <Tabs.Panel value="settings">Workspace defaults and team permissions.</Tabs.Panel>
        </Tabs.Root>
    ),
} satisfies Meta<typeof Tabs.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
