export type SeoMetaTag =
    | { title: string }
    | { name: string; content: string }
    | { property: string; content: string }

export type SeoLinkTag = {
    href: string
    hrefLang?: string
    rel: string
}

export type SeoScriptTag = {
    children: string
    type: 'application/ld+json'
}

export type SeoJsonLd = Record<string, unknown>

export type SeoAlternateLink = {
    href: string
    hrefLang: string
}

export type SeoHeadOptions = {
    alternates?: readonly SeoAlternateLink[]
    description: string
    image?: string
    jsonLd?: SeoJsonLd | readonly SeoJsonLd[]
    locale?: string
    noIndex?: boolean
    path?: string
    siteName?: string
    siteUrl?: string
    title: string
    titleTemplate?: false | string
    type?: 'article' | 'profile' | 'website'
}

export type SeoHead = {
    links?: Array<SeoLinkTag>
    meta: Array<SeoMetaTag>
    scripts?: Array<SeoScriptTag>
}

const DEFAULT_SITE_NAME = 'TanStack Start Bun Starter'
const DEFAULT_TITLE_TEMPLATE = '%s | %siteName%'

export function createSeoHead(options: SeoHeadOptions): SeoHead {
    const siteName = options.siteName ?? DEFAULT_SITE_NAME
    const title = formatTitle(options.title, siteName, options.titleTemplate)
    const imageUrl = options.image ? toAbsoluteUrl(options.image, options.siteUrl) : undefined
    const canonicalUrl = options.path ? toAbsoluteUrl(options.path, options.siteUrl) : undefined

    const meta: Array<SeoMetaTag> = [
        { title },
        { name: 'description', content: options.description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: options.description },
        { property: 'og:site_name', content: siteName },
        { property: 'og:type', content: options.type ?? 'website' },
        { name: 'twitter:card', content: imageUrl ? 'summary_large_image' : 'summary' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: options.description },
    ]

    if (canonicalUrl) {
        meta.push({ property: 'og:url', content: canonicalUrl })
    }

    if (options.locale) {
        meta.push({ property: 'og:locale', content: options.locale })
    }

    if (imageUrl) {
        meta.splice(6, 0, { property: 'og:image', content: imageUrl })
        meta.push({ name: 'twitter:image', content: imageUrl })
    }

    if (options.noIndex) {
        meta.push({ name: 'robots', content: 'noindex, nofollow' })
    }

    const links: Array<SeoLinkTag> = []

    if (canonicalUrl) {
        links.push({ rel: 'canonical', href: canonicalUrl })
    }

    for (const alternate of options.alternates ?? []) {
        links.push({
            rel: 'alternate',
            href: toAbsoluteUrl(alternate.href, options.siteUrl),
            hrefLang: alternate.hrefLang,
        })
    }

    const scripts = toJsonLdArray(options.jsonLd).map((item) => ({
        type: 'application/ld+json' as const,
        children: JSON.stringify(item),
    }))

    return {
        meta,
        ...(links.length > 0 ? { links } : {}),
        ...(scripts.length > 0 ? { scripts } : {}),
    }
}

export function getSeoSiteUrl(): string | undefined {
    return import.meta.env.VITE_SITE_URL || undefined
}

function formatTitle(title: string, siteName: string, titleTemplate: false | string | undefined) {
    if (titleTemplate === false || title === siteName) {
        return title
    }

    const template = titleTemplate ?? DEFAULT_TITLE_TEMPLATE

    return template.replaceAll('%siteName%', siteName).replaceAll('%s', title)
}

function toAbsoluteUrl(value: string, siteUrl: string | undefined) {
    try {
        return new URL(value).toString()
    } catch {
        if (!siteUrl) {
            return value
        }

        return new URL(value, siteUrl).toString()
    }
}

function toJsonLdArray(value: SeoJsonLd | readonly SeoJsonLd[] | undefined): Array<SeoJsonLd> {
    if (value === undefined) {
        return []
    }

    return Array.isArray(value) ? [...(value as readonly SeoJsonLd[])] : [value as SeoJsonLd]
}
