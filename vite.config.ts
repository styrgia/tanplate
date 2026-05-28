import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

const config = defineConfig(({ mode }) => ({
    devtools: mode === 'analyze' ? { enabled: true, environments: ['client'] } : false,
    resolve: { tsconfigPaths: true },
    plugins: [
        devtools(),
        tanstackStart(),
        nitro({ preset: 'bun', rollupConfig: { external: [/^@sentry\//] } }),
        tailwindcss(),
        viteReact(),
    ],
}))

export default config
