import { Select as BaseSelect } from '@base-ui/react/select'
import { Separator as BaseSeparator } from '@base-ui/react/separator'
import { cva } from 'class-variance-authority'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'

import { composeClassName } from '../shared/classes'

const labelVariants = cva('text-sm font-medium text-zinc-950')

const triggerVariants = cva(
    'inline-flex h-10 min-w-40 items-center justify-between gap-2 rounded-md border border-zinc-300 bg-white px-3 text-sm font-medium whitespace-nowrap text-zinc-950 transition hover:bg-zinc-50 active:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-500 data-disabled:cursor-not-allowed data-disabled:bg-zinc-100 data-disabled:text-zinc-500 data-popup-open:bg-zinc-50',
)

const valueVariants = cva('truncate data-placeholder:text-zinc-500')

const iconVariants = cva('ml-2 flex shrink-0 items-center text-zinc-500')

const positionerVariants = cva('z-50 outline-none')

const popupVariants = cva(
    'z-50 min-w-[var(--anchor-width)] rounded-md border border-zinc-200 bg-white p-1 text-zinc-950 shadow-lg outline-none transition-[opacity,scale] duration-150 data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0',
)

const listVariants = cva('max-h-72 overflow-y-auto overscroll-contain outline-none')

const itemVariants = cva(
    'grid cursor-default grid-cols-[1rem_1fr] items-center gap-2 px-2 py-1.5 text-sm outline-none select-none data-disabled:opacity-50 data-highlighted:bg-zinc-950 data-highlighted:text-white',
)

const itemIndicatorVariants = cva('col-start-1')

const itemTextVariants = cva('col-start-2 truncate')

const groupLabelVariants = cva('px-2 py-1.5 text-xs font-medium text-zinc-500')

const scrollArrowVariants = cva('flex h-6 items-center justify-center bg-white text-zinc-500')

const separatorVariants = cva('my-1 h-px bg-zinc-200')

export const Root = BaseSelect.Root
export const Portal = BaseSelect.Portal
export const Group = BaseSelect.Group

export const Label = ({ className, ...props }: BaseSelect.Label.Props) => (
    <BaseSelect.Label
        className={composeClassName<BaseSelect.Label.State>(labelVariants(), className)}
        {...props}
    />
)

export const Trigger = ({ className, ...props }: BaseSelect.Trigger.Props) => (
    <BaseSelect.Trigger
        className={composeClassName<BaseSelect.Trigger.State>(triggerVariants(), className)}
        {...props}
    />
)

export function Value({ className, ...props }: BaseSelect.Value.Props) {
    return (
        <BaseSelect.Value
            className={composeClassName<BaseSelect.Value.State>(valueVariants(), className)}
            {...props}
        />
    )
}

export function Icon({ children, className, ...props }: BaseSelect.Icon.Props) {
    return (
        <BaseSelect.Icon
            className={composeClassName<BaseSelect.Icon.State>(iconVariants(), className)}
            {...props}
        >
            {children ?? <ChevronDown aria-hidden="true" className="size-4" />}
        </BaseSelect.Icon>
    )
}

export const Positioner = ({
    className,
    sideOffset = 6,
    ...props
}: BaseSelect.Positioner.Props) => (
    <BaseSelect.Positioner
        className={composeClassName<BaseSelect.Positioner.State>(positionerVariants(), className)}
        sideOffset={sideOffset}
        {...props}
    />
)

export const Popup = ({ className, ...props }: BaseSelect.Popup.Props) => (
    <BaseSelect.Popup
        className={composeClassName<BaseSelect.Popup.State>(popupVariants(), className)}
        {...props}
    />
)

export const List = ({ className, ...props }: BaseSelect.List.Props) => (
    <BaseSelect.List
        className={composeClassName<BaseSelect.List.State>(listVariants(), className)}
        {...props}
    />
)

export const Item = ({ className, ...props }: BaseSelect.Item.Props) => (
    <BaseSelect.Item
        className={composeClassName<BaseSelect.Item.State>(itemVariants(), className)}
        {...props}
    />
)

export function ItemIndicator({ children, className, ...props }: BaseSelect.ItemIndicator.Props) {
    return (
        <BaseSelect.ItemIndicator
            className={composeClassName<BaseSelect.ItemIndicator.State>(
                itemIndicatorVariants(),
                className,
            )}
            {...props}
        >
            {children ?? <Check aria-hidden="true" className="size-3.5" strokeWidth={3} />}
        </BaseSelect.ItemIndicator>
    )
}

export const ItemText = ({ className, ...props }: BaseSelect.ItemText.Props) => (
    <BaseSelect.ItemText
        className={composeClassName<BaseSelect.ItemText.State>(itemTextVariants(), className)}
        {...props}
    />
)

export const GroupLabel = ({ className, ...props }: BaseSelect.GroupLabel.Props) => (
    <BaseSelect.GroupLabel
        className={composeClassName<BaseSelect.GroupLabel.State>(groupLabelVariants(), className)}
        {...props}
    />
)

export const ScrollUpArrow = ({
    children,
    className,
    ...props
}: BaseSelect.ScrollUpArrow.Props) => (
    <BaseSelect.ScrollUpArrow
        className={composeClassName<BaseSelect.ScrollUpArrow.State>(
            scrollArrowVariants(),
            className,
        )}
        {...props}
    >
        {children ?? <ChevronUp aria-hidden="true" className="size-4" />}
    </BaseSelect.ScrollUpArrow>
)

export const ScrollDownArrow = ({
    children,
    className,
    ...props
}: BaseSelect.ScrollDownArrow.Props) => (
    <BaseSelect.ScrollDownArrow
        className={composeClassName<BaseSelect.ScrollDownArrow.State>(
            scrollArrowVariants(),
            className,
        )}
        {...props}
    >
        {children ?? <ChevronDown aria-hidden="true" className="size-4" />}
    </BaseSelect.ScrollDownArrow>
)

export const Separator = ({ className, ...props }: BaseSeparator.Props) => (
    <BaseSeparator
        className={composeClassName<BaseSeparator.State>(separatorVariants(), className)}
        {...props}
    />
)

export const Arrow = BaseSelect.Arrow
export const Backdrop = BaseSelect.Backdrop
