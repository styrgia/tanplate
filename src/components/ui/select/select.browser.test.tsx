import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import * as Select from '.'

test('opens select options through the component API', async () => {
    const screen = await render(
        <Select.Root defaultValue="query">
            <Select.Label>Integration</Select.Label>
            <Select.Trigger>
                <Select.Value />
                <Select.Icon />
            </Select.Trigger>
            <Select.Portal>
                <Select.Positioner>
                    <Select.Popup>
                        <Select.List>
                            <Select.Item value="query">
                                <Select.ItemIndicator />
                                <Select.ItemText>TanStack Query</Select.ItemText>
                            </Select.Item>
                            <Select.Item value="router">
                                <Select.ItemIndicator />
                                <Select.ItemText>TanStack Router</Select.ItemText>
                            </Select.Item>
                        </Select.List>
                    </Select.Popup>
                </Select.Positioner>
            </Select.Portal>
        </Select.Root>,
    )

    await screen.getByRole('combobox', { name: 'Integration' }).click()

    await expect.element(screen.getByRole('option', { name: 'TanStack Router' })).toBeVisible()
})
