import { useState } from 'react'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Database, Send, SquarePen, Terminal } from 'lucide-react'

import { useAppForm } from '#/components/form'
import { IntegrationCard } from '#/features/starter/integration-card'
import {
    type ProjectNoteInput,
    type ProjectNoteResult,
    starterDashboardQueryOptions,
    submitProjectNote,
} from '#/features/starter/starter-functions'
import { LOCALE_LABELS } from '#/i18n/config'
import { m } from '#/paraglide/messages.js'
import { getLocale, locales, localizeHref, setLocale } from '#/paraglide/runtime.js'

export const Route = createFileRoute('/')({
    loader: ({ context: { queryClient } }) =>
        queryClient.ensureQueryData(starterDashboardQueryOptions()),
    component: Home,
})

export function Home() {
    const queryClient = useQueryClient()
    const [submission, setSubmission] = useState<ProjectNoteResult | null>(null)
    const { data } = useSuspenseQuery(starterDashboardQueryOptions())
    const currentLocale = getLocale()

    const saveNote = useMutation({
        mutationFn: (value: ProjectNoteInput) => submitProjectNote({ data: value }),
        onSuccess: async (result) => {
            setSubmission(result)
            await queryClient.invalidateQueries({
                queryKey: starterDashboardQueryOptions().queryKey,
            })
        },
    })

    const form = useAppForm({
        defaultValues: {
            contactName: '',
            nextStep: '',
        },
        onSubmit: async ({ value }) => {
            await saveNote.mutateAsync(value)
        },
    })

    return (
        <main className="min-h-screen bg-zinc-50 px-6 py-8 text-zinc-950">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
                <header className="flex flex-col gap-4 border-b border-zinc-200 pb-6 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-3xl">
                        <p className="text-sm font-semibold text-emerald-700">{m.home_badge()}</p>
                        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
                            {m.home_title()}
                        </h1>
                        <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
                            {m.home_description()}
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row md:items-center">
                        <nav
                            aria-label={m.language_switcher_label()}
                            className="flex items-center gap-2"
                        >
                            {locales.map((locale) => (
                                <a
                                    aria-current={locale === currentLocale ? 'page' : undefined}
                                    className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:border-zinc-300 hover:bg-zinc-50 aria-[current=page]:border-emerald-600 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-800"
                                    href={localizeHref('/', { locale })}
                                    key={locale}
                                    onClick={() => {
                                        void setLocale(locale, { reload: false })
                                    }}
                                >
                                    {LOCALE_LABELS[locale]}
                                </a>
                            ))}
                        </nav>
                        <div className="rounded-lg border border-zinc-200 bg-white px-4 py-3 shadow-sm">
                            <div className="flex items-center gap-3">
                                <Terminal aria-hidden="true" className="h-5 w-5 text-sky-700" />
                                <div>
                                    <p className="text-sm font-medium">{m.runtime_label()}</p>
                                    <p className="text-sm text-zinc-600">{data.runtime}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <section className="grid gap-4 md:grid-cols-3">
                    {data.integrations.map((integration) => (
                        <IntegrationCard integration={integration} key={integration} />
                    ))}
                </section>

                <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <Database aria-hidden="true" className="h-5 w-5 text-cyan-700" />
                            <div>
                                <h2 className="text-xl font-semibold">{m.query_status_title()}</h2>
                                <p className="text-sm text-zinc-600">
                                    {m.last_server_response({
                                        generatedAt: new Intl.DateTimeFormat(currentLocale, {
                                            dateStyle: 'medium',
                                            timeStyle: 'medium',
                                        }).format(new Date(data.generatedAt)),
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 grid gap-3">
                            {data.checklist.map((item) => (
                                <article
                                    className="rounded-lg border border-zinc-200 bg-zinc-50 p-4"
                                    key={item.label}
                                >
                                    <h3 className="font-medium">{item.label}</h3>
                                    <p className="mt-1 text-sm leading-6 text-zinc-600">
                                        {item.detail}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <SquarePen aria-hidden="true" className="h-5 w-5 text-violet-700" />
                            <div>
                                <h2 className="text-xl font-semibold">{m.form_handoff_title()}</h2>
                                <p className="text-sm text-zinc-600">
                                    {m.form_handoff_description()}
                                </p>
                            </div>
                        </div>

                        <form
                            className="mt-6 flex flex-col gap-4"
                            onSubmit={(event) => {
                                event.preventDefault()
                                event.stopPropagation()
                                form.handleSubmit()
                            }}
                        >
                            <form.AppField
                                name="contactName"
                                validators={{
                                    onChange: ({ value }) =>
                                        value.trim().length >= 2
                                            ? undefined
                                            : m.contact_name_error(),
                                }}
                            >
                                {(field) => (
                                    <field.TextField
                                        controlClassName="h-11 text-base font-normal"
                                        label={m.name_label()}
                                    />
                                )}
                            </form.AppField>

                            <form.AppField
                                name="nextStep"
                                validators={{
                                    onChange: ({ value }) =>
                                        value.trim().length >= 8 ? undefined : m.next_step_error(),
                                }}
                            >
                                {(field) => (
                                    <field.TextareaField
                                        controlClassName="h-auto min-h-28 resize-y py-2 text-base font-normal leading-6"
                                        label={m.next_step_label()}
                                    />
                                )}
                            </form.AppField>

                            <form.AppForm>
                                <form.SubmitButton className="h-11" disabled={saveNote.isPending}>
                                    <Send aria-hidden="true" className="h-4 w-4" />
                                    {saveNote.isPending ? m.saving() : m.save_note()}
                                </form.SubmitButton>
                            </form.AppForm>

                            {saveNote.isError ? (
                                <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                                    {getErrorMessage(saveNote.error)}
                                </p>
                            ) : null}

                            {submission ? (
                                <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm leading-6 text-emerald-800">
                                    {m.saved_for({ contactName: submission.contactName })}{' '}
                                    <span className="font-medium">{submission.nextStep}</span>
                                </p>
                            ) : null}
                        </form>
                    </div>
                </section>
            </div>
        </main>
    )
}

function getErrorMessage(error: unknown) {
    if (error instanceof Error) {
        return error.message
    }

    return m.save_error()
}
