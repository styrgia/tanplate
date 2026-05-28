import { Drawer as BaseDrawer } from '@base-ui/react/drawer'
import { cva } from 'class-variance-authority'
import { X } from 'lucide-react'

import { composeClassName } from '../shared/classes'

const triggerVariants = cva(
    'inline-flex h-10 items-center justify-center rounded-md bg-zinc-950 px-4 text-sm font-medium whitespace-nowrap text-white transition hover:bg-zinc-800 active:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50',
)

const backdropVariants = cva(
    'fixed inset-0 z-40 bg-black/45 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0',
)

const viewportVariants = cva(
    'fixed inset-x-0 bottom-0 z-50 flex max-h-screen justify-center outline-none',
)

const popupVariants = cva(
    'max-h-[85vh] w-full max-w-xl rounded-t-lg border border-zinc-200 bg-white p-6 text-zinc-950 shadow-lg outline-none transition-transform duration-200 data-ending-style:translate-y-full data-starting-style:translate-y-full',
)

const contentVariants = cva('text-sm leading-6 text-zinc-600')

const titleVariants = cva('text-lg font-semibold')

const descriptionVariants = cva('mt-1 text-sm leading-6 text-zinc-600')

const closeIconVariants = cva(
    'absolute top-4 right-4 inline-flex size-8 items-center justify-center rounded-md text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600',
)

const closeTextVariants = cva(
    'inline-flex h-10 items-center justify-center rounded-md border border-zinc-200 bg-white px-4 text-sm font-medium whitespace-nowrap text-zinc-950 transition hover:bg-zinc-50 active:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50',
)

const indentVariants = cva('pl-4')

const indentBackgroundVariants = cva('bg-zinc-100')

const swipeAreaVariants = cva('fixed inset-x-0 bottom-0 z-50 h-10')

export const Root = BaseDrawer.Root
export const Provider = BaseDrawer.Provider
export const Portal = BaseDrawer.Portal
export const Handle = BaseDrawer.Handle
export const createHandle = BaseDrawer.createHandle

export const Trigger = ({ className, ...props }: BaseDrawer.Trigger.Props) => (
    <BaseDrawer.Trigger
        className={composeClassName<BaseDrawer.Trigger.State>(triggerVariants(), className)}
        {...props}
    />
)

export const Backdrop = ({ className, ...props }: BaseDrawer.Backdrop.Props) => (
    <BaseDrawer.Backdrop
        className={composeClassName<BaseDrawer.Backdrop.State>(backdropVariants(), className)}
        {...props}
    />
)

export const Viewport = ({ className, ...props }: BaseDrawer.Viewport.Props) => (
    <BaseDrawer.Viewport
        className={composeClassName<BaseDrawer.Viewport.State>(viewportVariants(), className)}
        {...props}
    />
)

export const Popup = ({ className, ...props }: BaseDrawer.Popup.Props) => (
    <BaseDrawer.Popup
        className={composeClassName<BaseDrawer.Popup.State>(popupVariants(), className)}
        {...props}
    />
)

export const Content = ({ className, ...props }: BaseDrawer.Content.Props) => (
    <BaseDrawer.Content
        className={composeClassName<BaseDrawer.Content.State>(contentVariants(), className)}
        {...props}
    />
)

export const Title = ({ className, ...props }: BaseDrawer.Title.Props) => (
    <BaseDrawer.Title
        className={composeClassName<BaseDrawer.Title.State>(titleVariants(), className)}
        {...props}
    />
)

export const Description = ({ className, ...props }: BaseDrawer.Description.Props) => (
    <BaseDrawer.Description
        className={composeClassName<BaseDrawer.Description.State>(descriptionVariants(), className)}
        {...props}
    />
)

export function Close({ children, className, type = 'button', ...props }: BaseDrawer.Close.Props) {
    const hasChildren = children != null

    return (
        <BaseDrawer.Close
            className={composeClassName<BaseDrawer.Close.State>(
                hasChildren ? closeTextVariants() : closeIconVariants(),
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
        className={composeClassName<BaseDrawer.Indent.State>(indentVariants(), className)}
        {...props}
    />
)

export const IndentBackground = ({ className, ...props }: BaseDrawer.IndentBackground.Props) => (
    <BaseDrawer.IndentBackground
        className={composeClassName<BaseDrawer.IndentBackground.State>(
            indentBackgroundVariants(),
            className,
        )}
        {...props}
    />
)

export const SwipeArea = ({ className, ...props }: BaseDrawer.SwipeArea.Props) => (
    <BaseDrawer.SwipeArea
        className={composeClassName<BaseDrawer.SwipeArea.State>(swipeAreaVariants(), className)}
        {...props}
    />
)
