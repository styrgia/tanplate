import { useEffect, useState, type ComponentPropsWithoutRef } from 'react'
import parse from 'html-react-parser'
import { cva } from 'class-variance-authority'

import { cn } from '../ui/shared/classes'

import { highlightCode, type HighlightedCodeResult, type HighlightCodeOptions } from '#/utils/shiki'

const codeBlockVariants = cva(
    'text-sm leading-6 [&_.shiki]:overflow-x-auto [&_.shiki]:rounded-md [&_.shiki]:border [&_.shiki]:border-zinc-200 [&_.shiki]:p-4 [&_pre]:m-0 [&_pre_code]:text-sm',
)

type RawCodeBlockProps = {
    code: string
    lang?: HighlightCodeOptions['lang']
    result?: never
}

type HighlightedCodeBlockProps = {
    code?: never
    lang?: never
    result: HighlightedCodeResult
}

export type CodeBlockProps = Omit<
    ComponentPropsWithoutRef<'div'>,
    'children' | 'dangerouslySetInnerHTML'
> &
    (RawCodeBlockProps | HighlightedCodeBlockProps)

export function CodeBlock(props: CodeBlockProps) {
    const { className, code, lang, result: providedResult, ...containerProps } = props
    const [result, setResult] = useState<HighlightedCodeResult | null>(providedResult ?? null)

    useEffect(() => {
        if (providedResult) {
            setResult(providedResult)
            return
        }

        if (code === undefined) {
            return
        }

        let isCurrent = true

        setResult(null)
        void highlightCode({ code, lang }).then((nextResult) => {
            if (isCurrent) {
                setResult(nextResult)
            }
        })

        return () => {
            isCurrent = false
        }
    }, [code, lang, providedResult])

    if (!result) {
        return (
            <div
                aria-busy="true"
                className={cn(codeBlockVariants(), className)}
                {...containerProps}
            />
        )
    }

    return (
        <div className={cn(codeBlockVariants(), className)} {...containerProps}>
            {parse(result.markup)}
        </div>
    )
}
