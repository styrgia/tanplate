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

test('uses IPX as the default fallback optimizer for first-party images', async () => {
    const screen = await render(
        <Image
            alt="Local hero"
            className="rounded-md"
            height={300}
            src="/images/hero.jpg"
            width={400}
        />,
    )

    const image = screen.getByRole('img', { name: 'Local hero' })

    await expect
        .element(image)
        .toHaveAttribute('src', '/_ipx/q_85,f_webp,s_400x300/images/hero.jpg')
    await expect
        .element(image)
        .toHaveAttribute(
            'srcset',
            [
                '/_ipx/q_85,f_webp,s_400x300/images/hero.jpg 400w',
                '/_ipx/q_85,f_webp,s_640x480/images/hero.jpg 640w',
                '/_ipx/q_85,f_webp,s_750x563/images/hero.jpg 750w',
                '/_ipx/q_85,f_webp,s_800x600/images/hero.jpg 800w',
            ].join(',\n'),
        )
    await expect.element(image).toHaveAttribute('class', 'block rounded-md')
})
