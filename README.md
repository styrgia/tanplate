# Tanplate

Tanplate is a TanStack Start application workspace running on Bun. It started as the Blank TanStack Start template and now includes Tailwind CSS v4, Sentry, Nitro Bun output, TanStack Query/Form/Devtools, Storybook, OpenAPI code generation, a Base UI component layer, and Vitest test projects.

## Quick Start

```bash
bun install
cp .env.example .env.local
bun run dev
```

The dev server runs on port `3000`.

## Commands

| Command                             | Purpose                                                                         |
| ----------------------------------- | ------------------------------------------------------------------------------- |
| `bun install`                       | Install dependencies and Lefthook Git hooks.                                    |
| `bun run dev`                       | Start Vite/TanStack Start on port `3000` with `.env.local` loaded.              |
| `bun run build`                     | Build the production app and copy Sentry server instrumentation into `.output`. |
| `bun run start`                     | Run the Nitro Bun production server from `.output/server/index.mjs`.            |
| `bun run preview`                   | Run Vite preview for the built client output.                                   |
| `bun run typecheck`                 | Run TypeScript without emitting files.                                          |
| `bun run lint` / `bun run lint:fix` | Run Oxlint, optionally with fixes.                                              |
| `bun run fmt:check` / `bun run fmt` | Check or write formatting with Oxfmt.                                           |
| `bun run test`                      | Run all Vitest projects.                                                        |
| `bun run test:unit`                 | Run Node.js unit tests.                                                         |
| `bun run test:browser`              | Run browser component tests in Playwright Chromium.                             |
| `bun run test:e2e`                  | Run Playwright end-to-end tests against the app.                                |
| `bun run test:e2e:ui`               | Open the Playwright UI runner.                                                  |
| `bun run test:e2e:debug`            | Run Playwright in headed debug mode.                                            |
| `bun run api:lint`                  | Lint the OpenAPI contracts with Redocly.                                        |
| `bun run api:bundle`                | Bundle the OpenAPI contracts to `src/api/openapi/dist/*.yaml`.                  |
| `bun run api:generate`              | Generate fetch clients, Zod schemas, SDKs, and TanStack Query hooks.            |
| `bun run api:watch`                 | Watch the OpenAPI contracts and regenerate on changes.                          |
| `bun run storybook`                 | Start Storybook on port `6006`.                                                 |
| `bun run build-storybook`           | Build the static Storybook site.                                                |

## Environment

Copy `.env.example` to `.env.local` for local values. Sentry is disabled when `VITE_SENTRY_DSN` is empty.

```bash
cp .env.example .env.local
```

Environment values are validated through `src/env/client.ts` and `src/env/server.ts` with empty strings treated as unset. `SKIP_ENV_VALIDATION=true` can bypass server validation when needed by tooling.

## Structure

- `src/router.tsx`: TanStack Router setup, per-router `QueryClient`, Query SSR hydration, scroll restoration, and intent preloading.
- `src/routes/__root.tsx`: document shell, styles, scripts, and TanStack Devtools with Router, Query, and Form panels.
- `src/routes`: TanStack file routes. Route files own URL shape, guards, search validation, loaders, head metadata, and page wiring.
- `src/features`: vertical product modules such as `auth`, `catalog`, `orders`, and future business domains.
- `src/components/ui`: reusable Base UI-backed components with variants, tests, stories, and browser screenshots.
- `src/components/form`: TanStack Form app hook, shared form contexts, field components, and submit button.
- `src/components/patterns`: shared app-level UI compositions when they are not tied to one business domain, for example page headers, empty states, filter toolbars, and confirmation dialogs.
- `src/components/<component>`: reusable specialized components that are not primitives and already have a clear shared purpose, for example markdown, table, image, and code block rendering.
- `src/api/openapi`: OpenAPI source contracts, Redocly config, and bundled output.
- `src/api/generated`: generated OpenAPI clients, SDKs, Zod schemas, and TanStack Query helpers. Regenerate instead of hand-editing.
- `src/env`: typed environment validation for client and server code.
- `src/i18n` and `src/paraglide`: localization configuration and generated message/runtime output.
- `src/seo`: head metadata and sitemap helpers.
- `src/utils`: small domain-free libraries and pure helpers. Prefer feature-local helpers when logic belongs to one feature.
- `src/**/*.unit.test.ts`: Vitest unit tests in the Node.js runtime.
- `src/**/*.browser.test.tsx`: Vitest Browser Mode component tests with `vitest-browser-react`.
- `.storybook`: Storybook 10 configuration for TanStack React stories.
- `instrument.server.mjs`: Sentry server instrumentation.
- `vite.config.ts`: Vite, TanStack Start, Nitro Bun preset, Tailwind, and React plugins.
- `Dockerfile`: Bun-based production container.

