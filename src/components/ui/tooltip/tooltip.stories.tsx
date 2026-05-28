import type { Meta, StoryObj } from '@storybook/tanstack-react'

import * as Tooltip from '.'

const meta = {
    component: Tooltip.Root,
    tags: ['autodocs'],
    render: () => (
        <Tooltip.Provider delay={0}>
            <Tooltip.Root>
                <Tooltip.Trigger aria-label="Deployment help">Hover for context</Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Positioner>
                        <Tooltip.Popup>
                            <Tooltip.Arrow />
                            Runs the production build before release.
                        </Tooltip.Popup>
                    </Tooltip.Positioner>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    ),
} satisfies Meta<typeof Tooltip.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
