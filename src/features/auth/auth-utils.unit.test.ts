import { describe, expect, test } from 'vitest'

import {
    buildExternalSignInPayload,
    normalizeBackendAuthSession,
    normalizePasswordSignInInput,
    parseOAuthScopes,
    sanitizeAuthRedirect,
} from './auth-utils'

describe('auth utils', () => {
    test('normalizes password sign-in input', () => {
        expect(
            normalizePasswordSignInInput({
                email: ' ada@example.com ',
                password: 'correct horse battery staple',
            }),
        ).toEqual({
            email: 'ada@example.com',
            password: 'correct horse battery staple',
        })
    })

    test('rejects invalid password sign-in input', () => {
        expect(() =>
            normalizePasswordSignInInput({
                email: 'not-an-email',
                password: 'short',
            }),
        ).toThrow('Enter a valid email address.')
    })

    test('keeps redirect targets internal', () => {
        expect(sanitizeAuthRedirect('/dashboard?tab=billing')).toBe('/dashboard?tab=billing')
        expect(sanitizeAuthRedirect('https://example.com/dashboard')).toBe('/')
        expect(sanitizeAuthRedirect('//example.com/dashboard')).toBe('/')
        expect(sanitizeAuthRedirect('/auth/external/callback')).toBe('/')
        expect(sanitizeAuthRedirect('/sign-in')).toBe('/')
    })

    test('parses OAuth scopes from comma and whitespace separated env values', () => {
        expect(parseOAuthScopes('openid email, profile')).toEqual(['openid', 'email', 'profile'])
        expect(parseOAuthScopes('')).toEqual([])
    })

    test('normalizes backend auth response token variants', () => {
        expect(
            normalizeBackendAuthSession({
                token: 'backend-session-token',
                user: {
                    email: 'ada@example.com',
                    id: 'user_123',
                    name: 'Ada',
                },
            }),
        ).toEqual({
            expiresAt: undefined,
            sessionToken: 'backend-session-token',
            user: {
                email: 'ada@example.com',
                id: 'user_123',
                name: 'Ada',
            },
        })
    })

    test('rejects backend auth responses without a session token', () => {
        expect(() => normalizeBackendAuthSession({ user: { id: 'user_123' } })).toThrow(
            'Auth backend response did not include a session token.',
        )
    })

    test('builds external backend payload from Arctic tokens', () => {
        const payload = buildExternalSignInPayload({
            provider: 'github',
            tokens: {
                accessToken: () => 'provider-access-token',
                accessTokenExpiresAt: () => new Date('2026-05-28T12:00:00.000Z'),
                idToken: () => null,
                refreshToken: () => 'provider-refresh-token',
            },
        })

        expect(payload).toEqual({
            accessToken: 'provider-access-token',
            expiresAt: '2026-05-28T12:00:00.000Z',
            idToken: null,
            provider: 'github',
            refreshToken: 'provider-refresh-token',
        })
    })
})
