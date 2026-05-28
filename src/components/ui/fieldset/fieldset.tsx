import { Fieldset as BaseFieldset } from '@base-ui/react/fieldset'
import { cva } from 'class-variance-authority'

import { composeClassName } from '../shared/classes'

const rootVariants = cva('grid gap-3 rounded-md border border-zinc-200 bg-white p-4 text-zinc-950')

const legendVariants = cva('px-1 text-sm font-semibold')

export const Root = ({ className, ...props }: BaseFieldset.Root.Props) => (
    <BaseFieldset.Root
        className={composeClassName<BaseFieldset.Root.State>(rootVariants(), className)}
        {...props}
    />
)

export const Legend = ({ className, ...props }: BaseFieldset.Legend.Props) => (
    <BaseFieldset.Legend
        className={composeClassName<BaseFieldset.Legend.State>(legendVariants(), className)}
        {...props}
    />
)
