import { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import { cva } from 'class-variance-authority'
import { ChevronDown } from 'lucide-react'

import { composeClassName } from '../shared/classes'

const rootVariants = cva(
    'flex w-full flex-col rounded-md border border-zinc-200 bg-white text-zinc-950',
)

const itemVariants = cva('border-b border-zinc-200 last:border-b-0')

const headerVariants = cva('m-0')

const triggerVariants = cva(
    'group flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-inset',
)

const panelVariants = cva(
    'h-[var(--accordion-panel-height)] overflow-hidden px-4 pb-4 text-sm leading-6 text-zinc-600 transition-[height,padding] duration-150 data-ending-style:h-0 data-ending-style:pb-0 data-starting-style:h-0 data-starting-style:pb-0',
)

export const Root = ({ className, ...props }: BaseAccordion.Root.Props) => (
    <BaseAccordion.Root
        className={composeClassName<BaseAccordion.Root.State>(rootVariants(), className)}
        {...props}
    />
)

export const Item = ({ className, ...props }: BaseAccordion.Item.Props) => (
    <BaseAccordion.Item
        className={composeClassName<BaseAccordion.Item.State>(itemVariants(), className)}
        {...props}
    />
)

export const Header = ({ className, ...props }: BaseAccordion.Header.Props) => (
    <BaseAccordion.Header
        className={composeClassName<BaseAccordion.Header.State>(headerVariants(), className)}
        {...props}
    />
)

export const Trigger = ({ children, className, ...props }: BaseAccordion.Trigger.Props) => (
    <BaseAccordion.Trigger
        className={composeClassName<BaseAccordion.Trigger.State>(triggerVariants(), className)}
        {...props}
    >
        <span className="min-w-0 truncate">{children}</span>
        <ChevronDown aria-hidden="true" className="size-4 shrink-0 text-zinc-500 transition" />
    </BaseAccordion.Trigger>
)

export const Panel = ({ className, ...props }: BaseAccordion.Panel.Props) => (
    <BaseAccordion.Panel
        className={composeClassName<BaseAccordion.Panel.State>(panelVariants(), className)}
        {...props}
    />
)
