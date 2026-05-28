import { BASE_LOCALE, LOCALES } from '../i18n/config'

export type SitemapHostEnv = {
    SITE_URL?: string
}

export type BuildSitemapXmlOptions = {
    host: string
    lastmod?: Date | string
    paths: readonly string[]
}

const DEFAULT_SITEMAP_HOST = 'http://localhost:3000'

export function resolveSitemapHost(env: SitemapHostEnv): string {
    const host = env.SITE_URL?.trim() || DEFAULT_SITEMAP_HOST

    try {
        const url = new URL(host)

        if (url.protocol !== 'http:' && url.protocol !== 'https:') {
            throw new Error()
        }

        return url.toString().replace(/\/+$/, '')
    } catch {
        throw new Error(`SITE_URL must be an absolute URL, received "${host}"`)
    }
}

export function getStaticSitemapPaths(): Array<string> {
    return LOCALES.map((locale) => (locale === BASE_LOCALE ? '/' : `/${locale}/`))
}

export function buildSitemapXml({ host, lastmod = new Date(), paths }: BuildSitemapXmlOptions) {
    const sitemapDate = toSitemapDate(lastmod)
    const urls = paths
        .map((path) => {
            const loc = escapeXml(joinSitemapUrl(host, path))

            return `  <url>
    <loc>${loc}</loc>
    <lastmod>${sitemapDate}</lastmod>
  </url>`
        })
        .join('\n')

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`
}

function joinSitemapUrl(host: string, path: string) {
    const slash = host.endsWith('/') ? '' : '/'
    return `${host}${slash}${path.replace(/^\/+/g, '')}`
}

function toSitemapDate(value: Date | string) {
    return new Date(value).toISOString().split('T')[0]!
}

function escapeXml(value: string) {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&apos;')
}
