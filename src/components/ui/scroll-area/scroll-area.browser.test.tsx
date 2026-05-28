import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import * as ScrollArea from '.'

test('exposes overflow content inside a labelled scroll region', async () => {
    const screen = await render(
        <section aria-label="Release notes">
            <ScrollArea.Root style={{ height: 120, width: 280 }}>
                <ScrollArea.Viewport>
                    <ScrollArea.Content>
                        <p>First release note</p>
                        <p>Second release note</p>
                        <p>Third release note</p>
                    </ScrollArea.Content>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar>
                    <ScrollArea.Thumb />
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner />
            </ScrollArea.Root>
        </section>,
    )

    await expect.element(screen.getByRole('region', { name: 'Release notes' })).toBeVisible()
    await expect.element(screen.getByText('Third release note')).toBeVisible()
})
