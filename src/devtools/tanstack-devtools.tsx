import { formDevtoolsPlugin } from '@tanstack/react-form-devtools'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

export default function AppTanStackDevtools() {
    return (
        <TanStackDevtools
            config={{
                position: 'bottom-right',
            }}
            plugins={[
                {
                    name: 'TanStack Query',
                    render: <ReactQueryDevtoolsPanel />,
                },
                {
                    name: 'TanStack Router',
                    render: <TanStackRouterDevtoolsPanel />,
                },
                formDevtoolsPlugin(),
            ]}
        />
    )
}
