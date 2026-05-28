import type { Meta, StoryObj } from '@storybook/tanstack-react'

import { Image } from '.'

const meta = {
    component: Image,
    tags: ['autodocs'],
    render: (args) => (
        <div className="max-w-md">
            <Image {...args} />
        </div>
    ),
    args: {
        alt: 'A quiet bath',
        className: 'rounded-md',
        height: 600,
        src: 'https://cdn.shopify.com/static/sample-images/bath.jpeg',
        width: 800,
    },
} satisfies Meta<typeof Image>

export default meta

type Story = StoryObj<typeof meta>

export const Constrained: Story = {}

export const FullWidth: Story = {
    render: () => (
        <div className="max-w-2xl">
            <Image
                alt="Garnished plate"
                aspectRatio={16 / 9}
                className="rounded-md"
                layout="fullWidth"
                src="https://cdn.shopify.com/static/sample-images/garnished.jpeg"
            />
        </div>
    ),
}
