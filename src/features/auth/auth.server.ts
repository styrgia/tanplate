import '@tanstack/react-start/server-only'

import {
    deleteCookie,
    getCookie,
    getRequest,
    setCookie,
    setResponseHeader,
} from '@tanstack/react-start/server'

import { createServerEnv } from '#/env/server'
import {
    type AuthSession,
    type BackendAuthSession,
    type ExternalSignInPayload,
    type PasswordSignInInput,
    normalizeBackendAuthSession,
} from './auth-utils'

const SESSION_COOKIE_BASE_NAME = 'tanplate-auth-session'
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7

export async function authenticateWithPassword(input: PasswordSignInInput): Promise<AuthSession> {
    assertSameOriginRequest()

    const session = await requestBackendAuthSession('/sign-in', input, 'Invalid email or password.')
    setAuthSessionCookie(session)

    return toAuthSession(session)
}

export async function authenticateWithExternalProvider(
    payload: ExternalSignInPayload,
): Promise<AuthSession> {
    const session = await requestBackendAuthSession(
        '/external/sign-in',
        payload,
        'External sign-in failed.',
    )
    setAuthSessionCookie(session)

    return toAuthSession(session)
}

export function getCurrentAuthSessionFromCookie(): AuthSession {
    const sessionToken = getCookie(getAuthSessionCookieName())

    return {
        isAuthenticated: Boolean(sessionToken),
        user: null,
    }
}

export function clearAuthSessionCookie() {
    deleteCookie(getAuthSessionCookieName(), getCookieOptions())
}

export function setAuthNoStoreHeaders() {
    setResponseHeader('Cache-Control', 'no-store')
    setResponseHeader('Vary', 'Cookie')
}

export function assertSameOriginRequest() {
    const request = getRequest()

    if (request.method === 'GET' || request.method === 'HEAD') {
        return
    }

    const origin = request.headers.get('origin')

    try {
        if (!origin || new URL(origin).origin !== new URL(request.url).origin) {
            throw new Error('Invalid request origin.')
        }
    } catch {
        throw new Error('Invalid request origin.')
    }
}

function setAuthSessionCookie(session: BackendAuthSession) {
    setCookie(getAuthSessionCookieName(), session.sessionToken, {
        ...getCookieOptions(),
        maxAge: getSessionMaxAgeSeconds(session),
    })
}

async function requestBackendAuthSession(
    path: string,
    payload: unknown,
    failureMessage: string,
): Promise<BackendAuthSession> {
    let response: Response

    try {
        response = await fetch(buildBackendUrl(path), {
            body: JSON.stringify(payload),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
        })
    } catch {
        throw new Error(failureMessage)
    }

    const responseData = await readJsonResponse(response)

    if (!response.ok) {
        throw new Error(failureMessage)
    }

    return normalizeBackendAuthSession(responseData)
}

async function readJsonResponse(response: Response): Promise<unknown> {
    const text = await response.text()

    if (!text) {
        return {}
    }

    try {
        return JSON.parse(text)
    } catch {
        throw new Error('Auth backend returned invalid JSON.')
    }
}

function buildBackendUrl(path: string): string {
    const env = createServerEnv()
    const backendUrl = requireEnv('AUTH_BACKEND_URL', env.AUTH_BACKEND_URL)
    const url = new URL(backendUrl.endsWith('/') ? backendUrl : `${backendUrl}/`)
    const basePath = url.pathname.replace(/\/+$/, '')
    const endpointPath = path.replace(/^\/+/, '')

    url.pathname = `${basePath}/${endpointPath}`

    return url.toString()
}

function getAuthSessionCookieName() {
    return `${getCookieNamePrefix()}${SESSION_COOKIE_BASE_NAME}`
}

function getCookieNamePrefix() {
    return createServerEnv().NODE_ENV === 'production' ? '__Host-' : ''
}

function getCookieOptions() {
    return {
        httpOnly: true,
        path: '/',
        sameSite: 'lax' as const,
        secure: createServerEnv().NODE_ENV === 'production',
    }
}

function getSessionMaxAgeSeconds(session: BackendAuthSession) {
    if (!session.expiresAt) {
        return SESSION_MAX_AGE_SECONDS
    }

    const expiresAt = new Date(session.expiresAt).getTime()

    if (Number.isNaN(expiresAt)) {
        return SESSION_MAX_AGE_SECONDS
    }

    const secondsUntilExpiry = Math.floor((expiresAt - Date.now()) / 1000)

    return Math.max(0, Math.min(SESSION_MAX_AGE_SECONDS, secondsUntilExpiry))
}

function toAuthSession(session: BackendAuthSession): AuthSession {
    return {
        isAuthenticated: true,
        user: session.user ?? null,
    }
}

function requireEnv(name: string, value: string | undefined): string {
    if (!value) {
        throw new Error(`${name} is required for auth.`)
    }

    return value
}
