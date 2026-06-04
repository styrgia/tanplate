import { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import { ChevronDown } from 'lucide-react'

import { composeClassName } from '../shared/classes'

const rootClassName = `
  flex w-full flex-col rounded-md border border-zinc-200 bg-white text-zinc-950
`

const itemClassName = `
  border-b border-zinc-200
  last:border-b-0
`

const headerClassName = 'm-0'

const triggerClassName = `
  group flex w-full items-center justify-between gap-4 px-4 py-3 text-left
  text-sm font-medium transition
  hover:bg-zinc-50
  focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none
  focus-visible:ring-inset
`

const panelClassName = `
  h-(--accordion-panel-height) overflow-hidden px-4 pb-4 text-sm/6 text-zinc-600
  transition-[height,padding] duration-150
  data-ending-style:h-0 data-ending-style:pb-0
  data-starting-style:h-0 data-starting-style:pb-0
`

export const Root = ({ className, ...props }: BaseAccordion.Root.Props) => (
    <BaseAccordion.Root
        className={composeClassName<BaseAccordion.Root.State>(rootClassName, className)}
        {...props}
    />
)

export const Item = ({ className, ...props }: BaseAccordion.Item.Props) => (
    <BaseAccordion.Item
        className={composeClassName<BaseAccordion.Item.State>(itemClassName, className)}
        {...props}
    />
)

export const Header = ({ className, ...props }: BaseAccordion.Header.Props) => (
    <BaseAccordion.Header
        className={composeClassName<BaseAccordion.Header.State>(headerClassName, className)}
        {...props}
    />
)

export const Trigger = ({ children, className, ...props }: BaseAccordion.Trigger.Props) => (
    <BaseAccordion.Trigger
        className={composeClassName<BaseAccordion.Trigger.State>(triggerClassName, className)}
        {...props}
    >
        <span className="min-w-0 truncate">{children}</span>
        <ChevronDown aria-hidden="true" className="size-4 shrink-0 text-zinc-500 transition" />
    </BaseAccordion.Trigger>
)

export const Panel = ({ className, ...props }: BaseAccordion.Panel.Props) => (
    <BaseAccordion.Panel
        className={composeClassName<BaseAccordion.Panel.State>(panelClassName, className)}
        {...props}
    />
)
