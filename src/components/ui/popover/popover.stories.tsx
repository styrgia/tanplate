import type { Meta, StoryObj } from '@storybook/tanstack-react'

import * as Popover from '.'

const meta = {
    component: Popover.Root,
    tags: ['autodocs'],
    render: () => (
        <Popover.Root>
            <Popover.Trigger>Show details</Popover.Trigger>
            <Popover.Portal>
                <Popover.Positioner>
                    <Popover.Popup>
                        <Popover.Title>Deployment</Popover.Title>
                        <Popover.Description>
                            Production build is ready for release.
                        </Popover.Description>
                        <div className="mt-4 flex justify-end">
                            <Popover.Close>Close</Popover.Close>
                        </div>
                    </Popover.Popup>
                </Popover.Positioner>
            </Popover.Portal>
        </Popover.Root>
    ),
} satisfies Meta<typeof Popover.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
