import { Radio as BaseRadio } from '@base-ui/react/radio'
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import { cva } from 'class-variance-authority'

import { composeClassName } from '../shared/classes'

const groupVariants = cva('flex items-center gap-3')

const rootVariants = cva(
    'inline-flex size-5 items-center justify-center rounded-full border border-zinc-300 bg-white text-white transition data-checked:border-zinc-950 data-checked:bg-zinc-950 data-disabled:cursor-not-allowed data-disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2',
)

const indicatorVariants = cva('size-2 rounded-full bg-current')

export const Group = ({ className, ...props }: BaseRadioGroup.Props) => (
    <BaseRadioGroup
        className={composeClassName<BaseRadioGroup.State>(groupVariants(), className)}
        {...props}
    />
)

export const Root = ({ className, ...props }: BaseRadio.Root.Props) => (
    <BaseRadio.Root
        className={composeClassName<BaseRadio.Root.State>(rootVariants(), className)}
        {...props}
    />
)

export const Indicator = ({ className, ...props }: BaseRadio.Indicator.Props) => (
    <BaseRadio.Indicator
        className={composeClassName<BaseRadio.Indicator.State>(indicatorVariants(), className)}
        {...props}
    />
)
