# Build this Dockerfile from the monorepo root:
# docker build -t product-service -f apps/product-service/Dockerfile .

FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g --force pnpm@9.0.0 turbo
COPY . .
RUN turbo prune product-service --docker

FROM base AS installer
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install dependencies
COPY --from=builder /app/out/json/ .
RUN pnpm install --frozen-lockfile

# Copy source code and database models
COPY --from=builder /app/out/full/ .

# Build upstream dependencies and the service
RUN npx turbo run build --filter=product-service

FROM base AS runner
WORKDIR /app

# Create a non-privileged user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs
USER expressjs


COPY --from=installer --chown=expressjs:nodejs /app .

WORKDIR /app/apps/product-service
EXPOSE 8000

ENV NODE_ENV=production
CMD ["npx", "tsx", "src/index.ts"]
