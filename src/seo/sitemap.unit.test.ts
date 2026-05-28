import { describe, expect, it } from 'vitest'

import { buildSitemapXml, getStaticSitemapPaths, resolveSitemapHost } from './sitemap'

describe('resolveSitemapHost', () => {
    it('uses SITE_URL without trailing slashes', () => {
        expect(resolveSitemapHost({ SITE_URL: 'https://example.com/docs///' })).toBe(
            'https://example.com/docs',
        )
    })

    it('falls back to a local host when SITE_URL is not set', () => {
        expect(resolveSitemapHost({ SITE_URL: '' })).toBe('http://localhost:3000')
    })

    it('requires an absolute URL', () => {
        expect(() => resolveSitemapHost({ SITE_URL: '/relative' })).toThrow(
            'SITE_URL must be an absolute URL',
        )
    })

    it('lists static localized routes', () => {
        expect(getStaticSitemapPaths()).toEqual(['/', '/ru/'])
    })

    it('builds sitemap XML for every path', () => {
        expect(
            buildSitemapXml({
                host: 'https://example.com',
                paths: ['/', '/ru/'],
                lastmod: '2026-05-28',
            }),
        ).toContain('<loc>https://example.com/</loc>\n    <lastmod>2026-05-28</lastmod>')
        expect(
            buildSitemapXml({
                host: 'https://example.com',
                paths: ['/', '/ru/'],
                lastmod: '2026-05-28',
            }),
        ).toContain('<loc>https://example.com/ru/</loc>\n    <lastmod>2026-05-28</lastmod>')
    })
})
