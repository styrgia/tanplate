<!-- intent-skills:start -->

## Skill Loading

Before substantial work:

- Skill check: run `bunx @tanstack/intent@latest list`, or use skills already listed in context.
- Skill guidance: if one local skill clearly matches the task, run `bunx @tanstack/intent@latest load <package>#<skill>` and follow the returned `SKILL.md`.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.

<!-- intent-skills:end -->

## Project Context

This repository is a TanStack Start application scaffolded on 2026-05-28. The exact scaffold command was:

```bash
npx @tanstack/cli@latest create my-tanstack-app --agent --tailwind --add-ons sentry
```

The app was created from the Blank template in `my-tanstack-app`, then moved into the repository root. The CLI reported that `--tailwind` is deprecated because Tailwind is always enabled in current Start scaffolds.

## Stack And Integrations

- React 19 with TanStack Start file routing.
- Tailwind CSS v4 through `@tailwindcss/vite`.
- Sentry through `@sentry/tanstackstart-react` and `instrument.server.mjs`.
- TanStack Devtools with the Router panel in `src/routes/__root.tsx`.
- TanStack Query through `@tanstack/react-query` and `@tanstack/react-router-ssr-query`.
- TanStack Form through `@tanstack/react-form`.
- Vitest unit tests in Node and component tests in Vitest Browser Mode through `@vitest/browser-playwright` and `vitest-browser-react`.
- Oxlint and Oxfmt for linting and formatting.
- Lefthook for Git hooks.
- Nitro with the Bun preset for server output.
- Bun is the package manager and runtime. Use `bun install`, `bun run dev`, `bun run build`, and `bun run start`.

## Environment Variables

Local env values belong in `.env.local`, which is intentionally ignored by git. Keep `.env.example` committed with key names only.

- `VITE_SENTRY_DSN`: enables Sentry when set. If empty, the app logs that Sentry is disabled.
- `VITE_SENTRY_ORG`: Sentry org for release/source map workflows.
- `VITE_SENTRY_PROJECT`: Sentry project for release/source map workflows.
- `SENTRY_AUTH_TOKEN`: secret token for Sentry release/source map workflows. Never commit a real value.

## Architecture Notes

- `src/router.tsx` creates a `QueryClient` per router instance and calls `setupRouterSsrQueryIntegration`.
- `defaultPreloadStaleTime` is `0` so Router preloading does not compete with TanStack Query caching.
- The root route uses `createRootRouteWithContext` so route loaders can access `queryClient`.
- Server-only work belongs in `createServerFn`; loaders are isomorphic and must not import DB, filesystem, or secrets directly.
- `src/features/starter/starter-functions.ts` contains the starter server functions and reusable query options.
- Test files use suffix conventions: `*.unit.test.ts` for Node.js runtime tests and `*.browser.test.tsx` for browser component tests.
- Lint with `bun run lint`; Oxlint enables built-in Unicorn and Vitest rules, plus `eslint-plugin-better-tailwindcss` through Oxlint `jsPlugins`. Format-check with `bun run fmt:check`; write formatting with `bun run fmt`.
- `lefthook.yml` defines a parallel `pre-commit` hook for TypeScript checking, linting, and tests. `bun install` runs `lefthook install` through the `prepare` script.

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

## Next Steps

- Add real product routes under `src/routes`.
- Replace starter data in `src/features/starter/starter-functions.ts` with application data.
- Decide whether to add Query/Form devtools plugins once the app has real data workflows.
