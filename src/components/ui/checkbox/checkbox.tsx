import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import { cva } from 'class-variance-authority'
import { Check } from 'lucide-react'

import { composeClassName } from '../shared/classes'

const rootVariants = cva(
    'inline-flex size-5 items-center justify-center rounded border border-zinc-300 bg-white text-white transition data-checked:border-zinc-950 data-checked:bg-zinc-950 data-disabled:cursor-not-allowed data-disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2',
)

const indicatorVariants = cva('flex items-center justify-center')

export const Root = ({ className, ...props }: BaseCheckbox.Root.Props) => (
    <BaseCheckbox.Root
        className={composeClassName<BaseCheckbox.Root.State>(rootVariants(), className)}
        {...props}
    />
)

export function Indicator({ children, className, ...props }: BaseCheckbox.Indicator.Props) {
    return (
        <BaseCheckbox.Indicator
            className={composeClassName<BaseCheckbox.Indicator.State>(
                indicatorVariants(),
                className,
            )}
            {...props}
        >
            {children ?? <Check aria-hidden="true" className="size-3.5" strokeWidth={3} />}
        </BaseCheckbox.Indicator>
    )
}
