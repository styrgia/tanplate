import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { LogOut, ShieldCheck } from 'lucide-react'

import { Button } from '#/components/ui/button'
import { signOut } from '#/features/auth/auth-functions'

export const Route = createFileRoute('/_authenticated/dashboard')({
    component: Dashboard,
})

function Dashboard() {
    const { auth } = Route.useRouteContext()
    const logout = useMutation({
        mutationFn: () => signOut(),
        onSuccess: () => {
            window.location.assign('/sign-in')
        },
    })

    return (
        <main className="min-h-screen bg-zinc-50 px-6 py-8 text-zinc-950">
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
                <header className="flex flex-col gap-4 border-b border-zinc-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold text-emerald-700">Dashboard</p>
                        <h1 className="mt-2 text-3xl font-semibold">Protected workspace</h1>
                        <p className="mt-3 max-w-xl text-base leading-7 text-zinc-600">
                            You are signed in{auth.user?.email ? ` as ${auth.user.email}` : ''}.
                        </p>
                    </div>

                    <Button
                        className="h-11 bg-white text-zinc-800 ring-1 ring-zinc-300 hover:bg-zinc-50"
                        disabled={logout.isPending}
                        onClick={() => logout.mutate()}
                    >
                        <LogOut aria-hidden="true" className="h-4 w-4" />
                        {logout.isPending ? 'Signing out...' : 'Sign out'}
                    </Button>
                </header>

                <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
                    <div className="flex items-start gap-3">
                        <ShieldCheck
                            aria-hidden="true"
                            className="mt-0.5 h-5 w-5 text-emerald-700"
                        />
                        <div>
                            <h2 className="text-xl font-semibold">Session is active</h2>
                            <p className="mt-2 text-sm leading-6 text-zinc-600">
                                Your workspace is ready for the next authenticated workflow.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}
