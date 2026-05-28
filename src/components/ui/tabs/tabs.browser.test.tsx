import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import * as Tabs from '.'

test('switches the active panel when a tab is selected', async () => {
    const screen = await render(
        <Tabs.Root defaultValue="activity">
            <Tabs.List aria-label="Project sections">
                <Tabs.Tab value="activity">Activity</Tabs.Tab>
                <Tabs.Tab value="settings">Settings</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="activity">Recent activity</Tabs.Panel>
            <Tabs.Panel value="settings">Project settings</Tabs.Panel>
        </Tabs.Root>,
    )
    const settingsTab = screen.getByRole('tab', { name: 'Settings' })

    await expect.element(screen.getByRole('tab', { name: 'Activity' })).toBeVisible()
    await expect.element(screen.getByText('Recent activity')).toBeVisible()

    await settingsTab.click()

    await expect.element(settingsTab).toHaveAttribute('aria-selected', 'true')
    await expect.element(screen.getByText('Project settings')).toBeVisible()
})
