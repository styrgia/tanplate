import {
    createBundledHighlighter,
    createSingletonShorthands,
    type CodeToHastOptions,
} from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

const typescript = () => import('@shikijs/langs/typescript')
const javascript = () => import('@shikijs/langs/javascript')
const tsx = () => import('@shikijs/langs/tsx')
const jsx = () => import('@shikijs/langs/jsx')
const json = () => import('@shikijs/langs/json')
const bash = () => import('@shikijs/langs/bash')
const shellscript = () => import('@shikijs/langs/shellscript')
const css = () => import('@shikijs/langs/css')
const html = () => import('@shikijs/langs/html')
const markdown = () => import('@shikijs/langs/markdown')

const shikiLanguages = {
    bash,
    css,
    html,
    javascript,
    js: javascript,
    json,
    jsx,
    markdown,
    md: markdown,
    shell: shellscript,
    shellscript,
    sh: shellscript,
    ts: typescript,
    tsx,
    typescript,
} as const

const shikiBundledThemes = {
    'github-light': () => import('@shikijs/themes/github-light'),
    'tokyo-night': () => import('@shikijs/themes/tokyo-night'),
} as const

export const shikiThemes = {
    light: 'github-light',
    dark: 'tokyo-night',
} as const satisfies Record<string, keyof typeof shikiBundledThemes>

export const shikiDefaultColor = 'light-dark()' satisfies NonNullable<
    Extract<CodeToHastOptions, { themes: unknown }>['defaultColor']
>

const createShikiHighlighter = createBundledHighlighter({
    langs: shikiLanguages,
    themes: shikiBundledThemes,
    engine: () => createJavaScriptRegexEngine(),
})

const shiki = createSingletonShorthands(createShikiHighlighter)

export const getShikiHighlighter = shiki.getSingletonHighlighter

export type HighlightCodeOptions = {
    code: string
    lang?: CodeToHastOptions['lang']
}

export type HighlightedCodeResult = {
    code: string
    lang: CodeToHastOptions['lang']
    markup: string
}

export async function highlightCode({
    code,
    lang = 'text',
}: HighlightCodeOptions): Promise<HighlightedCodeResult> {
    const markup = await renderCodeToHtml(code, lang)

    return {
        code,
        lang,
        markup,
    }
}

async function renderCodeToHtml(code: string, lang: CodeToHastOptions['lang']) {
    try {
        return await shiki.codeToHtml(code, {
            defaultColor: shikiDefaultColor,
            lang,
            themes: shikiThemes,
        })
    } catch (error) {
        if (lang === 'text') {
            throw error
        }

        return shiki.codeToHtml(code, {
            defaultColor: shikiDefaultColor,
            lang: 'text',
            themes: shikiThemes,
        })
    }
}
