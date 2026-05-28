import { createFileRoute } from '@tanstack/react-router'

import { startVkOAuth } from '#/features/auth/vk-oauth.server'

export const Route = createFileRoute('/auth/vk/start')({
    server: {
        handlers: {
            GET: ({ request }) => startVkOAuth(request),
        },
    },
})
