import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import * as Tabs from '.'

test('renders active tab panel through the component API', async () => {
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

    await expect.element(screen.getByRole('tab', { name: 'Activity' })).toBeVisible()
    await expect.element(screen.getByText('Recent activity')).toBeVisible()
})
