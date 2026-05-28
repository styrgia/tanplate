import { describe, expect, test } from 'vitest'

import { createClientEnv } from './client'

describe('createClientEnv', () => {
    test('treats empty optional public Sentry variables as undefined', () => {
        const env = createClientEnv({
            VITE_SENTRY_DSN: '',
        })

        expect(env.VITE_SENTRY_DSN).toBeUndefined()
        expect('SENTRY_AUTH_TOKEN' in env).toBe(false)
        expect('SENTRY_ORG' in env).toBe(false)
        expect('SENTRY_PROJECT' in env).toBe(false)
    })

    test('rejects malformed public Sentry DSNs', () => {
        expect(() =>
            createClientEnv({
                VITE_SENTRY_DSN: 'not-a-url',
            }),
        ).toThrow('Invalid environment variables')
    })
})
