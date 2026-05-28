import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'

export type ProjectNoteInput = {
  contactName: string
  nextStep: string
}

export type ProjectNoteResult = {
  contactName: string
  nextStep: string
  receivedAt: string
}

const checklist = [
  {
    label: 'Blank Start app',
    detail: 'React file routing, Tailwind, Sentry, and Nitro are scaffolded.',
  },
  {
    label: 'Query bridge',
    detail: 'Router SSR hydration is wired through @tanstack/react-router-ssr-query.',
  },
  {
    label: 'Form workflow',
    detail: 'TanStack Form submits to a Start server function via React Query mutation.',
  },
  {
    label: 'Bun containers',
    detail: 'Nitro targets the Bun preset and the Dockerfile runs with Bun.',
  },
] as const

export const getStarterDashboard = createServerFn({ method: 'GET' }).handler(
  async () => ({
    generatedAt: new Date().toISOString(),
    runtime: 'Bun',
    integrations: ['TanStack Start', 'TanStack Query', 'TanStack Form'],
    checklist,
  }),
)

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

export function normalizeProjectNote(data: unknown): ProjectNoteInput {
  if (!isRecord(data)) {
    throw new Error('Expected an object payload.')
  }

  const contactName = String(data.contactName ?? '').trim()
  const nextStep = String(data.nextStep ?? '').trim()

  if (contactName.length < 2) {
    throw new Error('Name must be at least 2 characters.')
  }

  if (nextStep.length < 8) {
    throw new Error('Next step must be at least 8 characters.')
  }

  return {
    contactName,
    nextStep,
  }
}

export const submitProjectNote = createServerFn({ method: 'POST' })
  .inputValidator(normalizeProjectNote)
  .handler(async ({ data }): Promise<ProjectNoteResult> => {
    return {
      ...data,
      receivedAt: new Date().toISOString(),
    }
  })

export function starterDashboardQueryOptions() {
  return queryOptions({
    queryKey: ['starter-dashboard'],
    queryFn: () => getStarterDashboard(),
    staleTime: 60 * 1000,
  })
}
