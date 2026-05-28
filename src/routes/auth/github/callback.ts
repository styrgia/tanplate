import { createFileRoute } from '@tanstack/react-router'

import { handleGitHubOAuthCallback } from '#/features/auth/github-oauth.server'

export const Route = createFileRoute('/auth/github/callback')({
    server: {
        handlers: {
            GET: ({ request }) => handleGitHubOAuthCallback(request),
        },
    },
})
