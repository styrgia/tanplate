import type { Meta, StoryObj } from '@storybook/tanstack-react'

import { Input } from '../input'
import * as Fieldset from '.'

const meta = {
    component: Fieldset.Root,
    tags: ['autodocs'],
    render: () => (
        <Fieldset.Root className="w-80">
            <Fieldset.Legend>Project details</Fieldset.Legend>
            <label
                className="grid gap-1.5 text-sm font-medium text-zinc-950"
                htmlFor="project-name"
            >
                Name
                <Input id="project-name" placeholder="Tanplate" />
            </label>
            <label
                className="grid gap-1.5 text-sm font-medium text-zinc-950"
                htmlFor="project-owner"
            >
                Owner
                <Input id="project-owner" placeholder="Platform team" />
            </label>
        </Fieldset.Root>
    ),
} satisfies Meta<typeof Fieldset.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
