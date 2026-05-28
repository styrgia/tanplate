import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import * as Radio from '.'

test('moves selection between radio options', async () => {
    const screen = await render(
        <Radio.Group defaultValue="email" aria-label="Notification channel">
            <Radio.Root id="email-alerts" value="email">
                <Radio.Indicator />
            </Radio.Root>
            <label htmlFor="email-alerts">Email alerts</label>
            <Radio.Root id="sms-alerts" value="sms">
                <Radio.Indicator />
            </Radio.Root>
            <label htmlFor="sms-alerts">SMS alerts</label>
        </Radio.Group>,
    )
    const email = screen.getByRole('radio', { name: 'Email alerts' })
    const sms = screen.getByRole('radio', { name: 'SMS alerts' })

    await expect.element(email).toBeChecked()

    await screen.getByText('SMS alerts').click()

    await expect.element(sms).toBeChecked()
    await expect.element(email).not.toBeChecked()
})
