import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

const config = defineConfig(({ mode }) => ({
    devtools: mode === 'analyze' ? { enabled: true, environments: ['client'] } : false,
    resolve: { tsconfigPaths: true },
    plugins: [
        devtools(),
        paraglideVitePlugin({
            project: './project.inlang',
            outdir: './src/paraglide',
            outputStructure: 'message-modules',
            emitTsDeclarations: true,
            cookieName: 'PARAGLIDE_LOCALE',
            strategy: ['url', 'cookie', 'preferredLanguage', 'baseLocale'],
            urlPatterns: [
                {
                    pattern: '/:path(.*)?',
                    localized: [
                        ['ru', '/ru/:path(.*)?'],
                        ['en', '/:path(.*)?'],
                    ],
                },
            ],
        }),
        tanstackStart(),
        nitro({ preset: 'bun', rollupConfig: { external: [/^@sentry\//] } }),
        tailwindcss(),
        viteReact(),
    ],
}))

export default config
