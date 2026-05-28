import type { ComponentPropsWithoutRef } from 'react'
import { cva } from 'class-variance-authority'

import { cn } from '../ui/shared/classes'

const rootVariants = cva('w-full caption-bottom border-collapse text-sm')

const containerVariants = cva(
    'w-full overflow-x-auto rounded-md border border-zinc-200 bg-white shadow-sm',
)

const captionVariants = cva('mt-3 text-sm text-zinc-500')

const headerVariants = cva('border-b border-zinc-200 bg-zinc-50')

const bodyVariants = cva('divide-y divide-zinc-100')

const rowVariants = cva('transition-colors hover:bg-zinc-50 data-[state=selected]:bg-zinc-50')

const headVariants = cva(
    'h-11 px-3 text-left align-middle text-xs font-semibold tracking-wide text-zinc-600 uppercase',
)

const cellVariants = cva('px-3 py-3 align-middle text-zinc-800')

const footerVariants = cva('border-t border-zinc-200 bg-zinc-50 font-medium')

export const Container = ({ className, ...props }: ComponentPropsWithoutRef<'div'>) => (
    <div className={cn(containerVariants(), className)} {...props} />
)

export const Root = ({ className, ...props }: ComponentPropsWithoutRef<'table'>) => (
    <table className={cn(rootVariants(), className)} {...props} />
)

export const Caption = ({ className, ...props }: ComponentPropsWithoutRef<'caption'>) => (
    <caption className={cn(captionVariants(), className)} {...props} />
)

export const Header = ({ className, ...props }: ComponentPropsWithoutRef<'thead'>) => (
    <thead className={cn(headerVariants(), className)} {...props} />
)

export const Body = ({ className, ...props }: ComponentPropsWithoutRef<'tbody'>) => (
    <tbody className={cn(bodyVariants(), className)} {...props} />
)

export const Footer = ({ className, ...props }: ComponentPropsWithoutRef<'tfoot'>) => (
    <tfoot className={cn(footerVariants(), className)} {...props} />
)

export const Row = ({ className, ...props }: ComponentPropsWithoutRef<'tr'>) => (
    <tr className={cn(rowVariants(), className)} {...props} />
)

export const Head = ({ className, ...props }: ComponentPropsWithoutRef<'th'>) => (
    <th className={cn(headVariants(), className)} {...props} />
)

export const Cell = ({ className, ...props }: ComponentPropsWithoutRef<'td'>) => (
    <td className={cn(cellVariants(), className)} {...props} />
)
