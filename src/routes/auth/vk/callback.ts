import { createFileRoute } from '@tanstack/react-router'

import { handleVkOAuthCallback } from '#/features/auth/vk-oauth.server'

export const Route = createFileRoute('/auth/vk/callback')({
    server: {
        handlers: {
            GET: ({ request }) => handleVkOAuthCallback(request),
        },
    },
})
