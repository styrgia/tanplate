import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import * as Popover from '.'

test('opens and closes popover content from controls', async () => {
    const screen = await render(
        <Popover.Root>
            <Popover.Trigger>Show details</Popover.Trigger>
            <Popover.Portal>
                <Popover.Positioner>
                    <Popover.Popup>
                        <Popover.Title>Deployment</Popover.Title>
                        <Popover.Description>Ready to ship.</Popover.Description>
                        <Popover.Close>Close</Popover.Close>
                    </Popover.Popup>
                </Popover.Positioner>
            </Popover.Portal>
        </Popover.Root>,
    )
    const trigger = screen.getByRole('button', { name: 'Show details' })

    await trigger.click()

    await expect.element(screen.getByText('Deployment')).toBeVisible()
    await expect.element(screen.getByText('Ready to ship.')).toBeVisible()

    await screen.getByRole('button', { name: 'Close' }).click()

    await expect.element(trigger).toHaveAttribute('aria-expanded', 'false')
})
