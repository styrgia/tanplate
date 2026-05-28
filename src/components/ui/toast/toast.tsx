import { Toast as BaseToast } from '@base-ui/react/toast'
import { cva } from 'class-variance-authority'
import { X } from 'lucide-react'

import { composeClassName } from '../shared/classes'

const viewportVariants = cva(
    'fixed right-4 bottom-4 z-50 flex w-80 max-w-[calc(100vw-2rem)] flex-col',
)

const rootVariants = cva(
    'mb-3 rounded-md border border-zinc-200 bg-white text-zinc-950 shadow-lg transition-[opacity,transform] duration-150 data-ending-style:translate-y-2 data-ending-style:opacity-0 data-starting-style:translate-y-2 data-starting-style:opacity-0',
)

const contentVariants = cva('grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 p-4')

const titleVariants = cva('text-sm font-semibold')

const descriptionVariants = cva('text-sm leading-5 text-zinc-600')

const closeIconVariants = cva(
    'row-span-2 inline-flex size-7 items-center justify-center rounded-md text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600',
)

const closeTextVariants = cva(
    'inline-flex h-8 items-center justify-center rounded-md border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600',
)

const actionVariants = cva(
    'mt-3 inline-flex h-8 items-center justify-center rounded-md bg-zinc-950 px-3 text-sm font-medium text-white transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2',
)

const positionerVariants = cva('z-50 outline-none')

const arrowVariants = cva('fill-white')

export const Provider = BaseToast.Provider
export const Portal = BaseToast.Portal
export const useToastManager = BaseToast.useToastManager
export const createToastManager = BaseToast.createToastManager

export const Viewport = ({ className, ...props }: BaseToast.Viewport.Props) => (
    <BaseToast.Viewport
        className={composeClassName<BaseToast.Viewport.State>(viewportVariants(), className)}
        {...props}
    />
)

export const Root = ({ className, ...props }: BaseToast.Root.Props) => (
    <BaseToast.Root
        className={composeClassName<BaseToast.Root.State>(rootVariants(), className)}
        {...props}
    />
)

export const Content = ({ className, ...props }: BaseToast.Content.Props) => (
    <BaseToast.Content
        className={composeClassName<BaseToast.Content.State>(contentVariants(), className)}
        {...props}
    />
)

export const Title = ({ className, ...props }: BaseToast.Title.Props) => (
    <BaseToast.Title
        className={composeClassName<BaseToast.Title.State>(titleVariants(), className)}
        {...props}
    />
)

export const Description = ({ className, ...props }: BaseToast.Description.Props) => (
    <BaseToast.Description
        className={composeClassName<BaseToast.Description.State>(descriptionVariants(), className)}
        {...props}
    />
)

export function Close({ children, className, type = 'button', ...props }: BaseToast.Close.Props) {
    const hasChildren = children != null

    return (
        <BaseToast.Close
            className={composeClassName<BaseToast.Close.State>(
                hasChildren ? closeTextVariants() : closeIconVariants(),
                className,
            )}
            type={type}
            {...props}
        >
            {children ?? <X aria-hidden="true" className="size-4" />}
        </BaseToast.Close>
    )
}

export const Action = ({ className, type = 'button', ...props }: BaseToast.Action.Props) => (
    <BaseToast.Action
        className={composeClassName<BaseToast.Action.State>(actionVariants(), className)}
        type={type}
        {...props}
    />
)

export const Positioner = ({ className, ...props }: BaseToast.Positioner.Props) => (
    <BaseToast.Positioner
        className={composeClassName<BaseToast.Positioner.State>(positionerVariants(), className)}
        {...props}
    />
)

export const Arrow = ({ className, ...props }: BaseToast.Arrow.Props) => (
    <BaseToast.Arrow
        className={composeClassName<BaseToast.Arrow.State>(arrowVariants(), className)}
        {...props}
    />
)
