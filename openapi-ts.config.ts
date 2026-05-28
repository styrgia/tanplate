import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
    input: './src/api/openapi/openapi.yaml',
    output: 'src/api/generated',
    plugins: [
        '@hey-api/client-fetch',
        '@hey-api/typescript',
        'zod',
        {
            name: '@hey-api/sdk',
            validator: {
                request: 'zod',
                response: 'zod',
            },
        },
        {
            name: '@tanstack/react-query',
            mutationKeys: {
                tags: true,
            },
            mutationOptions: true,
            queryKeys: {
                tags: true,
            },
            queryOptions: true,
            useMutation: true,
            useQuery: true,
        },
    ],
})
