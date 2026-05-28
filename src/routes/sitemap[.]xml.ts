import { createFileRoute } from '@tanstack/react-router'

import { buildSitemapXml, getStaticSitemapPaths, resolveSitemapHost } from '#/seo/sitemap'

export const Route = createFileRoute('/sitemap.xml')({
    server: {
        handlers: {
            GET: ({ request }) => {
                const host = resolveSitemapHost({
                    SITE_URL: process.env.SITE_URL || new URL(request.url).origin,
                })

                return new Response(
                    buildSitemapXml({
                        host,
                        paths: getStaticSitemapPaths(),
                    }),
                    {
                        headers: {
                            'Cache-Control': 'public, max-age=3600',
                            'Content-Type': 'application/xml; charset=utf-8',
                        },
                    },
                )
            },
        },
    },
})
