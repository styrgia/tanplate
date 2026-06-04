import { Slider as BaseSlider } from '@base-ui/react/slider'

import { composeClassName } from '../shared/classes'

const rootClassName = 'flex w-64 flex-col gap-2 text-zinc-950'

const labelClassName = 'text-sm font-medium'

const valueClassName = 'text-xs font-medium text-zinc-500'

const controlClassName = 'flex h-5 touch-none items-center'

const trackClassName = 'relative h-2 w-full rounded-full bg-zinc-200'

const indicatorClassName = 'absolute h-full rounded-full bg-zinc-950'

const thumbClassName = `
  block size-5 rounded-full border border-zinc-300 bg-white shadow-sm transition
  focus-visible:ring-2 focus-visible:ring-emerald-600
  focus-visible:ring-offset-2 focus-visible:outline-none
  data-disabled:cursor-not-allowed data-disabled:opacity-50
`

export const Root = ({ className, ...props }: BaseSlider.Root.Props) => (
    <BaseSlider.Root
        className={composeClassName<BaseSlider.Root.State>(rootClassName, className)}
        {...props}
    />
)

export const Label = ({ className, ...props }: BaseSlider.Label.Props) => (
    <BaseSlider.Label
        className={composeClassName<BaseSlider.Label.State>(labelClassName, className)}
        {...props}
    />
)

export const Value = ({ className, ...props }: BaseSlider.Value.Props) => (
    <BaseSlider.Value
        className={composeClassName<BaseSlider.Value.State>(valueClassName, className)}
        {...props}
    />
)

export const Control = ({ className, ...props }: BaseSlider.Control.Props) => (
    <BaseSlider.Control
        className={composeClassName<BaseSlider.Control.State>(controlClassName, className)}
        {...props}
    />
)

export const Track = ({ className, ...props }: BaseSlider.Track.Props) => (
    <BaseSlider.Track
        className={composeClassName<BaseSlider.Track.State>(trackClassName, className)}
        {...props}
    />
)

export const Indicator = ({ className, ...props }: BaseSlider.Indicator.Props) => (
    <BaseSlider.Indicator
        className={composeClassName<BaseSlider.Indicator.State>(indicatorClassName, className)}
        {...props}
    />
)

export const Thumb = ({ className, ...props }: BaseSlider.Thumb.Props) => (
    <BaseSlider.Thumb
        className={composeClassName<BaseSlider.Thumb.State>(thumbClassName, className)}
        {...props}
    />
)
