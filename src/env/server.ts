import '@tanstack/react-start/server-only'

import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

type ServerRuntimeEnv = {
    NODE_ENV?: string
    SENTRY_AUTH_TOKEN?: string
    SENTRY_ORG?: string
    SENTRY_PROJECT?: string
    SKIP_ENV_VALIDATION?: string
    VITE_SENTRY_DSN?: string
}

function readServerRuntimeEnv(): ServerRuntimeEnv {
    return process.env
}

export function createServerEnv(runtimeEnv: ServerRuntimeEnv = readServerRuntimeEnv()) {
    return createEnv({
        server: {
            SENTRY_AUTH_TOKEN: z.string().min(1).optional(),
            SENTRY_ORG: z.string().min(1).optional(),
            SENTRY_PROJECT: z.string().min(1).optional(),
            VITE_SENTRY_DSN: z.string().url().optional(),
        },
        shared: {
            NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
        },
        runtimeEnv: {
            NODE_ENV: runtimeEnv.NODE_ENV,
            SENTRY_AUTH_TOKEN: runtimeEnv.SENTRY_AUTH_TOKEN,
            SENTRY_ORG: runtimeEnv.SENTRY_ORG,
            SENTRY_PROJECT: runtimeEnv.SENTRY_PROJECT,
            VITE_SENTRY_DSN: runtimeEnv.VITE_SENTRY_DSN,
        },
        emptyStringAsUndefined: true,
        skipValidation: runtimeEnv.SKIP_ENV_VALIDATION === 'true',
    })
}

export const serverEnv = createServerEnv()
