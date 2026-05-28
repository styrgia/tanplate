import { Button as BaseButton } from '@base-ui/react/button'
import { cva } from 'class-variance-authority'

import { composeClassName } from '../shared/classes'

const buttonVariants = cva(
    'inline-flex h-10 items-center justify-center gap-2 rounded-md border border-transparent bg-zinc-950 px-4 text-sm font-semibold whitespace-nowrap text-white transition hover:bg-zinc-800 active:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-500 data-disabled:cursor-not-allowed data-disabled:bg-zinc-200 data-disabled:text-zinc-500',
)

export function Button({ className, type = 'button', ...props }: BaseButton.Props) {
    return (
        <BaseButton
            className={composeClassName<BaseButton.State>(buttonVariants(), className)}
            type={type}
            {...props}
        />
    )
}
