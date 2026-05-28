import { createFileRoute } from '@tanstack/react-router'

import { handleGoogleOAuthCallback } from '#/features/auth/google-oauth.server'

export const Route = createFileRoute('/auth/google/callback')({
    server: {
        handlers: {
            GET: ({ request }) => handleGoogleOAuthCallback(request),
        },
    },
})
