import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import * as Slider from '.'

test('exposes the current slider value with its accessible label', async () => {
    const screen = await render(
        <Slider.Root defaultValue={40}>
            <Slider.Label>Build confidence</Slider.Label>
            <Slider.Value />
            <Slider.Control>
                <Slider.Track>
                    <Slider.Indicator />
                    <Slider.Thumb aria-label="Build confidence" />
                </Slider.Track>
            </Slider.Control>
        </Slider.Root>,
    )
    const slider = screen.getByRole('slider', { name: 'Build confidence' })

    await expect.element(slider).toHaveValue('40')
    await expect.element(screen.getByText('40')).toBeVisible()
})
