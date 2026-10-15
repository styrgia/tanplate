import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import { highlightCode } from '#/utils/shiki'
import { CodeBlock } from '.'

test('renders Shiki highlighted code without markdown', async () => {
    const result = await highlightCode({
        code: 'const direct = true',
        lang: 'ts',
    })

    const screen = await render(<CodeBlock aria-label="Example code" result={result} />)

    await expect.element(screen.getByLabelText('Example code')).toBeVisible()
    await expect.element(screen.getByText(/direct/)).toBeVisible()
})

test('updates highlighted code when raw input changes', async () => {
    const screen = await render(
        <CodeBlock aria-label="Example code" code="const first = true" lang="ts" />,
    )
    await expect
        .element(screen.getByLabelText('Example code'))
        .toHaveTextContent('const first = true')

    await screen.rerender(
        <CodeBlock aria-label="Example code" code="const second = false" lang="ts" />,
    )
    await expect
        .element(screen.getByLabelText('Example code'))
        .toHaveTextContent('const second = false')

    const result = await highlightCode({ code: 'const provided = 1', lang: 'ts' })
    await screen.rerender(<CodeBlock aria-label="Example code" result={result} />)
    await expect
        .element(screen.getByLabelText('Example code'))
        .toHaveTextContent('const provided = 1')
})
