import { describe, expect, test } from 'vitest'

import { normalizeProjectNote } from './starter-functions'

describe('normalizeProjectNote', () => {
    test('trims valid project note input in the node runtime', () => {
        expect(process.release.name).toBe('node')

        expect(
            normalizeProjectNote({
                contactName: ' Ada ',
                nextStep: ' Ship the first route ',
            }),
        ).toEqual({
            contactName: 'Ada',
            nextStep: 'Ship the first route',
        })
    })

    test('rejects short input', () => {
        expect(() =>
            normalizeProjectNote({
                contactName: 'A',
                nextStep: 'short',
            }),
        ).toThrow('Name must be at least 2 characters.')
    })
})
