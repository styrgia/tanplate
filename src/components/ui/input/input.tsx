import { Input as BaseInput } from '@base-ui/react/input'
import { cva } from 'class-variance-authority'

import { composeClassName } from '../shared/classes'

const inputVariants = cva(
    'h-10 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-950 transition placeholder:text-zinc-400 focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-500 data-disabled:cursor-not-allowed data-disabled:bg-zinc-100 data-disabled:text-zinc-500',
)

export const Input = ({ className, ...props }: BaseInput.Props) => (
    <BaseInput
        className={composeClassName<BaseInput.State>(inputVariants(), className)}
        {...props}
    />
)
