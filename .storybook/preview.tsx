import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { Preview } from '@storybook/tanstack-react'

import '../src/styles.css'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            staleTime: Infinity,
        },
    },
})

const preview: Preview = {
    beforeEach: () => {
        queryClient.clear()
    },
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        docs: {
            codePanel: true,
            source: {
                type: 'dynamic',
                transform: (source: string) =>
                    source
                        .replaceAll(/\n\s*data-tsd-source="[^"]*"/g, '')
                        .replaceAll(/\sdata-tsd-source="[^"]*"/g, ''),
            },
        },
        tanstack: {
            router: {
                context: { queryClient },
            },
        },
    },
    decorators: [
        (Story) => (
            <QueryClientProvider client={queryClient}>
                <Story />
            </QueryClientProvider>
        ),
    ],
}

export default preview
