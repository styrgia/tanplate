ARG BUN_VERSION=1.3.14

FROM oven/bun:${BUN_VERSION} AS deps
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM oven/bun:${BUN_VERSION} AS build
WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

FROM oven/bun:${BUN_VERSION} AS prod-deps
WORKDIR /app
ENV NODE_ENV=production

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

FROM oven/bun:${BUN_VERSION} AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/.output ./.output

EXPOSE 3000
CMD ["bun", "--import", "./.output/server/instrument.server.mjs", ".output/server/index.mjs"]
