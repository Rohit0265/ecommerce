module.exports = {
  apps: [
    {
      name: "caddy",
      script: "caddy",
      args: "run --config Caddyfile --adapter caddyfile",
      autorestart: true,
    },
    {
      name: "auth-service",
      script: "npx",
      args: "tsx src/index.ts",
      cwd: "apps/auth-service",
      autorestart: true,
    },
    {
      name: "product-service",
      script: "npx",
      args: "tsx src/index.ts",
      cwd: "apps/product-service",
      autorestart: true,
    },
    {
      name: "order-services",
      script: "npx",
      args: "tsx src/index.ts",
      cwd: "apps/order-services",
      autorestart: true,
    },
    {
      name: "payment-service",
      script: "node",
      args: "dist/index.js",
      cwd: "apps/payment-service",
      autorestart: true,
    },
    {
      name: "email-service",
      script: "npx",
      args: "tsx src/index.ts",
      cwd: "apps/email-service",
      autorestart: true,
    },
  ],
};
