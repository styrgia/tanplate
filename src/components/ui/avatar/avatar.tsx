import { Avatar as BaseAvatar } from '@base-ui/react/avatar'
import { cva } from 'class-variance-authority'

import { composeClassName } from '../shared/classes'

const rootVariants = cva(
    'inline-flex size-10 items-center justify-center overflow-hidden rounded-full bg-zinc-100 text-sm font-medium text-zinc-700',
)

const imageVariants = cva('size-full object-cover')

const fallbackVariants = cva('flex size-full items-center justify-center bg-zinc-100')

export const Root = ({ className, ...props }: BaseAvatar.Root.Props) => (
    <BaseAvatar.Root
        className={composeClassName<BaseAvatar.Root.State>(rootVariants(), className)}
        {...props}
    />
)

export const Image = ({ className, ...props }: BaseAvatar.Image.Props) => (
    <BaseAvatar.Image
        className={composeClassName<BaseAvatar.Image.State>(imageVariants(), className)}
        {...props}
    />
)

export const Fallback = ({ className, ...props }: BaseAvatar.Fallback.Props) => (
    <BaseAvatar.Fallback
        className={composeClassName<BaseAvatar.Fallback.State>(fallbackVariants(), className)}
        {...props}
    />
)
