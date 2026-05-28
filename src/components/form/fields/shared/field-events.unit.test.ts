import { expect, test, vi } from 'vitest'

import { handleFieldBlur } from './field-events'

test('runs the caller blur handler before marking the form field as blurred', () => {
    const calls: string[] = []
    const field = {
        handleBlur: vi.fn<() => void>(() => {
            calls.push('field')
        }),
    } as unknown as Parameters<typeof handleFieldBlur>[0]
    const onBlur = vi.fn<(event: { type: string }) => void>(() => {
        calls.push('caller')
    })
    const event = { type: 'blur' }

    handleFieldBlur(field, onBlur, event)

    expect(onBlur).toHaveBeenCalledWith(event)
    expect(field.handleBlur).toHaveBeenCalledTimes(1)
    expect(calls).toEqual(['caller', 'field'])
})
