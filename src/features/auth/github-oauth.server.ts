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

const PROVIDER = 'github'
const DEFAULT_SCOPES = ['user:email']

export function startGitHubOAuth(request: Request): Response {
    const github = createGitHubOAuthClient(request)

    return startOAuthFlow({
        createAuthorizationURL: ({ scopes, state }) => github.createAuthorizationURL(state, scopes),
        provider: PROVIDER,
        request,
        scopes: getGitHubOAuthScopes(),
        usesPkce: false,
    })
}

export async function handleGitHubOAuthCallback(request: Request): Promise<Response> {
    const github = createGitHubOAuthClient(request)

    return await handleOAuthCallback({
        provider: PROVIDER,
        request,
        usesPkce: false,
        validateAuthorizationCode: async ({ code }) => await github.validateAuthorizationCode(code),
    })
}

function createGitHubOAuthClient(request: Request): arctic.GitHub {
    const env = createServerEnv()

    return new arctic.GitHub(
        requireOAuthEnv(PROVIDER, 'AUTH_GITHUB_CLIENT_ID', env.AUTH_GITHUB_CLIENT_ID),
        requireOAuthEnv(PROVIDER, 'AUTH_GITHUB_CLIENT_SECRET', env.AUTH_GITHUB_CLIENT_SECRET),
        env.AUTH_GITHUB_REDIRECT_URI ?? defaultOAuthRedirectURI(PROVIDER, request),
    )
}

function getGitHubOAuthScopes(): Array<string> {
    return resolveOAuthScopes(createServerEnv().AUTH_GITHUB_SCOPES, DEFAULT_SCOPES)
}
