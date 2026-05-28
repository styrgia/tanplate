import type { Meta, StoryObj } from '@storybook/tanstack-react'

import * as Drawer from '.'

const meta = {
    component: Drawer.Root,
    tags: ['autodocs'],
    render: () => (
        <Drawer.Root>
            <Drawer.Trigger>Open drawer</Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Backdrop />
                <Drawer.Viewport>
                    <Drawer.Popup>
                        <Drawer.Title>Release checklist</Drawer.Title>
                        <Drawer.Description>
                            Review the final quality gates before shipping.
                        </Drawer.Description>
                        <Drawer.Content className="mt-4">
                            <ul className="list-disc space-y-2 pl-5">
                                <li>Browser component tests passed</li>
                                <li>Storybook build completed</li>
                                <li>Production build completed</li>
                            </ul>
                        </Drawer.Content>
                        <Drawer.Close aria-label="Close drawer" />
                    </Drawer.Popup>
                </Drawer.Viewport>
            </Drawer.Portal>
        </Drawer.Root>
    ),
} satisfies Meta<typeof Drawer.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
