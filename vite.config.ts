import { defineConfig, loadEnv } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

import { resolveSitemapHost } from './src/seo/sitemap'

const config = defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    const siteUrl = resolveSitemapHost(env)

    return {
        define: {
            'import.meta.env.VITE_SITE_URL': JSON.stringify(siteUrl),
        },
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
            tanstackStart({
                prerender: {
                    enabled: true,
                    autoStaticPathsDiscovery: true,
                    crawlLinks: true,
                },
                sitemap: {
                    enabled: true,
                    host: siteUrl,
                },
            }),
            nitro({
                preset: 'bun',
                // Start prerender runs Vite preview under Node during builds.
                // Keep SSR dependencies on Node-compatible exports while emitting Bun output.
                exportConditions: ['!bun'],
                rollupConfig: { external: [/^@sentry\//] },
            }),
            tailwindcss(),
            viteReact(),
        ],
    }
})

export default config
