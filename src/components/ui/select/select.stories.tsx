import type { Meta, StoryObj } from '@storybook/tanstack-react'

import * as Select from '.'

const meta = {
    component: Select.Root,
    tags: ['autodocs'],
    render: () => (
        <Select.Root defaultValue="query">
            <div className="flex w-64 flex-col gap-1.5">
                <Select.Label>Integration</Select.Label>
                <Select.Trigger>
                    <Select.Value />
                    <Select.Icon />
                </Select.Trigger>
            </div>
            <Select.Portal>
                <Select.Positioner>
                    <Select.Popup>
                        <Select.List>
                            <Select.Item value="query">
                                <Select.ItemIndicator />
                                <Select.ItemText>TanStack Query</Select.ItemText>
                            </Select.Item>
                            <Select.Item value="router">
                                <Select.ItemIndicator />
                                <Select.ItemText>TanStack Router</Select.ItemText>
                            </Select.Item>
                            <Select.Item value="form">
                                <Select.ItemIndicator />
                                <Select.ItemText>TanStack Form</Select.ItemText>
                            </Select.Item>
                        </Select.List>
                    </Select.Popup>
                </Select.Positioner>
            </Select.Portal>
        </Select.Root>
    ),
} satisfies Meta<typeof Select.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
