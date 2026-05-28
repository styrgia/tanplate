# TanStack Start Bun Starter

Blank TanStack Start app scaffolded with React, Tailwind, Sentry, Nitro, TanStack Query, and TanStack Form.

## Commands

```bash
bun install
bun run dev
bun run build
bun run start
bun run lint
bun run fmt:check
bun run fmt
bun run typecheck
bun run api:lint
bun run api:bundle
bun run api:generate
bun run storybook
bun run build-storybook
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

## OpenAPI Codegen

OpenAPI code generation is configured with `@hey-api/openapi-ts` in `openapi-ts.config.ts`.

```bash
bun run api:lint
bun run api:bundle
bun run api:generate
bun run api:watch
```

The OpenAPI entrypoint lives at `src/api/openapi/openapi.yaml`. Redocly linting and bundling are configured in `src/api/openapi/redocly.yaml`; `bun run api:bundle` writes the bundled schema to `src/api/openapi/dist/openapi.yaml`. The generator reads `src/api/openapi/openapi.yaml` and writes a fetch-based client to `src/api/generated`. The checked-in OpenAPI file is a minimal placeholder contract; replace it with the real API schema when the backend contract is ready. The output includes TypeScript request/response/model types, SDK request functions with Zod request and response validation, Zod schemas, and TanStack Query query/mutation hooks.

## Storybook

Storybook is configured with `@storybook/tanstack-react` in `.storybook/main.ts`. The preview imports the app stylesheet and provides a shared TanStack Query client through both `QueryClientProvider` and TanStack Router story context.

```bash
bun run storybook
bun run build-storybook
```

## Linting And Formatting

Oxlint and Oxfmt are installed as exact-pinned dev dependencies.

```bash
bun run lint
bun run lint:fix
bun run fmt:check
bun run fmt
```

Oxlint enables built-in `unicorn` and `vitest` rules. `eslint-plugin-better-tailwindcss` is loaded through Oxlint `jsPlugins`.

## Git Hooks

Lefthook installs Git hooks through `bun install`. The `pre-commit` hook runs TypeScript checking, linting, and tests in parallel.

```bash
bunx lefthook run pre-commit
```

## Docker

```bash
docker build -t my-tanstack-app .
docker run --rm -p 3000:3000 --env-file .env.local my-tanstack-app
```
