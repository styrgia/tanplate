import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { expect, test, vi } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'

import { Home } from './index'

const starterDashboardData = vi.hoisted(() => ({
    checklist: [],
    generatedAt: '2026-05-28T00:00:00.000Z',
    integrations: ['TanStack Start', 'TanStack Query', 'TanStack Form'],
    runtime: 'Bun',
}))

vi.mock('#/features/starter/starter-functions', () => ({
    starterDashboardQueryOptions: () => ({
        queryFn: async () => starterDashboardData,
        queryKey: ['starter-dashboard'],
        staleTime: 60 * 1000,
    }),
    submitProjectNote: vi.fn<() => Promise<unknown>>(),
}))

function renderHome() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    })

    queryClient.setQueryData(['starter-dashboard'], starterDashboardData)

    return render(
        <QueryClientProvider client={queryClient}>
            <Home />
        </QueryClientProvider>,
    )
}

test('renders the starter handoff form on the home page', async () => {
    const screen = await renderHome()

    await expect.element(screen.getByRole('heading', { name: 'Form handoff' })).toBeVisible()
    await expect.element(screen.getByLabelText('Name')).toBeVisible()
    await expect.element(screen.getByLabelText('Next step')).toBeVisible()
    await expect.element(screen.getByRole('button', { name: /Save note|Saving/ })).toBeVisible()

    await screen.getByLabelText('Name').fill('Ada')
    await screen.getByLabelText('Next step').fill('Ship the shared form module')

    await expect.element(screen.getByLabelText('Name')).toHaveValue('Ada')
    await expect
        .element(screen.getByLabelText('Next step'))
        .toHaveValue('Ship the shared form module')
})
