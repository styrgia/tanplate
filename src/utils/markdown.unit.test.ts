import { describe, expect, test } from 'vitest'

import { renderMarkdown } from './markdown'

describe('renderMarkdown', () => {
    test('renders markdown with headings and Shiki highlighted code', async () => {
        const result = await renderMarkdown(`
# Hello *world*

## Install

| Command | Purpose |
| --- | --- |
| bun test | Run tests |

\`\`\`ts
const answer: number = 42
\`\`\`
`)

        expect(result.headings).toEqual([
            { id: 'hello-world', level: 1, text: 'Hello world' },
            { id: 'install', level: 2, text: 'Install' },
        ])
        expect(result.markup).toContain('<table>')
        expect(result.markup).toContain('class="shiki')
        expect(result.markup).toContain('answer')
    })

    test('removes unsafe raw HTML and link protocols', async () => {
        const result = await renderMarkdown(`
<script>alert('bad')</script>

[bad link](javascript:alert('bad'))
`)

        expect(result.markup).not.toContain('<script')
        expect(result.markup).not.toContain('javascript:')
        expect(result.markup).toContain('bad link')
    })
})
