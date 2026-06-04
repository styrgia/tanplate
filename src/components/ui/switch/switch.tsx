import { Switch as BaseSwitch } from '@base-ui/react/switch'

import { composeClassName } from '../shared/classes'

const rootClassName = `
  inline-flex h-6 w-10 shrink-0 items-center rounded-full border border-zinc-300
  bg-zinc-200 p-0.5 transition
  focus-visible:ring-2 focus-visible:ring-emerald-600
  focus-visible:ring-offset-2 focus-visible:outline-none
  data-checked:border-zinc-950 data-checked:bg-zinc-950
  data-disabled:cursor-not-allowed data-disabled:opacity-50
`

const thumbClassName = `
  size-5 rounded-full bg-white shadow-sm transition-transform
  data-checked:translate-x-4
`

export const Root = ({ className, ...props }: BaseSwitch.Root.Props) => (
    <BaseSwitch.Root
        className={composeClassName<BaseSwitch.Root.State>(rootClassName, className)}
        {...props}
    />
)

export const Thumb = ({ className, ...props }: BaseSwitch.Thumb.Props) => (
    <BaseSwitch.Thumb
        className={composeClassName<BaseSwitch.Thumb.State>(thumbClassName, className)}
        {...props}
    />
)
