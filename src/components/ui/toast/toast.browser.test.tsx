import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import { Button } from '../button'
import * as Toast from '.'

function ToastDemo() {
    const toastManager = Toast.useToastManager()

    return (
        <>
            <Button onClick={() => toastManager.add({ title: 'Release queued' })}>
                Create toast
            </Button>
            <Toast.Portal>
                <Toast.Viewport>
                    {toastManager.toasts.map((toast) => (
                        <Toast.Root key={toast.id} toast={toast}>
                            <Toast.Content>
                                <Toast.Title />
                            </Toast.Content>
                        </Toast.Root>
                    ))}
                </Toast.Viewport>
            </Toast.Portal>
        </>
    )
}

test('creates a toast through the toast manager', async () => {
    const screen = await render(
        <Toast.Provider>
            <ToastDemo />
        </Toast.Provider>,
    )

    await screen.getByRole('button', { name: 'Create toast' }).click()

    await expect.element(screen.getByText('Release queued')).toBeVisible()
})
