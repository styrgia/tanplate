import { expect, test, vi } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import * as Menu from '.'

test('runs an item action from the opened menu', async () => {
    const onSelect = vi.fn<() => void>()
    const screen = await render(
        <Menu.Root>
            <Menu.Trigger>View</Menu.Trigger>
            <Menu.Portal>
                <Menu.Positioner>
                    <Menu.Popup>
                        <Menu.Item onClick={onSelect}>Sort by date</Menu.Item>
                    </Menu.Popup>
                </Menu.Positioner>
            </Menu.Portal>
        </Menu.Root>,
    )

    await screen.getByRole('button', { name: 'View' }).click()
    await screen.getByRole('menuitem', { name: 'Sort by date' }).click()

    expect(onSelect).toHaveBeenCalledTimes(1)
})
