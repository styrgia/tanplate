import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area'

import { composeClassName } from '../shared/classes'

const rootClassName = `
  relative overflow-hidden rounded-md border border-zinc-200 bg-white
`

const viewportClassName = 'size-full outline-none'

const contentClassName = 'text-sm/6 text-zinc-700'

const scrollbarClassName = `
  flex touch-none bg-zinc-100 p-0.5 transition-colors select-none
  data-[orientation=horizontal]:h-2.5
  data-[orientation=vertical]:w-2.5
`

const thumbClassName = 'relative flex-1 rounded-full bg-zinc-400'

const cornerClassName = 'bg-zinc-100'

export const Root = ({ className, ...props }: BaseScrollArea.Root.Props) => (
    <BaseScrollArea.Root
        className={composeClassName<BaseScrollArea.Root.State>(rootClassName, className)}
        {...props}
    />
)

export const Viewport = ({ className, ...props }: BaseScrollArea.Viewport.Props) => (
    <BaseScrollArea.Viewport
        className={composeClassName<BaseScrollArea.Viewport.State>(viewportClassName, className)}
        {...props}
    />
)

export const Content = ({ className, ...props }: BaseScrollArea.Content.Props) => (
    <BaseScrollArea.Content
        className={composeClassName<BaseScrollArea.Content.State>(contentClassName, className)}
        {...props}
    />
)

export const Scrollbar = ({ className, ...props }: BaseScrollArea.Scrollbar.Props) => (
    <BaseScrollArea.Scrollbar
        className={composeClassName<BaseScrollArea.Scrollbar.State>(scrollbarClassName, className)}
        {...props}
    />
)

export const Thumb = ({ className, ...props }: BaseScrollArea.Thumb.Props) => (
    <BaseScrollArea.Thumb
        className={composeClassName<BaseScrollArea.Thumb.State>(thumbClassName, className)}
        {...props}
    />
)

export const Corner = ({ className, ...props }: BaseScrollArea.Corner.Props) => (
    <BaseScrollArea.Corner
        className={composeClassName<BaseScrollArea.Corner.State>(cornerClassName, className)}
        {...props}
    />
)
