import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import * as Menu from '.'

test('opens menu content through the component API', async () => {
    const screen = await render(
        <Menu.Root>
            <Menu.Trigger>View</Menu.Trigger>
            <Menu.Portal>
                <Menu.Positioner>
                    <Menu.Popup>
                        <Menu.Item>Sort by date</Menu.Item>
                    </Menu.Popup>
                </Menu.Positioner>
            </Menu.Portal>
        </Menu.Root>,
    )

    await screen.getByRole('button', { name: 'View' }).click()

    await expect.element(screen.getByRole('menuitem', { name: 'Sort by date' })).toBeVisible()
})
