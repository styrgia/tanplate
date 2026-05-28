import { defineConfig, type UserConfig } from '@hey-api/openapi-ts'

function clientPlugins(): NonNullable<UserConfig['plugins']> {
    return [
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
    ]
}

const apiConfigs = [
    {
        input: './src/api/openapi/dist/catalog.yaml',
        output: 'src/api/generated/catalog',
        plugins: clientPlugins(),
    },
    {
        input: './src/api/openapi/dist/orders.yaml',
        output: 'src/api/generated/orders',
        plugins: clientPlugins(),
    },
] satisfies ReadonlyArray<UserConfig>

export default defineConfig(apiConfigs)
