import type { Meta, StoryObj } from '@storybook/tanstack-react'

import { IntegrationCard } from './integration-card'

const meta = {
    component: IntegrationCard,
    tags: ['autodocs'],
    args: {
        integration: 'TanStack Start',
    },
} satisfies Meta<typeof IntegrationCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
