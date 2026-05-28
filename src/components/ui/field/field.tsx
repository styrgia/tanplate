import { Field as BaseField } from '@base-ui/react/field'
import { cva } from 'class-variance-authority'

import { composeClassName } from '../shared/classes'

const rootVariants = cva('flex flex-col gap-1.5')

const labelVariants = cva('text-sm font-medium text-zinc-950')

const controlVariants = cva(
    'h-10 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-500 data-disabled:cursor-not-allowed data-disabled:bg-zinc-100 data-disabled:text-zinc-500',
)

const descriptionVariants = cva('text-sm leading-5 text-zinc-600')

const errorVariants = cva('text-sm leading-5 text-red-700')

export const Root = ({ className, ...props }: BaseField.Root.Props) => (
    <BaseField.Root
        className={composeClassName<BaseField.Root.State>(rootVariants(), className)}
        {...props}
    />
)

export const Label = ({ className, ...props }: BaseField.Label.Props) => (
    <BaseField.Label
        className={composeClassName<BaseField.Label.State>(labelVariants(), className)}
        {...props}
    />
)

export const Control = ({ className, ...props }: BaseField.Control.Props) => (
    <BaseField.Control
        className={composeClassName<BaseField.Control.State>(controlVariants(), className)}
        {...props}
    />
)

export const Description = ({ className, ...props }: BaseField.Description.Props) => (
    <BaseField.Description
        className={composeClassName<BaseField.Description.State>(descriptionVariants(), className)}
        {...props}
    />
)

export const Error = ({ className, ...props }: BaseField.Error.Props) => (
    <BaseField.Error
        className={composeClassName<BaseField.Error.State>(errorVariants(), className)}
        {...props}
    />
)

export const Item = BaseField.Item
export const Validity = BaseField.Validity
