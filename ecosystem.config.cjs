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
      args: "tsx apps/auth-service/src/index.ts",
      autorestart: true,
    },
    {
      name: "product-service",
      script: "npx",
      args: "tsx apps/product-service/src/index.ts",
      autorestart: true,
    },
    {
      name: "order-services",
      script: "npx",
      args: "tsx apps/order-services/src/index.ts",
      autorestart: true,
    },
    {
      name: "payment-service",
      script: "node",
      args: "apps/payment-service/dist/index.js",
      autorestart: true,
    },
    {
      name: "email-service",
      script: "npx",
      args: "tsx apps/email-service/src/index.ts",
      autorestart: true,
    },
  ],
};
