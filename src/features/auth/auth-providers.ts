export const AUTH_PROVIDER_IDS = ['google', 'github', 'yandex', 'vk'] as const

export type AuthProviderId = (typeof AUTH_PROVIDER_IDS)[number]

const AUTH_PROVIDER_LABELS = {
    github: 'GitHub',
    google: 'Google',
    vk: 'VK',
    yandex: 'Yandex',
} as const satisfies Record<AuthProviderId, string>

export function isAuthProviderId(value: unknown): value is AuthProviderId {
    return typeof value === 'string' && AUTH_PROVIDER_IDS.includes(value as AuthProviderId)
}

export function normalizeAuthProviderId(value: unknown): AuthProviderId | null {
    return isAuthProviderId(value) ? value : null
}

export function getAuthProviderLabel(provider: AuthProviderId): string {
    return AUTH_PROVIDER_LABELS[provider]
}
