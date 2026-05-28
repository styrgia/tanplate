import { createFileRoute } from '@tanstack/react-router'

import { startYandexOAuth } from '#/features/auth/yandex-oauth.server'

export const Route = createFileRoute('/auth/yandex/start')({
    server: {
        handlers: {
            GET: ({ request }) => startYandexOAuth(request),
        },
    },
})
