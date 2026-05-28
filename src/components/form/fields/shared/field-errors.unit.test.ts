import { expect, test } from 'vitest'

import { fieldErrorMessages } from './field-errors'

function fieldWithErrors(errors: unknown[]) {
    return {
        state: {
            meta: {
                errors,
            },
        },
    } as Parameters<typeof fieldErrorMessages>[0]
}

test('collects user-facing messages from supported field error shapes', () => {
    expect(
        fieldErrorMessages(
            fieldWithErrors([
                'Required',
                new Error('Invalid email'),
                { message: 'Already used' },
                ['Nested', true, 404],
            ]),
        ),
    ).toEqual(['Required', 'Invalid email', 'Already used', 'Nested', 'true', '404'])
})

test('ignores empty and non-message field error values', () => {
    expect(fieldErrorMessages(fieldWithErrors([undefined, null, '', {}, { message: 42 }]))).toEqual(
        [],
    )
})
