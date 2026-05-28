import { expect, test, vi } from 'vitest'
import { render } from 'vitest-browser-react'

import '#/styles.css'
import { Button } from '.'

test('clicks without submitting a surrounding form by default', async () => {
    const onClick = vi.fn<() => void>()
    const onSubmit = vi.fn<() => void>()
    const screen = await render(
        <form
            onSubmit={(event) => {
                event.preventDefault()
                onSubmit()
            }}
        >
            <Button onClick={onClick}>Save changes</Button>
        </form>,
    )

    await screen.getByRole('button', { name: 'Save changes' }).click()

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onSubmit).not.toHaveBeenCalled()
})
