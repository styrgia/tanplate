import rehypeShikiFromHighlighter from '@shikijs/rehype/core'
import { toString } from 'hast-util-to-string'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, {
    defaultSchema,
    type Options as RehypeSanitizeOptions,
} from 'rehype-sanitize'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'

import { getShikiHighlighter, shikiDefaultColor, shikiThemes } from './shiki'

import type { Element, Root } from 'hast'
import type { Plugin } from 'unified'

export type MarkdownHeading = {
    id: string
    level: number
    text: string
}

export type MarkdownResult = {
    headings: Array<MarkdownHeading>
    markup: string
}

const headingTagNames = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])

const markdownSanitizeSchema: RehypeSanitizeOptions = {
    ...defaultSchema,
    attributes: {
        ...defaultSchema.attributes,
        a: [
            ...(defaultSchema.attributes?.a ?? []),
            ['className'],
            ['target'],
            ['rel'],
            ['aria-hidden'],
        ],
        code: [...(defaultSchema.attributes?.code ?? []), ['className']],
        h1: [...(defaultSchema.attributes?.h1 ?? []), ['id']],
        h2: [...(defaultSchema.attributes?.h2 ?? []), ['id']],
        h3: [...(defaultSchema.attributes?.h3 ?? []), ['id']],
        h4: [...(defaultSchema.attributes?.h4 ?? []), ['id']],
        h5: [...(defaultSchema.attributes?.h5 ?? []), ['id']],
        h6: [...(defaultSchema.attributes?.h6 ?? []), ['id']],
        img: [
            ...(defaultSchema.attributes?.img ?? []),
            ['alt'],
            ['height'],
            ['loading'],
            ['src'],
            ['title'],
            ['width'],
        ],
        pre: [...(defaultSchema.attributes?.pre ?? []), ['className']],
    },
}

export async function renderMarkdown(content: string): Promise<MarkdownResult> {
    const headings: Array<MarkdownHeading> = []

    const result = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeSanitize, markdownSanitizeSchema)
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings, {
            behavior: 'wrap',
            properties: { className: ['anchor'] },
        })
        .use(collectHeadings(headings))
        .use(rehypeShikiPerformance)
        .use(rehypeStringify)
        .process(content)

    return {
        headings,
        markup: String(result),
    }
}

function collectHeadings(headings: Array<MarkdownHeading>) {
    return () => (tree: Root) => {
        visit(tree, 'element', (node) => {
            if (!isHeadingElement(node)) {
                return
            }

            const id = node.properties.id

            headings.push({
                id: typeof id === 'string' ? id : '',
                level: Number.parseInt(node.tagName.slice(1), 10),
                text: toString(node),
            })
        })
    }
}

function isHeadingElement(node: Element): node is Element {
    return headingTagNames.has(node.tagName)
}

const rehypeShikiPerformance: Plugin<[], Root, Root> = () => {
    return async (tree, file) => {
        const highlighter = await getShikiHighlighter({
            themes: Object.values(shikiThemes),
        })
        const transform = rehypeShikiFromHighlighter(highlighter, {
            defaultColor: shikiDefaultColor,
            defaultLanguage: 'text',
            fallbackLanguage: 'text',
            lazy: true,
            themes: shikiThemes,
        })
        const result = await Promise.resolve(transform(tree, file, () => undefined))

        if (result instanceof Error) {
            throw result
        }

        return result
    }
}
