<!-- intent-skills:start -->

## Skill Loading

Before substantial work:

- Skill check: run `bunx @tanstack/intent@latest list`, or use skills already listed in context.
- Skill guidance: if one local skill clearly matches the task, run `bunx @tanstack/intent@latest load <package>#<skill>` and follow the returned `SKILL.md`.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.

<!-- intent-skills:end -->

## Project Context

This repository is `tanplate`, a TanStack Start application scaffolded on 2026-05-28 and then expanded into a Bun-ready starter workspace. The original scaffold command was:

```bash
npx @tanstack/cli@latest create my-tanstack-app --agent --tailwind --add-ons sentry
```

The app was created from the Blank template in `my-tanstack-app`, then moved into the repository root. The CLI reported that `--tailwind` is deprecated because Tailwind is always enabled in current Start scaffolds.

## Stack And Integrations

- React 19 with TanStack Start file routing.
- Tailwind CSS v4 through `@tailwindcss/vite`.
- Sentry through `@sentry/tanstackstart-react` and `instrument.server.mjs`.
- TanStack Devtools with Router, Query, and Form panels in `src/routes/__root.tsx`.
- TanStack Query through `@tanstack/react-query` and `@tanstack/react-router-ssr-query`.
- TanStack Form through `@tanstack/react-form`.
- Typed environment validation through `@t3-oss/env-core`, `@t3-oss/env-nextjs`, and Zod in `src/env`.
- Reusable UI components through `@base-ui/react`, `class-variance-authority`, `tailwind-merge`, and `lucide-react`.
- OpenAPI linting, bundling, and code generation through Redocly and `@hey-api/openapi-ts`.
- Storybook 10 through `@storybook/tanstack-react`.
- Vitest unit tests in Node and component tests in Vitest Browser Mode through `@vitest/browser-playwright` and `vitest-browser-react`.
- Oxlint and Oxfmt for linting and formatting.
- Lefthook for Git hooks.
- Nitro with the Bun preset for server output.
- Bun is the package manager and runtime. Use `bun install`, `bun run dev`, `bun run build`, and `bun run start`; do not switch scripts or lockfiles to npm, pnpm, or yarn.

## Environment Variables

Local env values belong in `.env.local`, which is intentionally ignored by git. Keep `.env.example` committed with key names only. Empty strings are treated as unset by the env validators.

- `VITE_SENTRY_DSN`: enables Sentry when set. If empty, the app logs that Sentry is disabled.
- `SITE_URL`: canonical site URL used by TanStack Start when writing `sitemap.xml` during builds. If unset, local builds fall back to `http://localhost:3000`.
- `SENTRY_ORG`: Sentry org for release/source map workflows.
- `SENTRY_PROJECT`: Sentry project for release/source map workflows.
- `SENTRY_AUTH_TOKEN`: secret token for Sentry release/source map workflows. Never commit a real value.
- `SKIP_ENV_VALIDATION`: optional escape hatch for server-side tooling when set to `true`.

## Architecture Notes

