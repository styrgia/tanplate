import { createElement } from 'react'
import { renderToReadableStream } from 'react-dom/server'
import { describe, expect, test } from 'vitest'

import { Markdown } from '.'

describe('Markdown SSR', () => {
    test('renders raw markdown content in the server stream', async () => {
        const stream = await renderToReadableStream(
            createElement(Markdown, {
                content: `
## SSR Markdown

\`\`\`ts
const fromServer = true
\`\`\`
`,
            }),
        )

        await stream.allReady

        const html = await new Response(stream).text()

        expect(html).toContain('SSR Markdown')
        expect(html).toContain('fromServer')
        expect(html).toContain('class="shiki')
        expect(html).not.toContain('aria-busy="true"')
    })
})
