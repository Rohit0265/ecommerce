# Build this Dockerfile from the monorepo root:
# docker build -t order-services -f apps/order-services/Dockerfile .

FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g --force pnpm@9.0.0 turbo
COPY . .
RUN turbo prune order-service --docker

FROM base AS installer
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install dependencies
COPY --from=builder /app/out/json/ .
RUN pnpm install --frozen-lockfile

# Copy source code
COPY --from=builder /app/out/full/ .

# Build upstream dependencies and the service
RUN npx turbo run build --filter=order-service

FROM base AS runner
WORKDIR /app

# Create a non-privileged user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs
USER expressjs

COPY --from=installer --chown=expressjs:nodejs /app .

WORKDIR /app/apps/order-services
EXPOSE 8001

ENV NODE_ENV=production
CMD ["npx", "tsx", "src/index.ts"]