## Architecture Notes

TanStack Start code is isomorphic by default. Put server-only work in `createServerFn` or other Start server-only boundaries; route loaders must not import database clients, filesystem code, or secrets directly.

The root route uses `createRootRouteWithContext` so route loaders can access the per-router `QueryClient`. `defaultPreloadStaleTime` is `0`, which keeps Router preloading from competing with TanStack Query caching.

This app uses a vertical-slice structure with a thin shared layer. Keep business logic inside `src/features/<feature>` and keep `src/routes` thin. Route files should compose feature APIs/components instead of becoming large page implementations.

Authentication belongs in `src/features/auth`. It is a cross-cutting product feature, not a generic utility and not part of the OpenAPI/generated client layer. Auth routes in `src/routes/auth/**`, `src/routes/sign-in.tsx`, and auth guards should call into the feature module.

Page-local components should live next to the route in a shared ignored `-components` folder, for example:

```txt
src/routes/_authenticated/dashboard.tsx
src/routes/_authenticated/-components/
  dashboard-page.tsx
  dashboard-kpi-grid.tsx
  dashboard-activity-feed.tsx
```

TanStack Router ignores route files and folders prefixed with `-` by default. Use `-components` for components that belong to routes in that directory. When several sibling routes share one `-components` folder, prefix filenames with the route name or group them in route-named subfolders.

Shared UI follows these boundaries:

- `src/components/ui`: primitives only. No business words, routes, or feature imports.
- `src/components/form`: app-wide TanStack Form adapters and fields.
- `src/components/patterns`: reusable non-domain compositions.
- `src/features/<feature>/components`: domain-specific components such as product cards, order status badges, and auth provider buttons.

## Testing

Unit tests run in the normal Node.js runtime. Component tests run in Vitest Browser Mode with Playwright Chromium and `vitest-browser-react`; Testing Library is intentionally not installed.

End-to-end tests live in `e2e` and run through Playwright Test. `bun run test:e2e` starts the local dev server automatically through `playwright.config.ts`, or you can point tests at an existing deployment with `PLAYWRIGHT_BASE_URL=https://example.com bun run test:e2e`.

## OpenAPI Codegen

OpenAPI code generation is configured with `@hey-api/openapi-ts` in `src/api/openapi-ts.config.ts`.

```bash
bun run api:lint
bun run api:bundle
bun run api:generate
bun run api:watch
```

Each API surface gets its own entrypoint, for example `src/api/openapi/catalog/openapi.yaml` and `src/api/openapi/orders/openapi.yaml`. Redocly linting and bundling are configured in `src/api/openapi/redocly.yaml`; `bun run api:bundle` writes bundled schemas to `src/api/openapi/dist/catalog.yaml` and `src/api/openapi/dist/orders.yaml`. The generator uses one job per OpenAPI file and writes separate clients to `src/api/generated/<name>`. The output includes TypeScript request/response/model types, SDK request functions with Zod request and response validation, Zod schemas, and TanStack Query query/mutation hooks.

## Storybook

Storybook is configured with `@storybook/tanstack-react` in `.storybook/main.ts`. The preview imports the app stylesheet, provides a shared TanStack Query client through `QueryClientProvider`, and passes the same client into TanStack Router story context.

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
