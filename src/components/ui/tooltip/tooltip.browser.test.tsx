import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import * as Tooltip from '.'

test('shows tooltip content through the component API', async () => {
    const screen = await render(
        <Tooltip.Provider delay={0}>
            <Tooltip.Root>
                <Tooltip.Trigger aria-label="More information">Info</Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Positioner>
                        <Tooltip.Popup>Helpful context</Tooltip.Popup>
                    </Tooltip.Positioner>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>,
    )

    await screen.getByRole('button', { name: 'More information' }).hover()

    await expect.element(screen.getByText('Helpful context')).toBeVisible()
})
