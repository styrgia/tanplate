import { QueryClient } from '@tanstack/react-query'
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { deLocalizeUrl, localizeUrl } from './paraglide/runtime.js'
import { routeTree } from './routeTree.gen'

export function getRouter() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
            },
        },
    })

    const router = createTanStackRouter({
        routeTree,
        context: {
            queryClient,
        },
        scrollRestoration: true,
        defaultPreload: 'intent',
        defaultPreloadStaleTime: 0,
        rewrite: {
            input: ({ url }) => deLocalizeUrl(url),
            output: ({ url }) => localizeUrl(url),
        },
    })

    setupRouterSsrQueryIntegration({
        router,
        queryClient,
    })

    return router
}

declare module '@tanstack/react-router' {
    interface Register {
        router: ReturnType<typeof getRouter>
    }
}