- `src/router.tsx` creates a `QueryClient` per router instance and calls `setupRouterSsrQueryIntegration`.
- `defaultPreloadStaleTime` is `0` so Router preloading does not compete with TanStack Query caching.
- The root route uses `createRootRouteWithContext` so route loaders can access `queryClient`.
- Server-only work belongs in `createServerFn`; loaders are isomorphic and must not import DB, filesystem, or secrets directly.
- Use a vertical-slice architecture with a thin shared layer. Keep URL wiring in `src/routes`, business modules in `src/features/<feature>`, primitives in `src/components/ui`, app-level shared compositions in `src/components/patterns`, and small domain-free helpers in `src/utils`.
- Keep route files thin. A route file may define `createFileRoute`, `beforeLoad`, `validateSearch`, `loader`, `head`, and the page wiring, but larger page implementation details should move into page-local components or feature modules.
- Put page-local components under a shared `-components` folder beside the route, for example `src/routes/_authenticated/-components/dashboard-page.tsx`. TanStack Router ignores files and folders with the default `routeFileIgnorePrefix` of `-`. When several sibling routes share one `-components` folder, prefix filenames with the route name or group them in route-named subfolders.
- `src/features/auth` is the auth module. Treat auth as a cross-cutting product feature, not generic infrastructure and not an OpenAPI client concern. Keep OAuth providers, session helpers, auth server functions, auth utilities, and auth-specific UI/forms there; keep `src/routes/auth/**`, `src/routes/sign-in.tsx`, and auth guards as thin route wiring.
- `src/features/<feature>` owns business/domain code for that feature: server functions, query options, schemas, domain utilities, forms, and domain-specific components. Prefer feature-local helpers before promoting code to shared `src/utils` or `src/components`.
- `src/components/ui` contains Base UI-backed primitives. Keep exports in local `index.ts` files, use existing `composeClassName`/variant patterns, and add colocated browser tests/stories for new public UI components.
- `src/components/form` contains the app-specific TanStack Form hook and field components. Prefer extending this layer over hand-rolling form wiring in routes.
- `src/components/patterns` is for reusable, non-domain UI compositions such as page headers, empty states, filter toolbars, metric tiles, and confirmation dialogs. Do not import from `src/features` or `src/routes` here.
- Existing shared specialized components such as `src/components/markdown`, `src/components/table`, `src/components/image`, and `src/components/code-block` may stay under `src/components/<component>` when they are reusable but not UI primitives.
- Import direction should stay one-way: routes may import features/components/utils; features may import shared components, generated API clients, env, and utils; shared components must not import routes or features; `src/components/ui` must stay at the bottom of the UI dependency graph.
- `src/utils` is for small pure helpers and domain-free library code. Do not put React components, route logic, or server-only integrations there.
- `src/api/openapi/<name>/openapi.yaml` files are the OpenAPI entrypoints. `src/api/openapi/dist/<name>.yaml` contains bundled schemas. `src/api/generated/<name>` contains generated output from `bun run api:generate`; regenerate it instead of hand-editing generated files.
- Test files use suffix conventions: `*.unit.test.ts` for Node.js runtime tests and `*.browser.test.tsx` for browser component tests.
- Lint with `bun run lint`; Oxlint enables built-in Unicorn and Vitest rules, plus `eslint-plugin-better-tailwindcss` through Oxlint `jsPlugins`. Format-check with `bun run fmt:check`; write formatting with `bun run fmt`.
- `lefthook.yml` defines a parallel `pre-commit` hook for TypeScript checking, linting, and tests. `bun install` runs `lefthook install` through the `prepare` script.
- `.storybook/preview.tsx` imports the app stylesheet, wraps stories in a shared `QueryClientProvider`, and passes the same `queryClient` through TanStack Router story context.

## Common Commands

- Development: `bun run dev`.
- Production build: `bun run build`.
- Production start: `bun run start`.
- Type checking: `bun run typecheck`.
- Linting: `bun run lint`; autofix with `bun run lint:fix`.
- Formatting: `bun run fmt:check`; write formatting with `bun run fmt`.
- Tests: `bun run test`, `bun run test:unit`, or `bun run test:browser`.
- OpenAPI: `bun run api:lint`, `bun run api:bundle`, `bun run api:generate`, or `bun run api:watch`.
- Storybook: `bun run storybook` or `bun run build-storybook`.

## Deployment Notes

- Production build: `bun run build`.
- Production start: `bun run start`.
- Pre-commit quality gate: `bunx lefthook run pre-commit`.
- Container build: `docker build -t my-tanstack-app .`.
- Container run: `docker run --rm -p 3000:3000 --env-file .env.local my-tanstack-app`.
- The Dockerfile uses `oven/bun:1.3.6`, installs with `bun.lock`, builds with Nitro, and runs `.output/server/index.mjs` with Bun.

## Known Gotchas

- Run `bunx @tanstack/intent@latest list` before substantial TanStack changes and load the most specific local skill.
- `devtools()` must stay first in `vite.config.ts`; `tanstackStart()` must remain before `viteReact()`.
- Bun blocks unknown lifecycle scripts. `@sentry/cli` is listed in `trustedDependencies` because the Sentry add-on needs its postinstall.
- Do not add a separate ESLint runner for the current lint setup. Oxlint owns linting; `eslint-plugin-better-tailwindcss` is loaded through Oxlint `jsPlugins`, which Oxlint currently marks as alpha.
- Do not switch this app to Next.js, Remix, or `react-router-dom` patterns.
- Do not add `@testing-library/*`; component tests should use `vitest-browser-react` and Vitest browser locators.
- Do not import server-only env or Sentry server instrumentation into client code. Use the `src/env/client.ts` and `src/env/server.ts` split.
- Do not hand-edit files in `src/api/generated`; update the matching `src/api/openapi/<name>/openapi.yaml` and rerun the API generation command.
- Storybook stories should rely on `.storybook/preview.tsx` providers instead of creating ad hoc Query clients unless a test case requires isolation.

## Next Steps

- Add real product routes under `src/routes`.
- Replace starter data in `src/features/starter/starter-functions.ts` with application data.
- Replace the placeholder OpenAPI contract with the real backend schema.
- Continue growing the UI and form component layers with colocated stories and browser tests.
