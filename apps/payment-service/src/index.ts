import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { shouldBeUser } from './middleware/authMiddleware.js'

import sessionRoutes from './route/session.routes.js'
import {cors} from "hono/cors"
import webhookRoute from './route/webhook.stripe.js'
import { consumer, producer } from './utils/kafka.js'
import { runKafkaSubscriptions } from './utils/subscription.js'

const app = new Hono()

app.use("*", async (c, next) => {
  console.log(`[PAYMENT] Request: ${c.req.method} ${c.req.url} - Path: ${c.req.path}`);
  await next();
  console.log(`[PAYMENT] Response status: ${c.res.status}`);
});


const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",").map(o => o.trim())
  : [];

app.use("*", cors({
  origin: (origin) => {
    if (!origin) return "*";
    if (allowedOrigins.length === 0 || allowedOrigins.includes(origin) || origin.endsWith(".vercel.app") || origin.includes("localhost")) {
      return origin;
    }
    return allowedOrigins[0] || "*";
  },
  credentials: true,
}))
app.use('*', clerkMiddleware())
app.route("/sessions",sessionRoutes);
app.route("/webhooks",webhookRoute);

app.get('/', (c) => {
  return c.text('Payment Endpoint Hai Ye okie.')
})


// app.post("/create-stripe-product" ,async(c)=>{
//   const res = await stripe.products.create({
//     id:"123",
//     name:"Test Product",
//     default_price_data:{
//       currency:"usd",
//       unit_amount:10*100,
//     }
//   })
//   return c.json(res);
// })

// app.get("/stripe-product-price" ,async(c)=>{
//   const res = await stripe.prices.list({
//     product:"123",
//   })
//   return c.json(res);
// })


const start = async () => {
  try {
    producer.connect().catch((error) => {
      console.error("Failed to connect payment-service Kafka producer:", error);
    });

    consumer.connect().then(async () => {
      await runKafkaSubscriptions();
    }).catch((error) => {
      console.error("Failed to connect payment-service Kafka consumer:", error);
    });

    serve({
      fetch: app.fetch,
      port: 8002
    }, (info) => {
      console.log(`Payment hai  bhai http://localhost:${info.port}`)
    });
  } catch (error) {
    console.log(error)
    process.exit(1);
  }
}

start()