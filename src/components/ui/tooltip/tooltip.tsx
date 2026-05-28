import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import { cva } from 'class-variance-authority'

import { composeClassName } from '../shared/classes'

const triggerVariants = cva(
    'inline-flex h-10 items-center justify-center gap-2 rounded-md border border-transparent bg-zinc-950 px-4 text-sm font-semibold whitespace-nowrap text-white transition hover:bg-zinc-800 active:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-500 data-disabled:cursor-not-allowed data-disabled:bg-zinc-200 data-disabled:text-zinc-500',
)

const positionerVariants = cva('z-50 outline-none')

const popupVariants = cva(
    'z-50 rounded-md border border-zinc-200 bg-white px-2 py-1 text-xs font-medium text-zinc-950 shadow-lg outline-none transition-[opacity,scale] duration-150 data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0',
)

const arrowVariants = cva(
    'flex text-white drop-shadow-sm data-[side=bottom]:-top-2 data-[side=left]:-right-2 data-[side=right]:-left-2 data-[side=top]:-bottom-2',
)

export const Provider = BaseTooltip.Provider
export const Root = BaseTooltip.Root
export const Portal = BaseTooltip.Portal
export const Viewport = BaseTooltip.Viewport

export const Trigger = ({ className, ...props }: BaseTooltip.Trigger.Props) => (
    <BaseTooltip.Trigger
        className={composeClassName<BaseTooltip.Trigger.State>(triggerVariants(), className)}
        {...props}
    />
)

export const Positioner = ({
    className,
    sideOffset = 8,
    ...props
}: BaseTooltip.Positioner.Props) => (
    <BaseTooltip.Positioner
        className={composeClassName<BaseTooltip.Positioner.State>(positionerVariants(), className)}
        sideOffset={sideOffset}
        {...props}
    />
)

export const Popup = ({ className, ...props }: BaseTooltip.Popup.Props) => (
    <BaseTooltip.Popup
        className={composeClassName<BaseTooltip.Popup.State>(popupVariants(), className)}
        {...props}
    />
)

export const Arrow = ({ className, ...props }: BaseTooltip.Arrow.Props) => (
    <BaseTooltip.Arrow
        className={composeClassName<BaseTooltip.Arrow.State>(arrowVariants(), className)}
        {...props}
    />
)

export const Handle = BaseTooltip.Handle
export const createHandle = BaseTooltip.createHandle
