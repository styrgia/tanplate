## The `openapi` folder

This folder contains one `openapi.yaml` entrypoint per API surface.

Current examples:

- `catalog/openapi.yaml` documents `GET /api/catalog/products` and `GET /api/catalog/products/{productId}`.
- `orders/openapi.yaml` documents `GET /api/orders` and `POST /api/orders`.

Each API folder keeps the entrypoint thin:

- `paths/*.yaml` contains one OpenAPI Path Item per file.
- `components/schemas/*.yaml` contains reusable schemas.
- `openapi.yaml` wires those files into the top-level `paths` and `components` maps.

The matching TanStack Start server routes live under `src/routes/api`.

To add another API:

1. Create `src/api/openapi/<name>/openapi.yaml`.
2. Add a matching alias to `src/api/openapi/redocly.yaml`.
3. Add an input/output job to `src/api/openapi-ts.config.ts`.
4. Add matching route handlers under `src/routes/api`.
5. Add one file per path under `src/api/openapi/<name>/paths`.
6. Add reusable schemas under `src/api/openapi/<name>/components/schemas`.
7. Run `bun run api:lint`, `bun run api:bundle`, and `bun run api:generate`.

`bun run api:generate` writes separate clients to `src/api/generated/<name>`, so different OpenAPI files do not overwrite each other.
