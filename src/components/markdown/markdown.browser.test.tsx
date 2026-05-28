import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import { renderMarkdown } from '#/utils/markdown'
import { Markdown } from '.'

test('renders processed markdown content as React elements', async () => {
    const result = await renderMarkdown(`
## Guide

[TanStack](https://tanstack.com)

![Project logo](/logo192.png)

\`\`\`ts
const value = 1
\`\`\`
`)

    const screen = await render(<Markdown result={result} />)

    await expect.element(screen.getByRole('heading', { name: 'Guide' })).toBeVisible()
    await expect
        .element(screen.getByRole('link', { name: 'TanStack' }))
        .toHaveAttribute('target', '_blank')
    await expect
        .element(screen.getByRole('link', { name: 'TanStack' }))
        .toHaveAttribute('rel', 'noreferrer noopener')
    await expect
        .element(screen.getByRole('img', { name: 'Project logo' }))
        .toHaveAttribute('loading', 'lazy')
    await expect.element(screen.getByText(/value/)).toBeVisible()
})
