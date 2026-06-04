import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '../ui/shared/classes'

const rootClassName = 'w-full caption-bottom border-collapse text-sm'

const containerClassName = `
  w-full overflow-x-auto rounded-md border border-zinc-200 bg-white shadow-sm
`

const captionClassName = 'mt-3 text-sm text-zinc-500'

const headerClassName = 'border-b border-zinc-200 bg-zinc-50'

const bodyClassName = 'divide-y divide-zinc-100'

const rowClassName = `
  transition-colors
  hover:bg-zinc-50
  data-[state=selected]:bg-zinc-50
`

const headClassName = `
  h-11 px-3 text-left align-middle text-xs font-semibold tracking-wide
  text-zinc-600 uppercase
`

const cellClassName = 'p-3 align-middle text-zinc-800'

const footerClassName = 'border-t border-zinc-200 bg-zinc-50 font-medium'

export const Container = ({ className, ...props }: ComponentPropsWithoutRef<'div'>) => (
    <div className={cn(containerClassName, className)} {...props} />
)

export const Root = ({ className, ...props }: ComponentPropsWithoutRef<'table'>) => (
    <table className={cn(rootClassName, className)} {...props} />
)

export const Caption = ({ className, ...props }: ComponentPropsWithoutRef<'caption'>) => (
    <caption className={cn(captionClassName, className)} {...props} />
)

export const Header = ({ className, ...props }: ComponentPropsWithoutRef<'thead'>) => (
    <thead className={cn(headerClassName, className)} {...props} />
)

export const Body = ({ className, ...props }: ComponentPropsWithoutRef<'tbody'>) => (
    <tbody className={cn(bodyClassName, className)} {...props} />
)

export const Footer = ({ className, ...props }: ComponentPropsWithoutRef<'tfoot'>) => (
    <tfoot className={cn(footerClassName, className)} {...props} />
)

export const Row = ({ className, ...props }: ComponentPropsWithoutRef<'tr'>) => (
    <tr className={cn(rowClassName, className)} {...props} />
)

export const Head = ({ className, ...props }: ComponentPropsWithoutRef<'th'>) => (
    <th className={cn(headClassName, className)} {...props} />
)

export const Cell = ({ className, ...props }: ComponentPropsWithoutRef<'td'>) => (
    <td className={cn(cellClassName, className)} {...props} />
)
