import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { ArrowRight, GitBranch, KeyRound, LogIn, Mail, Search } from 'lucide-react'

import { useAppForm } from '#/components/form'
import { getCurrentAuthSession, signInWithPassword } from '#/features/auth/auth-functions'
import {
    AUTH_PROVIDER_IDS,
    type AuthProviderId,
    getAuthProviderLabel,
} from '#/features/auth/auth-providers'
import { type PasswordSignInInput, sanitizeAuthRedirect } from '#/features/auth/auth-utils'

export const Route = createFileRoute('/sign-in')({
    ssr: false,
    validateSearch: (search) => ({
        authError: search.authError === 'oauth' ? 'oauth' : undefined,
        redirect: sanitizeAuthRedirect(search.redirect),
    }),
    beforeLoad: async ({ search }) => {
        const session = await getCurrentAuthSession()

        if (session.isAuthenticated) {
            throw redirect({ href: search.redirect, replace: true })
        }
    },
    component: SignIn,
})

function SignIn() {
    const search = Route.useSearch()
    const [errorMessage, setErrorMessage] = useState<string | null>(
        search.authError === 'oauth' ? 'External sign-in failed. Try again.' : null,
    )

    const passwordSignIn = useMutation({
        mutationFn: (value: PasswordSignInInput) => signInWithPassword({ data: value }),
        onError: (error) => {
            setErrorMessage(getSignInErrorMessage(error))
        },
        onSuccess: () => {
            window.location.assign(search.redirect)
        },
    })

    const form = useAppForm({
        defaultValues: {
            email: '',
            password: '',
        },
        onSubmit: async ({ value }) => {
            setErrorMessage(null)
            await passwordSignIn.mutateAsync(value)
        },
    })

    return (
        <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-950">
            <div
                className="
                  mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-5xl
                  items-center gap-8
                  lg:grid-cols-[1fr_24rem]
                "
            >
                <section className="max-w-2xl">
                    <p className="text-sm font-semibold text-emerald-700">Secure access</p>
                    <h1
                        className="
                          mt-3 text-3xl font-semibold
                          sm:text-4xl
                        "
                    >
                        Sign in to the workspace
                    </h1>
                    <p className="mt-4 max-w-xl text-base/7 text-zinc-600">
                        Continue with your organization provider or sign in with your account
                        credentials.
                    </p>
                </section>

                <section
                    aria-labelledby="sign-in-title"
                    className="
                      rounded-lg border border-zinc-200 bg-white p-6 shadow-sm
                    "
                >
                    <div className="flex items-center gap-3">
                        <KeyRound aria-hidden="true" className="size-5 text-emerald-700" />
                        <div>
                            <h2 className="text-xl font-semibold" id="sign-in-title">
                                Sign in
                            </h2>
                            <p className="text-sm text-zinc-600">Use email or your provider.</p>
                        </div>
                    </div>

                    <div
                        className="
                          mt-6 grid gap-2
                          sm:grid-cols-2
                        "
                    >
                        {AUTH_PROVIDER_IDS.map((provider) => (
                            <a
                                className="
                                  inline-flex h-11 items-center justify-center
                                  gap-2 rounded-md border border-zinc-300
                                  bg-white px-3 text-sm font-semibold
                                  text-zinc-800 transition
                                  hover:border-zinc-400 hover:bg-zinc-50
                                  focus-visible:ring-2
                                  focus-visible:ring-emerald-600
                                  focus-visible:ring-offset-2
                                  focus-visible:outline-none
                                "
                                href={getExternalSignInHref(provider, search.redirect)}
                                key={provider}
                            >
                                <ProviderIcon provider={provider} />
                                {getAuthProviderLabel(provider)}
                            </a>
                        ))}
                    </div>

                    <div
                        className="
                          my-6 flex items-center gap-3 text-xs font-medium
                          text-zinc-500 uppercase
                        "
                    >
                        <span className="h-px flex-1 bg-zinc-200" />
                        <span>Email</span>
                        <span className="h-px flex-1 bg-zinc-200" />
                    </div>

                    <form
                        className="flex flex-col gap-4"
                        onSubmit={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                            form.handleSubmit()
                        }}
                    >
                        <form.AppField
                            name="email"
                            validators={{
                                onChange: ({ value }) =>
                                    value.trim().includes('@')
                                        ? undefined
                                        : 'Enter a valid email address.',
                            }}
                        >
                            {(field) => (
                                <field.TextField
                                    autoComplete="email"
                                    controlClassName="h-11 text-base font-normal"
                                    label={
                                        <span
                                            className="
                                              inline-flex items-center gap-2
                                            "
                                        >
                                            <Mail aria-hidden="true" className="size-4" />
                                            Email
                                        </span>
                                    }
                                    type="email"
                                />
                            )}
                        </form.AppField>

                        <form.AppField
                            name="password"
                            validators={{
                                onChange: ({ value }) =>
                                    value.length >= 8 ? undefined : 'Enter your password.',
                            }}
                        >
                            {(field) => (
                                <field.TextField
                                    autoComplete="current-password"
                                    controlClassName="h-11 text-base font-normal"
                                    label="Password"
                                    type="password"
                                />
                            )}
                        </form.AppField>

                        <form.AppForm>
                            <form.SubmitButton className="h-11" disabled={passwordSignIn.isPending}>
                                {passwordSignIn.isPending ? 'Signing in...' : 'Sign in'}
                                <ArrowRight aria-hidden="true" className="size-4" />
                            </form.SubmitButton>
                        </form.AppForm>

                        {errorMessage ? (
                            <p
                                className="
                                  rounded-md border border-red-200 bg-red-50
                                  px-3 py-2 text-sm text-red-700
                                "
                            >
                                {errorMessage}
                            </p>
                        ) : null}
                    </form>
                </section>
            </div>
        </main>
    )
}

function getExternalSignInHref(provider: AuthProviderId, redirectTo: string) {
    return `/auth/${provider}/start?redirect=${encodeURIComponent(redirectTo)}`
}

function ProviderIcon({ provider }: { provider: AuthProviderId }) {
    if (provider === 'github') {
        return <GitBranch aria-hidden="true" className="size-4" />
    }

    if (provider === 'google' || provider === 'yandex') {
        return <Search aria-hidden="true" className="size-4" />
    }

    return <LogIn aria-hidden="true" className="size-4" />
}

function getSignInErrorMessage(error: unknown) {
    if (error instanceof Error && error.message) {
        return error.message
    }

    return 'Sign-in failed. Try again.'
}
