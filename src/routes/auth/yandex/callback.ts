import { createFileRoute } from '@tanstack/react-router'

import { handleYandexOAuthCallback } from '#/features/auth/yandex-oauth.server'

export const Route = createFileRoute('/auth/yandex/callback')({
    server: {
        handlers: {
            GET: ({ request }) => handleYandexOAuthCallback(request),
        },
    },
})
