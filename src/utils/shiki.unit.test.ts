import { describe, expect, test } from 'vitest'

import { getShikiHighlighter, highlightCode, shikiDefaultColor, shikiThemes } from './shiki'

describe('highlightCode', () => {
    test('highlights code independently from markdown', async () => {
        const result = await highlightCode({
            code: 'const answer: number = 42',
            lang: 'ts',
        })

        expect(result.code).toBe('const answer: number = 42')
        expect(result.lang).toBe('ts')
        expect(result.markup).toContain('class="shiki')
        expect(result.markup).toContain('answer')
        expect(result.markup).toContain('--shiki-dark')
    })

    test('shares the markdown Shiki theme defaults', () => {
        expect(shikiThemes).toEqual({
            light: 'github-light',
            dark: 'tokyo-night',
        })
        expect(shikiDefaultColor).toBe('light-dark()')
    })

    test('reuses a singleton highlighter instance', async () => {
        await highlightCode({
            code: 'const warmed = true',
            lang: 'ts',
        })

        const first = await getShikiHighlighter()
        const second = await getShikiHighlighter()

        expect(first).toBe(second)
    })
})
