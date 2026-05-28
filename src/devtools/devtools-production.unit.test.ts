import { readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vitest'

const DEVTOOLS_IMPORTS = [
    '@tanstack/react-devtools',
    '@tanstack/react-form-devtools',
    '@tanstack/react-query-devtools',
    '@tanstack/react-router-devtools',
]

describe('root route devtools imports', () => {
    it('does not statically import TanStack Devtools packages', async () => {
        const rootRoute = await readFile(new URL('../routes/__root.tsx', import.meta.url), 'utf8')

        for (const packageName of DEVTOOLS_IMPORTS) {
            expect(rootRoute).not.toContain(packageName)
        }
    })
})
