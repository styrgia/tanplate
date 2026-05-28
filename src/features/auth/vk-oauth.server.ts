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

const PROVIDER = 'vk'
const DEFAULT_SCOPES: Array<string> = []

export function startVkOAuth(request: Request): Response {
    const vk = createVkOAuthClient(request)

    return startOAuthFlow({
        createAuthorizationURL: ({ scopes, state }) => vk.createAuthorizationURL(state, scopes),
        provider: PROVIDER,
        request,
        scopes: getVkOAuthScopes(),
        usesPkce: false,
    })
}

export async function handleVkOAuthCallback(request: Request): Promise<Response> {
    const vk = createVkOAuthClient(request)

    return await handleOAuthCallback({
        provider: PROVIDER,
        request,
        usesPkce: false,
        validateAuthorizationCode: async ({ code }) => await vk.validateAuthorizationCode(code),
    })
}

function createVkOAuthClient(request: Request): arctic.VK {
    const env = createServerEnv()

    return new arctic.VK(
        requireOAuthEnv(PROVIDER, 'AUTH_VK_CLIENT_ID', env.AUTH_VK_CLIENT_ID),
        requireOAuthEnv(PROVIDER, 'AUTH_VK_CLIENT_SECRET', env.AUTH_VK_CLIENT_SECRET),
        env.AUTH_VK_REDIRECT_URI ?? defaultOAuthRedirectURI(PROVIDER, request),
    )
}

function getVkOAuthScopes(): Array<string> {
    return resolveOAuthScopes(createServerEnv().AUTH_VK_SCOPES, DEFAULT_SCOPES)
}
