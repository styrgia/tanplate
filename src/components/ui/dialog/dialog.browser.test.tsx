import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import * as Dialog from '.'

test('opens dialog content from the trigger', async () => {
    const screen = await render(
        <Dialog.Root>
            <Dialog.Trigger>Open settings</Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Backdrop />
                <Dialog.Popup>
                    <Dialog.Title>Project settings</Dialog.Title>
                    <Dialog.Description>Update workspace defaults.</Dialog.Description>
                    <Dialog.Close>Close</Dialog.Close>
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>,
    )

    await screen.getByRole('button', { name: 'Open settings' }).click()

    await expect.element(screen.getByRole('dialog')).toBeVisible()
    await expect.element(screen.getByRole('heading', { name: 'Project settings' })).toBeVisible()
})
