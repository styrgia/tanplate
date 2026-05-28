import type { Meta, StoryObj } from '@storybook/tanstack-react'

import * as Menu from '.'

const meta = {
    component: Menu.Root,
    tags: ['autodocs'],
    render: () => (
        <Menu.Root>
            <Menu.Trigger>View</Menu.Trigger>
            <Menu.Portal>
                <Menu.Positioner>
                    <Menu.Popup>
                        <Menu.Group>
                            <Menu.GroupLabel>Sort</Menu.GroupLabel>
                            <Menu.Item>Newest first</Menu.Item>
                            <Menu.Item>Oldest first</Menu.Item>
                        </Menu.Group>
                        <Menu.Separator />
                        <Menu.CheckboxItem defaultChecked>
                            <Menu.CheckboxItemIndicator />
                            <span className="col-start-2">Show completed</span>
                        </Menu.CheckboxItem>
                    </Menu.Popup>
                </Menu.Positioner>
            </Menu.Portal>
        </Menu.Root>
    ),
} satisfies Meta<typeof Menu.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
