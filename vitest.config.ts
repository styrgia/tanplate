import { fileURLToPath } from 'node:url'
import viteReact from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    plugins: [viteReact()],
    resolve: {
        alias: {
            '#': fileURLToPath(new URL('src', import.meta.url)),
        },
    },
    test: {
        passWithNoTests: true,
        projects: [
            {
                test: {
                    name: 'unit',
                    environment: 'node',
                    include: ['src/**/*.unit.{test,spec}.ts'],
                },
            },
            {
                test: {
                    name: 'browser',
                    include: ['src/**/*.browser.{test,spec}.tsx'],
                    browser: {
                        enabled: true,
                        provider: playwright(),
                        headless: true,
                        instances: [{ browser: 'chromium' }],
                    },
                },
            },
        ],
    },
})
