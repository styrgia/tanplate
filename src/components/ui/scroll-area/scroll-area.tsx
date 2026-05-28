import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area'
import { cva } from 'class-variance-authority'

import { composeClassName } from '../shared/classes'

const rootVariants = cva('relative overflow-hidden rounded-md border border-zinc-200 bg-white')

const viewportVariants = cva('h-full w-full outline-none')

const contentVariants = cva('text-sm leading-6 text-zinc-700')

const scrollbarVariants = cva(
    'flex touch-none bg-zinc-100 p-0.5 transition-colors select-none data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5',
)

const thumbVariants = cva('relative flex-1 rounded-full bg-zinc-400')

const cornerVariants = cva('bg-zinc-100')

export const Root = ({ className, ...props }: BaseScrollArea.Root.Props) => (
    <BaseScrollArea.Root
        className={composeClassName<BaseScrollArea.Root.State>(rootVariants(), className)}
        {...props}
    />
)

export const Viewport = ({ className, ...props }: BaseScrollArea.Viewport.Props) => (
    <BaseScrollArea.Viewport
        className={composeClassName<BaseScrollArea.Viewport.State>(viewportVariants(), className)}
        {...props}
    />
)

export const Content = ({ className, ...props }: BaseScrollArea.Content.Props) => (
    <BaseScrollArea.Content
        className={composeClassName<BaseScrollArea.Content.State>(contentVariants(), className)}
        {...props}
    />
)

export const Scrollbar = ({ className, ...props }: BaseScrollArea.Scrollbar.Props) => (
    <BaseScrollArea.Scrollbar
        className={composeClassName<BaseScrollArea.Scrollbar.State>(scrollbarVariants(), className)}
        {...props}
    />
)

export const Thumb = ({ className, ...props }: BaseScrollArea.Thumb.Props) => (
    <BaseScrollArea.Thumb
        className={composeClassName<BaseScrollArea.Thumb.State>(thumbVariants(), className)}
        {...props}
    />
)

export const Corner = ({ className, ...props }: BaseScrollArea.Corner.Props) => (
    <BaseScrollArea.Corner
        className={composeClassName<BaseScrollArea.Corner.State>(cornerVariants(), className)}
        {...props}
    />
)
