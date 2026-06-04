import { Popover as BasePopover } from '@base-ui/react/popover'

import { composeClassName } from '../shared/classes'

const triggerClassName = `
  inline-flex h-10 items-center justify-center gap-2 rounded-md border
  border-transparent bg-zinc-950 px-4 text-sm font-semibold whitespace-nowrap
  text-white transition
  hover:bg-zinc-800
  focus-visible:ring-2 focus-visible:ring-emerald-600
  focus-visible:ring-offset-2 focus-visible:outline-none
  active:bg-zinc-700
  disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-500
  data-disabled:cursor-not-allowed data-disabled:bg-zinc-200
  data-disabled:text-zinc-500
`

const positionerClassName = 'z-50 outline-none'

const popupClassName = `
  z-50 w-72 rounded-md border border-zinc-200 bg-white p-4 text-zinc-950
  shadow-lg transition-[opacity,scale] duration-150 outline-none
  data-ending-style:scale-[0.98] data-ending-style:opacity-0
  data-starting-style:scale-[0.98] data-starting-style:opacity-0
`

const arrowClassName = `
  flex text-white drop-shadow-sm
  data-[side=bottom]:-top-2
  data-[side=left]:-right-2
  data-[side=right]:-left-2
  data-[side=top]:-bottom-2
`

const backdropClassName = `
  fixed inset-0 z-40 bg-transparent transition-opacity duration-150
  data-ending-style:opacity-0
  data-starting-style:opacity-0
`

const titleClassName = 'text-sm font-semibold'

const descriptionClassName = 'mt-1 text-sm/6 text-zinc-600'

export const Root = BasePopover.Root
export const Portal = BasePopover.Portal
export const Viewport = BasePopover.Viewport

export const Trigger = ({ className, ...props }: BasePopover.Trigger.Props) => (
    <BasePopover.Trigger
        className={composeClassName<BasePopover.Trigger.State>(triggerClassName, className)}
        {...props}
    />
)

export const Positioner = ({
    className,
    sideOffset = 8,
    ...props
}: BasePopover.Positioner.Props) => (
    <BasePopover.Positioner
        className={composeClassName<BasePopover.Positioner.State>(positionerClassName, className)}
        sideOffset={sideOffset}
        {...props}
    />
)

export const Popup = ({ className, ...props }: BasePopover.Popup.Props) => (
    <BasePopover.Popup
        className={composeClassName<BasePopover.Popup.State>(popupClassName, className)}
        {...props}
    />
)

export const Arrow = ({ className, ...props }: BasePopover.Arrow.Props) => (
    <BasePopover.Arrow
        className={composeClassName<BasePopover.Arrow.State>(arrowClassName, className)}
        {...props}
    />
)

export const Backdrop = ({ className, ...props }: BasePopover.Backdrop.Props) => (
    <BasePopover.Backdrop
        className={composeClassName<BasePopover.Backdrop.State>(backdropClassName, className)}
        {...props}
    />
)

export const Title = ({ className, ...props }: BasePopover.Title.Props) => (
    <BasePopover.Title
        className={composeClassName<BasePopover.Title.State>(titleClassName, className)}
        {...props}
    />
)

export const Description = ({ className, ...props }: BasePopover.Description.Props) => (
    <BasePopover.Description
        className={composeClassName<BasePopover.Description.State>(descriptionClassName, className)}
        {...props}
    />
)

export const Close = ({ className, ...props }: BasePopover.Close.Props) => (
    <BasePopover.Close
        className={composeClassName<BasePopover.Close.State>(triggerClassName, className)}
        {...props}
    />
)

export const Handle = BasePopover.Handle
export const createHandle = BasePopover.createHandle
