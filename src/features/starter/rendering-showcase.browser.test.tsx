import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import { RenderingShowcase } from './rendering-showcase'

test('renders markdown and standalone Shiki examples', async () => {
    const screen = await render(<RenderingShowcase />)

    await expect.element(screen.getByRole('heading', { name: 'Markdown preview' })).toBeVisible()
    await expect
        .element(screen.getByRole('heading', { name: 'Server function note' }))
        .toBeVisible()
    await expect.element(screen.getByRole('heading', { name: 'Standalone Shiki' })).toBeVisible()
    await expect.element(screen.getByLabelText('Standalone Shiki example')).toBeVisible()
    await expect.element(screen.getByText(/createServerFn/)).toBeVisible()
})
