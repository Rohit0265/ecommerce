# Build this Dockerfile from the monorepo root:
# docker build -t client-app -f apps/client/Dockerfile .

FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g --force pnpm@9.0.0 turbo
COPY . .
RUN turbo prune client --docker

FROM base AS installer
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install dependencies
COPY --from=builder /app/out/json/ .
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY --from=builder /app/out/full/ .

# Bake in Next.js build-time environment variables
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_CLERK_SIGN_IN_URL
ARG NEXT_PUBLIC_CLERK_SIGN_UP_URL
ARG NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL
ARG NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL
ARG NEXT_PUBLIC_PRODUCT_URL
ARG NEXT_PUBLIC_ORDER_URL
ARG NEXT_PUBLIC_PAYMENT_URL

ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_CLERK_SIGN_IN_URL=$NEXT_PUBLIC_CLERK_SIGN_IN_URL
ENV NEXT_PUBLIC_CLERK_SIGN_UP_URL=$NEXT_PUBLIC_CLERK_SIGN_UP_URL
ENV NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=$NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL
ENV NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=$NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL
ENV NEXT_PUBLIC_PRODUCT_URL=$NEXT_PUBLIC_PRODUCT_URL
ENV NEXT_PUBLIC_ORDER_URL=$NEXT_PUBLIC_ORDER_URL
ENV NEXT_PUBLIC_PAYMENT_URL=$NEXT_PUBLIC_PAYMENT_URL

RUN pnpm --filter=client run build

FROM base AS runner
WORKDIR /app

ENV PORT=3002
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=production

# Copy built app files
COPY --from=installer /app/apps/client/public ./apps/client/public
COPY --from=installer /app/apps/client/.next/standalone ./
COPY --from=installer /app/apps/client/.next/static ./apps/client/.next/static

EXPOSE 3002

# Run the standalone server
CMD ["node", "apps/client/server.js"]
