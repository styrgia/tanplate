import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import * as Accordion from '.'

test('opens an accordion panel through the component API', async () => {
    const screen = await render(
        <Accordion.Root>
            <Accordion.Item value="deployment">
                <Accordion.Header>
                    <Accordion.Trigger>Deployment</Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Panel>
                    Production deploys run after the browser suite passes.
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion.Root>,
    )

    await screen.getByRole('button', { name: 'Deployment' }).click()

    await expect
        .element(screen.getByText('Production deploys run after the browser suite passes.'))
        .toBeVisible()
})
