import { z } from 'zod'

export type AuthUser = {
    email?: string
    id: string
    name?: string
}

export type BackendAuthSession = {
    expiresAt?: string
    sessionToken: string
    user?: AuthUser
}

export type AuthSession = {
    isAuthenticated: boolean
    user: AuthUser | null
}

export type PasswordSignInInput = {
    email: string
    password: string
}

export type ExternalSignInPayload = {
    accessToken: string
    expiresAt: string | null
    idToken: string | null
    provider: string
    refreshToken: string | null
}

type OAuthTokensForBackend = {
    accessToken: () => string
    accessTokenExpiresAt: () => Date
    idToken: () => string | null
    refreshToken: () => string | null
}

const passwordSignInSchema = z.object({
    email: z.string().trim().email('Enter a valid email address.'),
    password: z.string().min(8, 'Enter your password.'),
})

const authUserSchema = z
    .object({
        email: z.string().email().optional(),
        id: z.string().min(1),
        name: z.string().min(1).optional(),
    })
    .passthrough()

const backendAuthResponseSchema = z
    .object({
        accessToken: z.string().min(1).optional(),
        expiresAt: z.string().datetime().optional(),
        sessionToken: z.string().min(1).optional(),
        token: z.string().min(1).optional(),
        user: authUserSchema.optional(),
    })
    .passthrough()

export function normalizePasswordSignInInput(data: unknown): PasswordSignInInput {
    return passwordSignInSchema.parse(data)
}

export function sanitizeAuthRedirect(value: unknown): string {
    if (typeof value !== 'string' || value.length === 0) {
        return '/'
    }

    if (!value.startsWith('/') || value.startsWith('//')) {
        return '/'
    }

    if (value === '/sign-in' || value.startsWith('/sign-in?') || value.startsWith('/auth/')) {
        return '/'
    }

    return value
}

export function parseOAuthScopes(value: string | undefined): Array<string> {
    return (
        value
            ?.split(/[,\s]+/)
            .map((scope) => scope.trim())
            .filter(Boolean) ?? []
    )
}

export function normalizeBackendAuthSession(data: unknown): BackendAuthSession {
    const parsed = backendAuthResponseSchema.parse(data)
    const sessionToken = parsed.sessionToken ?? parsed.token ?? parsed.accessToken

    if (!sessionToken) {
        throw new Error('Auth backend response did not include a session token.')
    }

    return {
        expiresAt: parsed.expiresAt,
        sessionToken,
        user: parsed.user,
    }
}

export function buildExternalSignInPayload({
    provider,
    tokens,
}: {
    provider: string
    tokens: OAuthTokensForBackend
}): ExternalSignInPayload {
    return {
        accessToken: tokens.accessToken(),
        expiresAt: readOptionalDate(() => tokens.accessTokenExpiresAt())?.toISOString() ?? null,
        idToken: readOptionalString(() => tokens.idToken()),
        provider,
        refreshToken: readOptionalString(() => tokens.refreshToken()),
    }
}

function readOptionalString(read: () => string | null): string | null {
    try {
        return read()
    } catch {
        return null
    }
}

function readOptionalDate(read: () => Date): Date | null {
    try {
        return read()
    } catch {
        return null
    }
}
