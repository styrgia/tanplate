import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import * as Drawer from '.'

test('opens drawer content from the trigger', async () => {
    const screen = await render(
        <Drawer.Root>
            <Drawer.Trigger>Open drawer</Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Backdrop />
                <Drawer.Viewport>
                    <Drawer.Popup>
                        <Drawer.Title>Release checklist</Drawer.Title>
                        <Drawer.Description>
                            Review the final quality gates before shipping.
                        </Drawer.Description>
                        <Drawer.Close>Close</Drawer.Close>
                    </Drawer.Popup>
                </Drawer.Viewport>
            </Drawer.Portal>
        </Drawer.Root>,
    )

    await screen.getByRole('button', { name: 'Open drawer' }).click()

    await expect.element(screen.getByRole('dialog')).toBeVisible()
    await expect.element(screen.getByRole('heading', { name: 'Release checklist' })).toBeVisible()
})
