import type { QueryClient } from '@tanstack/react-query'
import { Suspense, lazy } from 'react'
import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router'

import { getLocale, getTextDirection } from '#/paraglide/runtime.js'
import appCss from '../styles.css?url'

const AppTanStackDevtools = import.meta.env.DEV
    ? lazy(() => import('#/devtools/tanstack-devtools'))
    : null

type RouterContext = {
    queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
    head: () => ({
        meta: [
            {
                charSet: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
        ],
        links: [
            {
                rel: 'stylesheet',
                href: appCss,
            },
        ],
    }),
    shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
    return (
        <html dir={getTextDirection()} lang={getLocale()}>
            <head>
                <HeadContent />
            </head>
            <body>
                {children}

                {AppTanStackDevtools ? (
                    <Suspense fallback={null}>
                        <AppTanStackDevtools />
                    </Suspense>
                ) : null}

                <Scripts />
            </body>
        </html>
    )
}
