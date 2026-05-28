import type { Meta, StoryObj } from '@storybook/tanstack-react'

import { Button } from '../button'
import * as Toast from '.'

function ToastStory() {
    const toastManager = Toast.useToastManager()

    return (
        <>
            <Button
                onClick={() =>
                    toastManager.add({
                        title: 'Release queued',
                        description: 'The browser suite is running now.',
                        timeout: 0,
                    })
                }
            >
                Show toast
            </Button>
            <Toast.Portal>
                <Toast.Viewport>
                    {toastManager.toasts.map((toast) => (
                        <Toast.Root key={toast.id} toast={toast}>
                            <Toast.Content>
                                <Toast.Title />
                                <Toast.Close aria-label="Dismiss toast" />
                                <Toast.Description />
                            </Toast.Content>
                        </Toast.Root>
                    ))}
                </Toast.Viewport>
            </Toast.Portal>
        </>
    )
}

const meta = {
    component: Toast.Provider,
    tags: ['autodocs'],
    render: () => (
        <Toast.Provider>
            <ToastStory />
        </Toast.Provider>
    ),
} satisfies Meta<typeof Toast.Provider>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
