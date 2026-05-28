import { createFileRoute, redirect } from '@tanstack/react-router'

import { getCurrentAuthSession } from '#/features/auth/auth-functions'

export const Route = createFileRoute('/_authenticated')({
    ssr: false,
    beforeLoad: async ({ location }) => {
        const auth = await getCurrentAuthSession()

        if (!auth.isAuthenticated) {
            throw redirect({
                search: {
                    authError: undefined,
                    redirect: location.href,
                },
                to: '/sign-in',
            })
        }

        return {
            auth,
        }
    },
})
