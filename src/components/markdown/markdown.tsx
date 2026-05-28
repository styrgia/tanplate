import { Suspense, use, type ComponentPropsWithoutRef } from 'react'
import parse, {
    attributesToProps,
    domToReact,
    Element,
    type DOMNode,
    type HTMLReactParserOptions,
} from 'html-react-parser'
import { cva } from 'class-variance-authority'

import { cn } from '../ui/shared/classes'

import { renderMarkdown, type MarkdownResult } from '#/utils/markdown'

const markdownVariants = cva(
    'space-y-4 text-sm leading-7 text-zinc-700 [overflow-wrap:anywhere] [&_.anchor]:text-inherit [&_.anchor]:no-underline [&_.shiki]:overflow-x-auto [&_.shiki]:rounded-md [&_.shiki]:border [&_.shiki]:border-zinc-200 [&_.shiki]:p-4 [&_a]:font-medium [&_a]:text-emerald-700 [&_a]:underline-offset-4 hover:[&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-zinc-200 [&_blockquote]:pl-4 [&_blockquote]:text-zinc-600 [&_code:not(pre_code)]:rounded [&_code:not(pre_code)]:bg-zinc-100 [&_code:not(pre_code)]:px-1.5 [&_code:not(pre_code)]:py-0.5 [&_code:not(pre_code)]:text-[0.9em] [&_code:not(pre_code)]:text-zinc-950 [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl [&_h4]:text-lg [&_h5]:text-base [&_h6]:text-sm [&_h1]:font-semibold [&_h2]:font-semibold [&_h3]:font-semibold [&_h4]:font-semibold [&_h5]:font-semibold [&_h6]:font-semibold [&_h1]:leading-tight [&_h2]:leading-tight [&_h3]:leading-snug [&_h1]:text-zinc-950 [&_h2]:text-zinc-950 [&_h3]:text-zinc-950 [&_h4]:text-zinc-950 [&_h5]:text-zinc-950 [&_h6]:text-zinc-950 [&_h2]:border-b [&_h2]:border-zinc-200 [&_h2]:pb-2 [&_h1]:scroll-mt-24 [&_h2]:scroll-mt-24 [&_h3]:scroll-mt-24 [&_h4]:scroll-mt-24 [&_h5]:scroll-mt-24 [&_h6]:scroll-mt-24 [&_hr]:border-zinc-200 [&_img]:rounded-md [&_img]:border [&_img]:border-zinc-200 [&_li]:my-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_pre_code]:text-sm [&_strong]:font-semibold [&_strong]:text-zinc-950 [&_table]:w-full [&_table]:border-collapse [&_table]:text-left [&_td]:border [&_td]:border-zinc-200 [&_td]:px-3 [&_td]:py-2 [&_th]:border [&_th]:border-zinc-200 [&_th]:bg-zinc-50 [&_th]:px-3 [&_th]:py-2 [&_th]:font-semibold [&_ul]:list-disc [&_ul]:pl-6',
)

type RawMarkdownProps = {
    content: string
    result?: never
}

type ProcessedMarkdownProps = {
    content?: never
    result: MarkdownResult
}

export type MarkdownProps = Omit<
    ComponentPropsWithoutRef<'div'>,
    'children' | 'dangerouslySetInnerHTML'
> &
    (RawMarkdownProps | ProcessedMarkdownProps)

export function Markdown(props: MarkdownProps) {
    const { className, content, result: providedResult, ...containerProps } = props

    return (
        <Suspense
            fallback={
                <div
                    aria-busy="true"
                    className={cn(markdownVariants(), className)}
                    {...containerProps}
                />
            }
        >
            <MarkdownContent
                className={className}
                content={content}
                result={providedResult}
                {...containerProps}
            />
        </Suspense>
    )
}

type MarkdownContentProps = Omit<
    ComponentPropsWithoutRef<'div'>,
    'children' | 'dangerouslySetInnerHTML'
> & {
    content?: string
    result?: MarkdownResult
}

function MarkdownContent({
    className,
    content,
    result: providedResult,
    ...containerProps
}: MarkdownContentProps) {
    const result = providedResult ?? readMarkdownResult(content)

    return (
        <div className={cn(markdownVariants(), className)} {...containerProps}>
            {parse(result.markup, parserOptions)}
        </div>
    )
}

const markdownResultCache = new Map<string, Promise<MarkdownResult>>()
const maxCachedMarkdownResults = 100

function readMarkdownResult(content: string | undefined) {
    if (content === undefined) {
        throw new Error('Markdown requires either content or a processed result.')
    }

    return use(getMarkdownResult(content))
}

function getMarkdownResult(content: string) {
    const cachedResult = markdownResultCache.get(content)

    if (cachedResult) {
        return cachedResult
    }

    const result = renderMarkdown(content).catch((error: unknown) => {
        markdownResultCache.delete(content)
        throw error
    })

    markdownResultCache.set(content, result)

    if (markdownResultCache.size > maxCachedMarkdownResults) {
        const oldestKey = markdownResultCache.keys().next().value

        if (oldestKey !== undefined) {
            markdownResultCache.delete(oldestKey)
        }
    }

    return result
}

const parserOptions: HTMLReactParserOptions = {
    replace: (domNode) => {
        if (!(domNode instanceof Element)) {
            return
        }

        if (domNode.name === 'a') {
            const href = domNode.attribs.href

            if (href && isExternalHttpLink(href)) {
                return (
                    <a
                        {...attributesToProps(domNode.attribs)}
                        rel="noreferrer noopener"
                        target="_blank"
                    >
                        {domToReact(getParserChildren(domNode), parserOptions)}
                    </a>
                )
            }
        }

        if (domNode.name === 'img') {
            const imageProps = attributesToProps(domNode.attribs)
            const alt = typeof imageProps.alt === 'string' ? imageProps.alt : ''

            return <img {...imageProps} alt={alt} decoding="async" loading="lazy" />
        }
    },
}

function isExternalHttpLink(href: string) {
    return /^https?:\/\//i.test(href)
}

function getParserChildren(domNode: Element): Array<DOMNode> {
    return domNode.children.filter(isParserDomNode)
}

function isParserDomNode(node: Element['children'][number]): node is DOMNode {
    return node.type !== 'cdata' && node.type !== 'root'
}
