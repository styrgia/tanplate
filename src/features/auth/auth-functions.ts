import { createServerFn } from '@tanstack/react-start'

import {
    assertSameOriginRequest,
    authenticateWithPassword,
    clearAuthSessionCookie,
    getCurrentAuthSessionFromCookie,
    setAuthNoStoreHeaders,
} from './auth.server'
import { normalizePasswordSignInInput } from './auth-utils'

export const getCurrentAuthSession = createServerFn({ method: 'GET' }).handler(async () => {
    setAuthNoStoreHeaders()

    return getCurrentAuthSessionFromCookie()
})

export const signInWithPassword = createServerFn({ method: 'POST' })
    .inputValidator(normalizePasswordSignInInput)
    .handler(async ({ data }) => {
        setAuthNoStoreHeaders()

        return await authenticateWithPassword(data)
    })

export const signOut = createServerFn({ method: 'POST' }).handler(async () => {
    assertSameOriginRequest()
    setAuthNoStoreHeaders()
    clearAuthSessionCookie()

    return { ok: true }
})
