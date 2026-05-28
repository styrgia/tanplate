import '@tanstack/react-start/server-only'

import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

type ServerRuntimeEnv = {
    AUTH_BACKEND_URL?: string
    AUTH_GITHUB_CLIENT_ID?: string
    AUTH_GITHUB_CLIENT_SECRET?: string
    AUTH_GITHUB_REDIRECT_URI?: string
    AUTH_GITHUB_SCOPES?: string
    AUTH_GOOGLE_CLIENT_ID?: string
    AUTH_GOOGLE_CLIENT_SECRET?: string
    AUTH_GOOGLE_REDIRECT_URI?: string
    AUTH_GOOGLE_SCOPES?: string
    AUTH_VK_CLIENT_ID?: string
    AUTH_VK_CLIENT_SECRET?: string
    AUTH_VK_REDIRECT_URI?: string
    AUTH_VK_SCOPES?: string
    AUTH_YANDEX_CLIENT_ID?: string
    AUTH_YANDEX_CLIENT_SECRET?: string
    AUTH_YANDEX_REDIRECT_URI?: string
    AUTH_YANDEX_SCOPES?: string
    NODE_ENV?: string
    SENTRY_AUTH_TOKEN?: string
    SENTRY_ORG?: string
    SENTRY_PROJECT?: string
    SITE_URL?: string
    SKIP_ENV_VALIDATION?: string
    VITE_SENTRY_DSN?: string
}

function readServerRuntimeEnv(): ServerRuntimeEnv {
    return process.env
}

export function createServerEnv(runtimeEnv: ServerRuntimeEnv = readServerRuntimeEnv()) {
    return createEnv({
        server: {
            AUTH_BACKEND_URL: z.string().url().optional(),
            AUTH_GITHUB_CLIENT_ID: z.string().min(1).optional(),
            AUTH_GITHUB_CLIENT_SECRET: z.string().min(1).optional(),
            AUTH_GITHUB_REDIRECT_URI: z.string().url().optional(),
            AUTH_GITHUB_SCOPES: z.string().min(1).optional(),
            AUTH_GOOGLE_CLIENT_ID: z.string().min(1).optional(),
            AUTH_GOOGLE_CLIENT_SECRET: z.string().min(1).optional(),
            AUTH_GOOGLE_REDIRECT_URI: z.string().url().optional(),
            AUTH_GOOGLE_SCOPES: z.string().min(1).optional(),
            AUTH_VK_CLIENT_ID: z.string().min(1).optional(),
            AUTH_VK_CLIENT_SECRET: z.string().min(1).optional(),
            AUTH_VK_REDIRECT_URI: z.string().url().optional(),
            AUTH_VK_SCOPES: z.string().min(1).optional(),
            AUTH_YANDEX_CLIENT_ID: z.string().min(1).optional(),
            AUTH_YANDEX_CLIENT_SECRET: z.string().min(1).optional(),
            AUTH_YANDEX_REDIRECT_URI: z.string().url().optional(),
            AUTH_YANDEX_SCOPES: z.string().min(1).optional(),
            SENTRY_AUTH_TOKEN: z.string().min(1).optional(),
            SENTRY_ORG: z.string().min(1).optional(),
            SENTRY_PROJECT: z.string().min(1).optional(),
            SITE_URL: z.string().url().optional(),
            VITE_SENTRY_DSN: z.string().url().optional(),
        },
        shared: {
            NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
        },
        runtimeEnv: {
            AUTH_BACKEND_URL: runtimeEnv.AUTH_BACKEND_URL,
            AUTH_GITHUB_CLIENT_ID: runtimeEnv.AUTH_GITHUB_CLIENT_ID,
            AUTH_GITHUB_CLIENT_SECRET: runtimeEnv.AUTH_GITHUB_CLIENT_SECRET,
            AUTH_GITHUB_REDIRECT_URI: runtimeEnv.AUTH_GITHUB_REDIRECT_URI,
            AUTH_GITHUB_SCOPES: runtimeEnv.AUTH_GITHUB_SCOPES,
            AUTH_GOOGLE_CLIENT_ID: runtimeEnv.AUTH_GOOGLE_CLIENT_ID,
            AUTH_GOOGLE_CLIENT_SECRET: runtimeEnv.AUTH_GOOGLE_CLIENT_SECRET,
            AUTH_GOOGLE_REDIRECT_URI: runtimeEnv.AUTH_GOOGLE_REDIRECT_URI,
            AUTH_GOOGLE_SCOPES: runtimeEnv.AUTH_GOOGLE_SCOPES,
            AUTH_VK_CLIENT_ID: runtimeEnv.AUTH_VK_CLIENT_ID,
            AUTH_VK_CLIENT_SECRET: runtimeEnv.AUTH_VK_CLIENT_SECRET,
            AUTH_VK_REDIRECT_URI: runtimeEnv.AUTH_VK_REDIRECT_URI,
            AUTH_VK_SCOPES: runtimeEnv.AUTH_VK_SCOPES,
            AUTH_YANDEX_CLIENT_ID: runtimeEnv.AUTH_YANDEX_CLIENT_ID,
            AUTH_YANDEX_CLIENT_SECRET: runtimeEnv.AUTH_YANDEX_CLIENT_SECRET,
            AUTH_YANDEX_REDIRECT_URI: runtimeEnv.AUTH_YANDEX_REDIRECT_URI,
            AUTH_YANDEX_SCOPES: runtimeEnv.AUTH_YANDEX_SCOPES,
            NODE_ENV: runtimeEnv.NODE_ENV,
            SENTRY_AUTH_TOKEN: runtimeEnv.SENTRY_AUTH_TOKEN,
            SENTRY_ORG: runtimeEnv.SENTRY_ORG,
            SENTRY_PROJECT: runtimeEnv.SENTRY_PROJECT,
            SITE_URL: runtimeEnv.SITE_URL,
            VITE_SENTRY_DSN: runtimeEnv.VITE_SENTRY_DSN,
        },
        emptyStringAsUndefined: true,
        skipValidation: runtimeEnv.SKIP_ENV_VALIDATION === 'true',
    })
}

export const serverEnv = createServerEnv()
