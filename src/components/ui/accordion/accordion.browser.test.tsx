import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import * as Accordion from '.'

test('toggles an accordion panel from the trigger', async () => {
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
    const trigger = screen.getByRole('button', { name: 'Deployment' })

    await expect.element(trigger).toHaveAttribute('aria-expanded', 'false')

    await trigger.click()

    await expect.element(trigger).toHaveAttribute('aria-expanded', 'true')
    await expect
        .element(screen.getByText('Production deploys run after the browser suite passes.'))
        .toBeVisible()
})
