import { useEffect, useState, type ComponentPropsWithoutRef } from 'react'
import parse from 'html-react-parser'

import { cn } from '../ui/shared/classes'

import { highlightCode, type HighlightedCodeResult, type HighlightCodeOptions } from '#/utils/shiki'

const codeBlockClassName = `
  text-sm/6
  [&_.shiki]:overflow-x-auto [&_.shiki]:rounded-md [&_.shiki]:border
  [&_.shiki]:border-zinc-200 [&_.shiki]:p-4
  [&_pre]:m-0
  [&_pre_code]:text-sm
`

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
    const [highlighted, setHighlighted] = useState<{
        code: string
        lang: HighlightCodeOptions['lang']
        result: HighlightedCodeResult
    } | null>(null)
    const result =
        providedResult ??
        (highlighted?.code === code && highlighted?.lang === lang ? highlighted?.result : null)

    useEffect(() => {
        if (providedResult || code === undefined) {
            return
        }

        let isCurrent = true

        void highlightCode({ code, lang }).then((nextResult) => {
            if (isCurrent) {
                setHighlighted({ code, lang, result: nextResult })
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
                className={cn(codeBlockClassName, className)}
                {...containerProps}
            />
        )
    }

    return (
        <div className={cn(codeBlockClassName, className)} {...containerProps}>
            {parse(result.markup)}
        </div>
    )
}
