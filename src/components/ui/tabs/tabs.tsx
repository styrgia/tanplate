import { Tabs as BaseTabs } from '@base-ui/react/tabs'

import { composeClassName } from '../shared/classes'

const rootClassName = 'flex flex-col gap-3'

const listClassName = `
  inline-flex w-fit items-center gap-1 rounded-md bg-zinc-100 p-1
`

const tabClassName = `
  inline-flex h-8 items-center justify-center rounded-sm px-3 text-sm
  font-medium text-zinc-600 transition
  hover:text-zinc-950
  focus-visible:ring-2 focus-visible:ring-emerald-600
  focus-visible:ring-offset-2 focus-visible:outline-none
  data-active:bg-white data-active:text-zinc-950
  data-disabled:cursor-not-allowed data-disabled:opacity-50
`

const panelClassName = `
  text-sm/6 text-zinc-700 outline-none
  focus-visible:ring-2 focus-visible:ring-emerald-600
  focus-visible:ring-offset-2
`

const indicatorClassName = `
  rounded-sm bg-white shadow-sm transition-[left,right,top,bottom,width,height]
`

export const Root = ({ className, ...props }: BaseTabs.Root.Props) => (
    <BaseTabs.Root
        className={composeClassName<BaseTabs.Root.State>(rootClassName, className)}
        {...props}
    />
)

export const List = ({ className, ...props }: BaseTabs.List.Props) => (
    <BaseTabs.List
        className={composeClassName<BaseTabs.List.State>(listClassName, className)}
        {...props}
    />
)

export const Tab = ({ className, ...props }: BaseTabs.Tab.Props) => (
    <BaseTabs.Tab
        className={composeClassName<BaseTabs.Tab.State>(tabClassName, className)}
        {...props}
    />
)

export const Panel = ({ className, ...props }: BaseTabs.Panel.Props) => (
    <BaseTabs.Panel
        className={composeClassName<BaseTabs.Panel.State>(panelClassName, className)}
        {...props}
    />
)

export const Indicator = ({ className, ...props }: BaseTabs.Indicator.Props) => (
    <BaseTabs.Indicator
        className={composeClassName<BaseTabs.Indicator.State>(indicatorClassName, className)}
        {...props}
    />
)
