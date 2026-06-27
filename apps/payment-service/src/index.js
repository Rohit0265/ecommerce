import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { clerkMiddleware } from '@hono/clerk-auth';
import sessionRoutes from './route/session.routes.js';
import { cors } from "hono/cors";
import webhookRoute from './route/webhook.stripe.js';
import { consumer, producer } from './utils/kafka.js';
import { runKafkaSubscriptions } from './utils/subscription.js';
const app = new Hono();
const allowedOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(",").map(o => o.trim())
    : ["http://localhost:3002"];
app.use("*", cors({ origin: allowedOrigins }));
app.use('*', clerkMiddleware());
app.route("/sessions", sessionRoutes);
app.route("/webhooks", webhookRoute);
app.get('/', (c) => {
    return c.text('Payment Endpoint Hai Ye okie');
});
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
        Promise.all([await producer.connect(), await consumer.connect()]);
        await runKafkaSubscriptions();
        serve({
            fetch: app.fetch,
            port: 8002
        }, (info) => {
            console.log(`Payment hai  bhai http://localhost:${info.port}`);
        });
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
start();
