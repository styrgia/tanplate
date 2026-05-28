import '@tanstack/react-start/server-only'

import * as arctic from 'arctic'

import { createServerEnv } from '#/env/server'
import {
    defaultOAuthRedirectURI,
    handleOAuthCallback,
    requireOAuthEnv,
    resolveOAuthScopes,
    startOAuthFlow,
} from './oauth-shared.server'

const PROVIDER = 'yandex'
const DEFAULT_SCOPES: Array<string> = []

export function startYandexOAuth(request: Request): Response {
    const yandex = createYandexOAuthClient(request)

    return startOAuthFlow({
        createAuthorizationURL: ({ scopes, state }) => yandex.createAuthorizationURL(state, scopes),
        provider: PROVIDER,
        request,
        scopes: getYandexOAuthScopes(),
        usesPkce: false,
    })
}

export async function handleYandexOAuthCallback(request: Request): Promise<Response> {
    const yandex = createYandexOAuthClient(request)

    return await handleOAuthCallback({
        provider: PROVIDER,
        request,
        usesPkce: false,
        validateAuthorizationCode: async ({ code }) => await yandex.validateAuthorizationCode(code),
    })
}

function createYandexOAuthClient(request: Request): arctic.Yandex {
    const env = createServerEnv()

    return new arctic.Yandex(
        requireOAuthEnv(PROVIDER, 'AUTH_YANDEX_CLIENT_ID', env.AUTH_YANDEX_CLIENT_ID),
        requireOAuthEnv(PROVIDER, 'AUTH_YANDEX_CLIENT_SECRET', env.AUTH_YANDEX_CLIENT_SECRET),
        env.AUTH_YANDEX_REDIRECT_URI ?? defaultOAuthRedirectURI(PROVIDER, request),
    )
}

function getYandexOAuthScopes(): Array<string> {
    return resolveOAuthScopes(createServerEnv().AUTH_YANDEX_SCOPES, DEFAULT_SCOPES)
}
