import type { Meta, StoryObj } from '@storybook/tanstack-react'

import * as Slider from '.'

const meta = {
    component: Slider.Root,
    tags: ['autodocs'],
    render: () => (
        <Slider.Root defaultValue={64}>
            <div className="flex items-center justify-between gap-4">
                <Slider.Label>Build confidence</Slider.Label>
                <Slider.Value />
            </div>
            <Slider.Control>
                <Slider.Track>
                    <Slider.Indicator />
                    <Slider.Thumb aria-label="Build confidence" />
                </Slider.Track>
            </Slider.Control>
        </Slider.Root>
    ),
} satisfies Meta<typeof Slider.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
