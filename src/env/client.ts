import '@tanstack/react-start/client-only'

import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

type ClientRuntimeEnv = {
    VITE_SENTRY_DSN?: string
}

function readClientRuntimeEnv(): ClientRuntimeEnv {
    return {
        VITE_SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
    }
}

export function createClientEnv(runtimeEnv: ClientRuntimeEnv = readClientRuntimeEnv()) {
    return createEnv({
        clientPrefix: 'VITE_',
        client: {
            VITE_SENTRY_DSN: z.string().url().optional(),
        },
        runtimeEnv: {
            VITE_SENTRY_DSN: runtimeEnv.VITE_SENTRY_DSN,
        },
        emptyStringAsUndefined: true,
        isServer: false,
    })
}

export const clientEnv = createClientEnv()
