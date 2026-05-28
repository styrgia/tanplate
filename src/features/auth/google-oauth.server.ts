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

const PROVIDER = 'google'
const DEFAULT_SCOPES = ['openid', 'email', 'profile']

export function startGoogleOAuth(request: Request): Response {
    const google = createGoogleOAuthClient(request)

    return startOAuthFlow({
        createAuthorizationURL: ({ codeVerifier, scopes, state }) => {
            if (!codeVerifier) {
                throw new Error('Google OAuth requires PKCE.')
            }

            return google.createAuthorizationURL(state, codeVerifier, scopes)
        },
        provider: PROVIDER,
        request,
        scopes: getGoogleOAuthScopes(),
        usesPkce: true,
    })
}

export async function handleGoogleOAuthCallback(request: Request): Promise<Response> {
    const google = createGoogleOAuthClient(request)

    return await handleOAuthCallback({
        provider: PROVIDER,
        request,
        usesPkce: true,
        validateAuthorizationCode: async ({ code, codeVerifier }) => {
            if (!codeVerifier) {
                throw new Error('Google OAuth callback is missing PKCE verifier.')
            }

            return await google.validateAuthorizationCode(code, codeVerifier)
        },
    })
}

function createGoogleOAuthClient(request: Request): arctic.Google {
    const env = createServerEnv()

    return new arctic.Google(
        requireOAuthEnv(PROVIDER, 'AUTH_GOOGLE_CLIENT_ID', env.AUTH_GOOGLE_CLIENT_ID),
        requireOAuthEnv(PROVIDER, 'AUTH_GOOGLE_CLIENT_SECRET', env.AUTH_GOOGLE_CLIENT_SECRET),
        env.AUTH_GOOGLE_REDIRECT_URI ?? defaultOAuthRedirectURI(PROVIDER, request),
    )
}

function getGoogleOAuthScopes(): Array<string> {
    return resolveOAuthScopes(createServerEnv().AUTH_GOOGLE_SCOPES, DEFAULT_SCOPES)
}
