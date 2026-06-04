import { Braces, FileText } from 'lucide-react'

import { CodeBlock } from '#/components/code-block'
import { Markdown } from '#/components/markdown'

const markdownExample = `
## Server function note

Use **Markdown** for release notes, docs, and rich product copy.

- GitHub-flavored markdown
- Sanitized raw HTML
- Shiki-highlighted fenced code

\`\`\`ts
const note = await createServerFn({ method: 'GET' }).handler(() => {
    return 'Rendered through Markdown'
})
\`\`\`
`

const shikiExample = `import { CodeBlock } from '#/components/code-block'

export function Example() {
    return (
        <CodeBlock
            code="const ready = true"
            lang="ts"
        />
    )
}`

export function RenderingShowcase() {
    return (
        <section
            className="
              grid gap-6
              lg:grid-cols-[1.05fr_0.95fr]
            "
        >
            <article
                className="
                  rounded-lg border border-zinc-200 bg-white p-6 shadow-sm
                "
            >
                <div className="flex items-center gap-3">
                    <FileText aria-hidden="true" className="size-5 text-emerald-700" />
                    <div>
                        <h2 className="text-xl font-semibold">Markdown preview</h2>
                        <p className="text-sm text-zinc-600">Rich content rendered in place.</p>
                    </div>
                </div>

                <Markdown className="mt-6" content={markdownExample} />
            </article>

            <article
                className="
                  rounded-lg border border-zinc-200 bg-white p-6 shadow-sm
                "
            >
                <div className="flex items-center gap-3">
                    <Braces aria-hidden="true" className="size-5 text-sky-700" />
                    <div>
                        <h2 className="text-xl font-semibold">Standalone Shiki</h2>
                        <p className="text-sm text-zinc-600">
                            Syntax highlighting without markdown.
                        </p>
                    </div>
                </div>

                <CodeBlock
                    aria-label="Standalone Shiki example"
                    className="mt-6"
                    code={shikiExample}
                    lang="tsx"
                />
            </article>
        </section>
    )
}
