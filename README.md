# TanStack Start Bun Starter

Blank TanStack Start app scaffolded with React, Tailwind, Sentry, Nitro, TanStack Query, and TanStack Form.

## Commands

```bash
bun install
bun run dev
bun run build
bun run start
bun run test
```

The dev server runs on port `3000`.

## Environment

Copy `.env.example` to `.env.local` for local values. Sentry is disabled when `VITE_SENTRY_DSN` is empty.

```bash
cp .env.example .env.local
```

Required keys are documented in `.env.example`.

## Structure

- `src/router.tsx`: TanStack Router setup plus Query SSR hydration.
- `src/routes/__root.tsx`: document shell, styles, scripts, and TanStack Devtools.
- `src/routes/index.tsx`: starter dashboard using TanStack Query and TanStack Form.
- `src/features/starter/starter-functions.ts`: Start server functions and reusable query options.
- `instrument.server.mjs`: Sentry server instrumentation.
- `vite.config.ts`: Vite, TanStack Start, Nitro Bun preset, Tailwind, and React plugins.
- `Dockerfile`: Bun-based production container.

## Docker

```bash
docker build -t my-tanstack-app .
docker run --rm -p 3000:3000 --env-file .env.local my-tanstack-app
```
