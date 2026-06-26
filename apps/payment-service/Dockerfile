# Build this Dockerfile from the monorepo root:
# docker build -t payment-service -f apps/payment-service/Dockerfile .

FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g --force pnpm@9.0.0 turbo
COPY . .
RUN turbo prune payment-service --docker

FROM base AS installer
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install dependencies
COPY --from=builder /app/out/json/ .
RUN pnpm install --frozen-lockfile

# Copy source code
COPY --from=builder /app/out/full/ .

# Build payment-service using tsc
RUN pnpm --filter=payment-service run build

FROM base AS runner
WORKDIR /app

# Create a non-privileged user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs
USER expressjs

COPY --from=installer --chown=expressjs:nodejs /app .

WORKDIR /app/apps/payment-service
EXPOSE 8002

ENV NODE_ENV=production
CMD ["pnpm", "start"]
