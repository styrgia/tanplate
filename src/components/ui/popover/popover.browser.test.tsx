import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import * as Popover from '.'

test('opens popover content through the component API', async () => {
    const screen = await render(
        <Popover.Root>
            <Popover.Trigger>Show details</Popover.Trigger>
            <Popover.Portal>
                <Popover.Positioner>
                    <Popover.Popup>
                        <Popover.Title>Deployment</Popover.Title>
                        <Popover.Description>Ready to ship.</Popover.Description>
                    </Popover.Popup>
                </Popover.Positioner>
            </Popover.Portal>
        </Popover.Root>,
    )

    await screen.getByRole('button', { name: 'Show details' }).click()

    await expect.element(screen.getByText('Deployment')).toBeVisible()
    await expect.element(screen.getByText('Ready to ship.')).toBeVisible()
})
