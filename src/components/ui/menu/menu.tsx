import { Menu as BaseMenu } from '@base-ui/react/menu'
import { Separator as BaseSeparator } from '@base-ui/react/separator'
import { cva } from 'class-variance-authority'
import { Check } from 'lucide-react'

import { composeClassName } from '../shared/classes'

const triggerVariants = cva(
    'inline-flex h-10 items-center justify-center gap-2 rounded-md border border-transparent bg-zinc-950 px-4 text-sm font-semibold whitespace-nowrap text-white transition hover:bg-zinc-800 active:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-500 data-disabled:cursor-not-allowed data-disabled:bg-zinc-200 data-disabled:text-zinc-500',
)

const positionerVariants = cva('z-50 outline-none')

const popupVariants = cva(
    'z-50 min-w-40 rounded-md border border-zinc-200 bg-white p-1 text-zinc-950 shadow-lg outline-none transition-[opacity,scale] duration-150 data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0',
)

const itemVariants = cva(
    'grid cursor-default grid-cols-[1rem_1fr] items-center gap-2 px-2 py-1.5 text-sm outline-none select-none data-disabled:opacity-50 data-highlighted:bg-zinc-950 data-highlighted:text-white',
)

const itemIndicatorVariants = cva('col-start-1')

const groupLabelVariants = cva('px-2 py-1.5 text-xs font-medium text-zinc-500')

const separatorVariants = cva('my-1 h-px bg-zinc-200')

const arrowVariants = cva(
    'flex text-white drop-shadow-sm data-[side=bottom]:-top-2 data-[side=left]:-right-2 data-[side=right]:-left-2 data-[side=top]:-bottom-2',
)

export const Root = BaseMenu.Root
export const Portal = BaseMenu.Portal
export const Group = BaseMenu.Group
export const RadioGroup = BaseMenu.RadioGroup
export const SubmenuRoot = BaseMenu.SubmenuRoot
export const Viewport = BaseMenu.Viewport

export const Trigger = ({ className, ...props }: BaseMenu.Trigger.Props) => (
    <BaseMenu.Trigger
        className={composeClassName<BaseMenu.Trigger.State>(triggerVariants(), className)}
        {...props}
    />
)

export const SubmenuTrigger = ({ className, ...props }: BaseMenu.SubmenuTrigger.Props) => (
    <BaseMenu.SubmenuTrigger
        className={composeClassName<BaseMenu.SubmenuTrigger.State>(itemVariants(), className)}
        {...props}
    />
)

export const Positioner = ({ className, sideOffset = 6, ...props }: BaseMenu.Positioner.Props) => (
    <BaseMenu.Positioner
        className={composeClassName<BaseMenu.Positioner.State>(positionerVariants(), className)}
        sideOffset={sideOffset}
        {...props}
    />
)

export const Popup = ({ className, ...props }: BaseMenu.Popup.Props) => (
    <BaseMenu.Popup
        className={composeClassName<BaseMenu.Popup.State>(popupVariants(), className)}
        {...props}
    />
)

export const Item = ({ className, ...props }: BaseMenu.Item.Props) => (
    <BaseMenu.Item
        className={composeClassName<BaseMenu.Item.State>(itemVariants(), className)}
        {...props}
    />
)

export const LinkItem = ({ className, ...props }: BaseMenu.LinkItem.Props) => (
    <BaseMenu.LinkItem
        className={composeClassName<BaseMenu.LinkItem.State>(itemVariants(), className)}
        {...props}
    />
)

export const CheckboxItem = ({ className, ...props }: BaseMenu.CheckboxItem.Props) => (
    <BaseMenu.CheckboxItem
        className={composeClassName<BaseMenu.CheckboxItem.State>(itemVariants(), className)}
        {...props}
    />
)

export function CheckboxItemIndicator({
    children,
    className,
    ...props
}: BaseMenu.CheckboxItemIndicator.Props) {
    return (
        <BaseMenu.CheckboxItemIndicator
            className={composeClassName<BaseMenu.CheckboxItemIndicator.State>(
                itemIndicatorVariants(),
                className,
            )}
            {...props}
        >
            {children ?? <Check aria-hidden="true" className="size-3.5" strokeWidth={3} />}
        </BaseMenu.CheckboxItemIndicator>
    )
}

export const RadioItem = ({ className, ...props }: BaseMenu.RadioItem.Props) => (
    <BaseMenu.RadioItem
        className={composeClassName<BaseMenu.RadioItem.State>(itemVariants(), className)}
        {...props}
    />
)

export function RadioItemIndicator({
    children,
    className,
    ...props
}: BaseMenu.RadioItemIndicator.Props) {
    return (
        <BaseMenu.RadioItemIndicator
            className={composeClassName<BaseMenu.RadioItemIndicator.State>(
                itemIndicatorVariants(),
                className,
            )}
            {...props}
        >
            {children ?? <Check aria-hidden="true" className="size-3.5" strokeWidth={3} />}
        </BaseMenu.RadioItemIndicator>
    )
}

export const GroupLabel = ({ className, ...props }: BaseMenu.GroupLabel.Props) => (
    <BaseMenu.GroupLabel
        className={composeClassName<BaseMenu.GroupLabel.State>(groupLabelVariants(), className)}
        {...props}
    />
)

export const Separator = ({ className, ...props }: BaseSeparator.Props) => (
    <BaseSeparator
        className={composeClassName<BaseSeparator.State>(separatorVariants(), className)}
        {...props}
    />
)

export const Arrow = ({ className, ...props }: BaseMenu.Arrow.Props) => (
    <BaseMenu.Arrow
        className={composeClassName<BaseMenu.Arrow.State>(arrowVariants(), className)}
        {...props}
    />
)

export const Backdrop = BaseMenu.Backdrop
export const Handle = BaseMenu.Handle
export const createHandle = BaseMenu.createHandle
