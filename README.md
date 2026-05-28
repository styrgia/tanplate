# TanStack Start Bun Starter

Blank TanStack Start app scaffolded with React, Tailwind, Sentry, Nitro, TanStack Query, and TanStack Form.

## Commands

```bash
bun install
bun run dev
bun run build
bun run start
bun run test
bun run test:unit
bun run test:browser
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
- `src/**/*.unit.test.ts`: Vitest unit tests in the Node.js runtime.
- `src/**/*.browser.test.tsx`: Vitest Browser Mode component tests with `vitest-browser-react`.
- `instrument.server.mjs`: Sentry server instrumentation.
- `vite.config.ts`: Vite, TanStack Start, Nitro Bun preset, Tailwind, and React plugins.
- `Dockerfile`: Bun-based production container.

## Testing

Unit tests run in the normal Node.js runtime. Component tests run in Vitest Browser Mode with Playwright Chromium and `vitest-browser-react`; Testing Library is intentionally not installed.

## Docker

```bash
docker build -t my-tanstack-app .
docker run --rm -p 3000:3000 --env-file .env.local my-tanstack-app
```
