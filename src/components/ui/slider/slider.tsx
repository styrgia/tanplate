import { Slider as BaseSlider } from '@base-ui/react/slider'
import { cva } from 'class-variance-authority'

import { composeClassName } from '../shared/classes'

const rootVariants = cva('flex w-64 flex-col gap-2 text-zinc-950')

const labelVariants = cva('text-sm font-medium')

const valueVariants = cva('text-xs font-medium text-zinc-500')

const controlVariants = cva('flex h-5 touch-none items-center')

const trackVariants = cva('relative h-2 w-full rounded-full bg-zinc-200')

const indicatorVariants = cva('absolute h-full rounded-full bg-zinc-950')

const thumbVariants = cva(
    'block size-5 rounded-full border border-zinc-300 bg-white shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 data-disabled:cursor-not-allowed data-disabled:opacity-50',
)

export const Root = ({ className, ...props }: BaseSlider.Root.Props) => (
    <BaseSlider.Root
        className={composeClassName<BaseSlider.Root.State>(rootVariants(), className)}
        {...props}
    />
)

export const Label = ({ className, ...props }: BaseSlider.Label.Props) => (
    <BaseSlider.Label
        className={composeClassName<BaseSlider.Label.State>(labelVariants(), className)}
        {...props}
    />
)

export const Value = ({ className, ...props }: BaseSlider.Value.Props) => (
    <BaseSlider.Value
        className={composeClassName<BaseSlider.Value.State>(valueVariants(), className)}
        {...props}
    />
)

export const Control = ({ className, ...props }: BaseSlider.Control.Props) => (
    <BaseSlider.Control
        className={composeClassName<BaseSlider.Control.State>(controlVariants(), className)}
        {...props}
    />
)

export const Track = ({ className, ...props }: BaseSlider.Track.Props) => (
    <BaseSlider.Track
        className={composeClassName<BaseSlider.Track.State>(trackVariants(), className)}
        {...props}
    />
)

export const Indicator = ({ className, ...props }: BaseSlider.Indicator.Props) => (
    <BaseSlider.Indicator
        className={composeClassName<BaseSlider.Indicator.State>(indicatorVariants(), className)}
        {...props}
    />
)

export const Thumb = ({ className, ...props }: BaseSlider.Thumb.Props) => (
    <BaseSlider.Thumb
        className={composeClassName<BaseSlider.Thumb.State>(thumbVariants(), className)}
        {...props}
    />
)
