import { describe, expect, test } from 'vitest'

import { createServerEnv } from './server'

describe('createServerEnv', () => {
    test('treats empty optional Sentry variables as undefined', () => {
        const env = createServerEnv({
            NODE_ENV: 'test',
            SENTRY_AUTH_TOKEN: '',
            SENTRY_ORG: '',
            SENTRY_PROJECT: '',
            VITE_SENTRY_DSN: '',
        })

        expect(env.NODE_ENV).toBe('test')
        expect(env.SENTRY_AUTH_TOKEN).toBeUndefined()
        expect(env.SENTRY_ORG).toBeUndefined()
        expect(env.SENTRY_PROJECT).toBeUndefined()
        expect(env.VITE_SENTRY_DSN).toBeUndefined()
    })

    test('rejects malformed Sentry DSNs', () => {
        expect(() =>
            createServerEnv({
                NODE_ENV: 'test',
                VITE_SENTRY_DSN: 'not-a-url',
            }),
        ).toThrow('Invalid environment variables')
    })
})
