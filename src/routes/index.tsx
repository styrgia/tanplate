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

export const Route = createFileRoute('/')({
    loader: ({ context: { queryClient } }) =>
        queryClient.ensureQueryData(starterDashboardQueryOptions()),
    component: Home,
})

export function Home() {
    const queryClient = useQueryClient()
    const [submission, setSubmission] = useState<ProjectNoteResult | null>(null)
    const { data } = useSuspenseQuery(starterDashboardQueryOptions())

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
                        <p className="text-sm font-semibold text-emerald-700">TanStack Start</p>
                        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
                            Bun-ready starter workspace
                        </h1>
                        <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
                            A blank Start app with Tailwind, Sentry, Query hydration, Form state,
                            and Nitro configured for Bun containers.
                        </p>
                    </div>
                    <div className="rounded-lg border border-zinc-200 bg-white px-4 py-3 shadow-sm">
                        <div className="flex items-center gap-3">
                            <Terminal aria-hidden="true" className="h-5 w-5 text-sky-700" />
                            <div>
                                <p className="text-sm font-medium">Runtime</p>
                                <p className="text-sm text-zinc-600">{data.runtime}</p>
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
                                <h2 className="text-xl font-semibold">Query-backed status</h2>
                                <p className="text-sm text-zinc-600">
                                    Last server response:{' '}
                                    {new Intl.DateTimeFormat('en', {
                                        dateStyle: 'medium',
                                        timeStyle: 'medium',
                                    }).format(new Date(data.generatedAt))}
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
                                <h2 className="text-xl font-semibold">Form handoff</h2>
                                <p className="text-sm text-zinc-600">
                                    Submit a setup note through TanStack Form.
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
                                            : 'Use at least 2 characters.',
                                }}
                            >
                                {(field) => (
                                    <field.TextField
                                        controlClassName="h-11 text-base font-normal"
                                        label="Name"
                                    />
                                )}
                            </form.AppField>

                            <form.AppField
                                name="nextStep"
                                validators={{
                                    onChange: ({ value }) =>
                                        value.trim().length >= 8
                                            ? undefined
                                            : 'Use at least 8 characters.',
                                }}
                            >
                                {(field) => (
                                    <field.TextareaField
                                        controlClassName="h-auto min-h-28 resize-y py-2 text-base font-normal leading-6"
                                        label="Next step"
                                    />
                                )}
                            </form.AppField>

                            <form.AppForm>
                                <form.SubmitButton className="h-11" disabled={saveNote.isPending}>
                                    <Send aria-hidden="true" className="h-4 w-4" />
                                    {saveNote.isPending ? 'Saving' : 'Save note'}
                                </form.SubmitButton>
                            </form.AppForm>

                            {saveNote.isError ? (
                                <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                                    {getErrorMessage(saveNote.error)}
                                </p>
                            ) : null}

                            {submission ? (
                                <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm leading-6 text-emerald-800">
                                    Saved for {submission.contactName}:{' '}
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

    return 'Something went wrong.'
}
