import { expect, test } from 'vitest'

import { cn } from './classes'

test('combines conditional class values and merges Tailwind conflicts', () => {
    expect(
        cn(
            'bg-white px-2 py-1',
            ['text-sm', false, 'font-medium'],
            {
                'bg-white': true,
                'bg-zinc-950': true,
                hidden: false,
            },
            'px-4',
        ),
    ).toBe('py-1 text-sm font-medium bg-zinc-950 px-4')
})
