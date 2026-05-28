import { createFileRoute } from '@tanstack/react-router'

import { startGoogleOAuth } from '#/features/auth/google-oauth.server'

export const Route = createFileRoute('/auth/google/start')({
    server: {
        handlers: {
            GET: ({ request }) => startGoogleOAuth(request),
        },
    },
})
