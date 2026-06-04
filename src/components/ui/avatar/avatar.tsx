import { Avatar as BaseAvatar } from '@base-ui/react/avatar'

import { composeClassName } from '../shared/classes'

const rootClassName = `
  inline-flex size-10 items-center justify-center overflow-hidden rounded-full
  bg-zinc-100 text-sm font-medium text-zinc-700
`

const imageClassName = 'size-full object-cover'

const fallbackClassName = `
  flex size-full items-center justify-center bg-zinc-100
`

export const Root = ({ className, ...props }: BaseAvatar.Root.Props) => (
    <BaseAvatar.Root
        className={composeClassName<BaseAvatar.Root.State>(rootClassName, className)}
        {...props}
    />
)

export const Image = ({ className, ...props }: BaseAvatar.Image.Props) => (
    <BaseAvatar.Image
        className={composeClassName<BaseAvatar.Image.State>(imageClassName, className)}
        {...props}
    />
)

export const Fallback = ({ className, ...props }: BaseAvatar.Fallback.Props) => (
    <BaseAvatar.Fallback
        className={composeClassName<BaseAvatar.Fallback.State>(fallbackClassName, className)}
        {...props}
    />
)
