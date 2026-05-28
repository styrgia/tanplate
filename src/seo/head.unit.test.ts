import { describe, expect, it } from 'vitest'

import { createSeoHead } from './head'

describe('createSeoHead', () => {
    it('creates title, description, Open Graph, and Twitter metadata', () => {
        expect(
            createSeoHead({
                description: 'Build a full-stack React app with TanStack Start.',
                image: '/og.png',
                siteName: 'Tanplate',
                siteUrl: 'https://example.com',
                title: 'Starter',
            }).meta,
        ).toEqual([
            { title: 'Starter | Tanplate' },
            {
                name: 'description',
                content: 'Build a full-stack React app with TanStack Start.',
            },
            { property: 'og:title', content: 'Starter | Tanplate' },
            {
                property: 'og:description',
                content: 'Build a full-stack React app with TanStack Start.',
            },
            { property: 'og:site_name', content: 'Tanplate' },
            { property: 'og:type', content: 'website' },
            { property: 'og:image', content: 'https://example.com/og.png' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: 'Starter | Tanplate' },
            {
                name: 'twitter:description',
                content: 'Build a full-stack React app with TanStack Start.',
            },
            { name: 'twitter:image', content: 'https://example.com/og.png' },
        ])
    })

    it('creates canonical and alternate links from a site URL and paths', () => {
        expect(
            createSeoHead({
                alternates: [
                    { href: '/', hrefLang: 'en' },
                    { href: '/ru/', hrefLang: 'ru' },
                ],
                description: 'Description',
                path: '/ru/',
                siteUrl: 'https://example.com/',
                title: 'Title',
            }).links,
        ).toEqual([
            { rel: 'canonical', href: 'https://example.com/ru/' },
            { rel: 'alternate', href: 'https://example.com/', hrefLang: 'en' },
            { rel: 'alternate', href: 'https://example.com/ru/', hrefLang: 'ru' },
        ])
    })

    it('supports noindex and JSON-LD scripts', () => {
        const head = createSeoHead({
            description: 'Hidden page',
            jsonLd: {
                '@context': 'https://schema.org',
                '@type': 'WebPage',
                name: 'Hidden',
            },
            noIndex: true,
            title: 'Hidden',
            titleTemplate: false,
        })

        expect(head.meta).toContainEqual({ name: 'robots', content: 'noindex, nofollow' })
        expect(head.scripts).toEqual([
            {
                type: 'application/ld+json',
                children: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'WebPage',
                    name: 'Hidden',
                }),
            },
        ])
    })
})
