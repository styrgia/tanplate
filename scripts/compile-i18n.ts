import { compile } from '@inlang/paraglide-js'

await compile({
    project: './project.inlang',
    outdir: './src/paraglide',
    outputStructure: 'message-modules',
    emitTsDeclarations: true,
    cookieName: 'PARAGLIDE_LOCALE',
    strategy: ['url', 'cookie', 'preferredLanguage', 'baseLocale'],
    urlPatterns: [
        {
            pattern: '/:path(.*)?',
            localized: [
                ['ru', '/ru/:path(.*)?'],
                ['en', '/:path(.*)?'],
            ],
        },
    ],
})
