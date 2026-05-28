import { CheckCircle2 } from 'lucide-react'

type IntegrationCardProps = {
    integration: string
}

export function IntegrationCard({ integration }: IntegrationCardProps) {
    return (
        <article className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
            <CheckCircle2 aria-hidden="true" className="h-5 w-5 text-emerald-700" />
            <h2 className="mt-4 text-lg font-semibold">{integration}</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
                Installed and ready for application code.
            </p>
        </article>
    )
}
