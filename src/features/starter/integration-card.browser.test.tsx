import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'

import { IntegrationCard } from './integration-card'

test('renders integration card content in the browser', async () => {
    const screen = await render(<IntegrationCard integration="TanStack Query" />)

    await expect.element(screen.getByRole('heading', { name: 'TanStack Query' })).toBeVisible()
    await expect
        .element(screen.getByText('Installed and ready for application code.'))
        .toBeVisible()
})
