import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import * as Slider from '.'

test('renders a slider with the provided value', async () => {
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

    await expect.element(screen.getByRole('slider', { name: 'Build confidence' })).toHaveValue('40')
})
