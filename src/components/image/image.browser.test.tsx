import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import { Image } from '.'

test('renders an optimized accessible image with project styling', async () => {
    const screen = await render(
        <Image
            alt="A quiet bath"
            className="rounded-md"
            height={300}
            src="https://cdn.shopify.com/static/sample-images/bath.jpeg"
            width={400}
        />,
    )

    const image = screen.getByRole('img', { name: 'A quiet bath' })

    await expect.element(image).toBeVisible()
    await expect.element(image).toHaveAttribute('loading', 'lazy')
    await expect.element(image).toHaveAttribute('decoding', 'async')
    await expect.element(image).toHaveAttribute('sizes', '(min-width: 400px) 400px, 100vw')
    await expect.element(image).toHaveAttribute('class', 'block rounded-md')
})
