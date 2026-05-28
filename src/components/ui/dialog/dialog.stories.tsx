import type { Meta, StoryObj } from '@storybook/tanstack-react'

import * as Dialog from '.'

const meta = {
    component: Dialog.Root,
    tags: ['autodocs'],
    render: () => (
        <Dialog.Root>
            <Dialog.Trigger>Open settings</Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Backdrop />
                <Dialog.Popup>
                    <Dialog.Title>Project settings</Dialog.Title>
                    <Dialog.Description>
                        Update workspace defaults before the next deployment.
                    </Dialog.Description>
                    <div className="mt-5 flex justify-end">
                        <Dialog.Close>Close</Dialog.Close>
                    </div>
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    ),
} satisfies Meta<typeof Dialog.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
