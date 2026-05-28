import './env/server'

import { createStartHandler, defaultStreamHandler } from '@tanstack/react-start/server'
import type { Register } from '@tanstack/react-router'
import type { RequestHandler } from '@tanstack/react-start/server'
import { paraglideMiddleware } from './paraglide/server.js'

const fetch = createStartHandler(defaultStreamHandler)

export type ServerEntry = { fetch: RequestHandler<Register> }

export function createServerEntry(entry: ServerEntry): ServerEntry {
    return {
        async fetch(request, ...args) {
            return await paraglideMiddleware(request, () => entry.fetch(request, ...args))
        },
    }
}

export default createServerEntry({ fetch })
