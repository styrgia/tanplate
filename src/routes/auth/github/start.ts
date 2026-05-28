import { createFileRoute } from '@tanstack/react-router'

import { startGitHubOAuth } from '#/features/auth/github-oauth.server'

export const Route = createFileRoute('/auth/github/start')({
    server: {
        handlers: {
            GET: ({ request }) => startGitHubOAuth(request),
        },
    },
})
