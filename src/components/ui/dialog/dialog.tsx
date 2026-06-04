import { Dialog as BaseDialog } from '@base-ui/react/dialog'

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

const backdropClassName = `
  fixed inset-0 z-40 bg-zinc-950/20 transition-opacity duration-150
  data-ending-style:opacity-0
  data-starting-style:opacity-0
`

const popupClassName = `
  fixed top-1/2 left-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-1/2
  rounded-md border border-zinc-200 bg-white p-6 text-zinc-950 shadow-lg
  transition-[opacity,scale] duration-150 outline-none
  data-ending-style:scale-[0.98] data-ending-style:opacity-0
  data-starting-style:scale-[0.98] data-starting-style:opacity-0
`

const titleClassName = 'text-lg font-semibold'

const descriptionClassName = 'mt-1 text-sm/6 text-zinc-600'

export const Root = BaseDialog.Root
export const Portal = BaseDialog.Portal
export const Viewport = BaseDialog.Viewport

export const Trigger = ({ className, ...props }: BaseDialog.Trigger.Props) => (
    <BaseDialog.Trigger
        className={composeClassName<BaseDialog.Trigger.State>(triggerClassName, className)}
        {...props}
    />
)

export const Backdrop = ({ className, ...props }: BaseDialog.Backdrop.Props) => (
    <BaseDialog.Backdrop
        className={composeClassName<BaseDialog.Backdrop.State>(backdropClassName, className)}
        {...props}
    />
)

export const Popup = ({ className, ...props }: BaseDialog.Popup.Props) => (
    <BaseDialog.Popup
        className={composeClassName<BaseDialog.Popup.State>(popupClassName, className)}
        {...props}
    />
)

export const Title = ({ className, ...props }: BaseDialog.Title.Props) => (
    <BaseDialog.Title
        className={composeClassName<BaseDialog.Title.State>(titleClassName, className)}
        {...props}
    />
)

export const Description = ({ className, ...props }: BaseDialog.Description.Props) => (
    <BaseDialog.Description
        className={composeClassName<BaseDialog.Description.State>(descriptionClassName, className)}
        {...props}
    />
)

export const Close = ({ className, ...props }: BaseDialog.Close.Props) => (
    <BaseDialog.Close
        className={composeClassName<BaseDialog.Close.State>(triggerClassName, className)}
        {...props}
    />
)
