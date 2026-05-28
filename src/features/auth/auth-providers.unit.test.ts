import { describe, expect, test } from 'vitest'

import {
    AUTH_PROVIDER_IDS,
    getAuthProviderLabel,
    isAuthProviderId,
    normalizeAuthProviderId,
} from './auth-providers'

describe('auth providers', () => {
    test('exposes the configured provider ids', () => {
        expect(AUTH_PROVIDER_IDS).toEqual(['google', 'github', 'yandex', 'vk'])
    })

    test('normalizes route params into provider ids', () => {
        expect(normalizeAuthProviderId('google')).toBe('google')
        expect(normalizeAuthProviderId('github')).toBe('github')
        expect(normalizeAuthProviderId('yandex')).toBe('yandex')
        expect(normalizeAuthProviderId('vk')).toBe('vk')
        expect(normalizeAuthProviderId('external')).toBeNull()
    })

    test('checks provider ids', () => {
        expect(isAuthProviderId('vk')).toBe(true)
        expect(isAuthProviderId('facebook')).toBe(false)
    })

    test('returns display labels', () => {
        expect(getAuthProviderLabel('google')).toBe('Google')
        expect(getAuthProviderLabel('github')).toBe('GitHub')
        expect(getAuthProviderLabel('yandex')).toBe('Yandex')
        expect(getAuthProviderLabel('vk')).toBe('VK')
    })
})
