import type { Meta, StoryObj } from '@storybook/tanstack-react'

import * as Accordion from '.'

const meta = {
    component: Accordion.Root,
    tags: ['autodocs'],
    render: () => (
        <Accordion.Root className="max-w-md" defaultValue={['quality']}>
            <Accordion.Item value="quality">
                <Accordion.Header>
                    <Accordion.Trigger>Quality gates</Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Panel>
                    Typecheck, lint, unit tests, and browser tests run before release.
                </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="storybook">
                <Accordion.Header>
                    <Accordion.Trigger>Storybook</Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Panel>
                    Stories keep component states easy to scan during UI work.
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion.Root>
    ),
} satisfies Meta<typeof Accordion.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
