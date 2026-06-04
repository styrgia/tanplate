import { Drawer as BaseDrawer } from '@base-ui/react/drawer'
import { X } from 'lucide-react'

import { composeClassName } from '../shared/classes'

const triggerClassName = `
  inline-flex h-10 items-center justify-center rounded-md bg-zinc-950 px-4
  text-sm font-medium whitespace-nowrap text-white transition
  hover:bg-zinc-800
  focus-visible:ring-2 focus-visible:ring-emerald-600
  focus-visible:ring-offset-2 focus-visible:outline-none
  active:bg-zinc-700
  disabled:pointer-events-none disabled:opacity-50
  data-disabled:pointer-events-none data-disabled:opacity-50
`

const backdropClassName = `
  fixed inset-0 z-40 bg-black/45 transition-opacity duration-200
  data-ending-style:opacity-0
  data-starting-style:opacity-0
`

const viewportClassName = `
  fixed inset-x-0 bottom-0 z-50 flex max-h-screen justify-center outline-none
`

const popupClassName = `
  max-h-[85vh] w-full max-w-xl rounded-t-lg border border-zinc-200 bg-white p-6
  text-zinc-950 shadow-lg transition-transform duration-200 outline-none
  data-ending-style:translate-y-full
  data-starting-style:translate-y-full
`

const contentClassName = 'text-sm/6 text-zinc-600'

const titleClassName = 'text-lg font-semibold'

const descriptionClassName = 'mt-1 text-sm/6 text-zinc-600'

const closeIconClassName = `
  absolute top-4 right-4 inline-flex size-8 items-center justify-center
  rounded-md text-zinc-500 transition
  hover:bg-zinc-100 hover:text-zinc-950
  focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none
`

const closeTextClassName = `
  inline-flex h-10 items-center justify-center rounded-md border border-zinc-200
  bg-white px-4 text-sm font-medium whitespace-nowrap text-zinc-950 transition
  hover:bg-zinc-50
  focus-visible:ring-2 focus-visible:ring-emerald-600
  focus-visible:ring-offset-2 focus-visible:outline-none
  active:bg-zinc-100
  disabled:pointer-events-none disabled:opacity-50
  data-disabled:pointer-events-none data-disabled:opacity-50
`

const indentClassName = 'pl-4'

const indentBackgroundClassName = 'bg-zinc-100'

const swipeAreaClassName = 'fixed inset-x-0 bottom-0 z-50 h-10'

export const Root = BaseDrawer.Root
export const Provider = BaseDrawer.Provider
export const Portal = BaseDrawer.Portal
export const Handle = BaseDrawer.Handle
export const createHandle = BaseDrawer.createHandle

export const Trigger = ({ className, ...props }: BaseDrawer.Trigger.Props) => (
    <BaseDrawer.Trigger
        className={composeClassName<BaseDrawer.Trigger.State>(triggerClassName, className)}
        {...props}
    />
)

export const Backdrop = ({ className, ...props }: BaseDrawer.Backdrop.Props) => (
    <BaseDrawer.Backdrop
        className={composeClassName<BaseDrawer.Backdrop.State>(backdropClassName, className)}
        {...props}
    />
)

export const Viewport = ({ className, ...props }: BaseDrawer.Viewport.Props) => (
    <BaseDrawer.Viewport
        className={composeClassName<BaseDrawer.Viewport.State>(viewportClassName, className)}
        {...props}
    />
)

export const Popup = ({ className, ...props }: BaseDrawer.Popup.Props) => (
    <BaseDrawer.Popup
        className={composeClassName<BaseDrawer.Popup.State>(popupClassName, className)}
        {...props}
    />
)

export const Content = ({ className, ...props }: BaseDrawer.Content.Props) => (
    <BaseDrawer.Content
        className={composeClassName<BaseDrawer.Content.State>(contentClassName, className)}
        {...props}
    />
)

export const Title = ({ className, ...props }: BaseDrawer.Title.Props) => (
    <BaseDrawer.Title
        className={composeClassName<BaseDrawer.Title.State>(titleClassName, className)}
        {...props}
    />
)

export const Description = ({ className, ...props }: BaseDrawer.Description.Props) => (
    <BaseDrawer.Description
        className={composeClassName<BaseDrawer.Description.State>(descriptionClassName, className)}
        {...props}
    />
)

export function Close({ children, className, type = 'button', ...props }: BaseDrawer.Close.Props) {
    const hasChildren = children != null

    return (
        <BaseDrawer.Close
            className={composeClassName<BaseDrawer.Close.State>(
                hasChildren ? closeTextClassName : closeIconClassName,
                className,
            )}
            type={type}
            {...props}
        >
            {children ?? <X aria-hidden="true" className="size-4" />}
        </BaseDrawer.Close>
    )
}

export const Indent = ({ className, ...props }: BaseDrawer.Indent.Props) => (
    <BaseDrawer.Indent
        className={composeClassName<BaseDrawer.Indent.State>(indentClassName, className)}
        {...props}
    />
)

export const IndentBackground = ({ className, ...props }: BaseDrawer.IndentBackground.Props) => (
    <BaseDrawer.IndentBackground
        className={composeClassName<BaseDrawer.IndentBackground.State>(
            indentBackgroundClassName,
            className,
        )}
        {...props}
    />
)

export const SwipeArea = ({ className, ...props }: BaseDrawer.SwipeArea.Props) => (
    <BaseDrawer.SwipeArea
        className={composeClassName<BaseDrawer.SwipeArea.State>(swipeAreaClassName, className)}
        {...props}
    />
)
