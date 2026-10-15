import { adapterOas } from '@kubb/adapter-oas'
import { pluginFetch } from '@kubb/plugin-fetch'
import { pluginReactQuery } from '@kubb/plugin-react-query'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginZod } from '@kubb/plugin-zod'
import { defineConfig } from 'kubb/config'

export default defineConfig(
    ['catalog', 'orders'].map((name) => ({
        name,
        input: `./src/api/openapi/${name}/openapi.yaml`,
        output: {
            path: `./src/api/generated/${name}`,
            clean: true,
            barrel: false,
        },
        adapter: adapterOas({
            dateType: 'string',
            emptySchemaType: 'unknown',
            integerType: 'number',
            unknownType: 'unknown',
        }),
        plugins: [
            pluginTs({
                enum: { constCasing: 'pascalCase', type: 'asConst', typeSuffix: '' },
                output: { path: 'types', barrel: { type: 'named' } },
            }),
            pluginZod({ output: { path: 'schemas', barrel: { type: 'named' } } }),
            pluginFetch({
                output: { path: 'clients', barrel: { type: 'named' } },
                throwOnErrorDefault: false,
                validator: { request: 'zod', response: 'zod' },
            }),
            pluginReactQuery({
                client: 'fetch',
                output: { path: 'query', barrel: { type: 'named' } },
                hooks: true,
            }),
        ],
    })),
)
