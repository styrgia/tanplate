import '@tanstack/react-start/server-only'

import * as arctic from 'arctic'
import { deleteCookie, getCookie, setCookie } from '@tanstack/react-start/server'

import { createServerEnv } from '#/env/server'
import { type AuthProviderId, getAuthProviderLabel } from './auth-providers'
import { buildExternalSignInPayload, parseOAuthScopes, sanitizeAuthRedirect } from './auth-utils'
import { authenticateWithExternalProvider } from './auth.server'

const OAUTH_COOKIE_MAX_AGE_SECONDS = 60 * 10

type CreateAuthorizationUrlOptions = {
    codeVerifier: string | null
    scopes: Array<string>
    state: string
}

type ValidateAuthorizationCodeOptions = {
    code: string
    codeVerifier: string | null
}

type StartOAuthFlowOptions = {
    createAuthorizationURL: (options: CreateAuthorizationUrlOptions) => URL
    provider: AuthProviderId
    request: Request
    scopes: Array<string>
    usesPkce: boolean
}

type HandleOAuthCallbackOptions = {
    provider: AuthProviderId
    request: Request
    usesPkce: boolean
    validateAuthorizationCode: (
        options: ValidateAuthorizationCodeOptions,
    ) => Promise<arctic.OAuth2Tokens>
}

export function startOAuthFlow({
    createAuthorizationURL,
    provider,
    request,
    scopes,
    usesPkce,
}: StartOAuthFlowOptions): Response {
    const url = new URL(request.url)
    const redirectTo = sanitizeAuthRedirect(url.searchParams.get('redirect'))
    const state = arctic.generateState()
    const codeVerifier = usesPkce ? arctic.generateCodeVerifier() : null
    const authorizationUrl = createAuthorizationURL({
        codeVerifier,
        scopes,
        state,
    })

    setOAuthCookie(provider, 'state', state)
    setOAuthCookie(provider, 'redirect', redirectTo)

    if (codeVerifier) {
        setOAuthCookie(provider, 'code-verifier', codeVerifier)
    }

    return Response.redirect(authorizationUrl, 302)
}

export async function handleOAuthCallback({
    provider,
    request,
    usesPkce,
    validateAuthorizationCode,
}: HandleOAuthCallbackOptions): Promise<Response> {
    const url = new URL(request.url)
    const redirectTo = sanitizeAuthRedirect(getOAuthCookie(provider, 'redirect'))
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')
    const storedState = getOAuthCookie(provider, 'state')
    const codeVerifier = usesPkce ? (getOAuthCookie(provider, 'code-verifier') ?? null) : null

    clearOAuthCookies(provider)

    if (!code || !state || !storedState || state !== storedState || (usesPkce && !codeVerifier)) {
        return redirectToSignIn(request, redirectTo, 'oauth')
    }

    try {
        const tokens = await validateAuthorizationCode({
            code,
            codeVerifier,
        })

        await authenticateWithExternalProvider(
            buildExternalSignInPayload({
                provider,
                tokens,
            }),
        )
    } catch {
        return redirectToSignIn(request, redirectTo, 'oauth')
    }

    return Response.redirect(new URL(redirectTo, request.url), 302)
}

export function defaultOAuthRedirectURI(provider: AuthProviderId, request: Request): string {
    const env = createServerEnv()
    const origin = env.SITE_URL ?? new URL(request.url).origin

    return new URL(`/auth/${provider}/callback`, origin).toString()
}

export function resolveOAuthScopes(
    value: string | undefined,
    defaultScopes: Array<string>,
): Array<string> {
    const scopes = parseOAuthScopes(value)

    return scopes.length > 0 ? scopes : defaultScopes
}

export function requireOAuthEnv(
    provider: AuthProviderId,
    name: string,
    value: string | undefined,
): string {
    if (!value) {
        throw new Error(`${name} is required for ${getAuthProviderLabel(provider)} OAuth.`)
    }

    return value
}

function redirectToSignIn(request: Request, redirectTo: string, authError: string): Response {
    const signInUrl = new URL('/sign-in', request.url)

    signInUrl.searchParams.set('authError', authError)

    if (redirectTo !== '/') {
        signInUrl.searchParams.set('redirect', redirectTo)
    }

    return Response.redirect(signInUrl, 302)
}

function setOAuthCookie(provider: AuthProviderId, name: string, value: string) {
    setCookie(getOAuthCookieName(provider, name), value, {
        ...getOAuthCookieOptions(),
        maxAge: OAUTH_COOKIE_MAX_AGE_SECONDS,
    })
}

function getOAuthCookie(provider: AuthProviderId, name: string): string | undefined {
    return getCookie(getOAuthCookieName(provider, name))
}

function clearOAuthCookies(provider: AuthProviderId) {
    deleteCookie(getOAuthCookieName(provider, 'state'), getOAuthCookieOptions())
    deleteCookie(getOAuthCookieName(provider, 'code-verifier'), getOAuthCookieOptions())
    deleteCookie(getOAuthCookieName(provider, 'redirect'), getOAuthCookieOptions())
}

function getOAuthCookieName(provider: AuthProviderId, name: string) {
    return `${getCookieNamePrefix()}tanplate-oauth-${provider}-${name}`
}

function getCookieNamePrefix() {
    return createServerEnv().NODE_ENV === 'production' ? '__Host-' : ''
}

function getOAuthCookieOptions() {
    return {
        httpOnly: true,
        path: '/',
        sameSite: 'lax' as const,
        secure: createServerEnv().NODE_ENV === 'production',
    }
}
