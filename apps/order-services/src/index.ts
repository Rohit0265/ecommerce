import Fasify from "fastify"
// Trigger restart after Kafka is fully initialized

import cors from '@fastify/cors'
import { clerkPlugin, getAuth } from '@clerk/fastify'
import { shoulbeUser } from "./middleware/authMiddleware.js";
import { connectOrderDB } from "@repo/order-db"
import { orderRoute } from "./routes/route.js";
import { consumer, producer } from "./utils/kafka.js";
import { runKafkaSubscriptions } from "./utils/subscription.js";

const fastify = Fasify();

const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",").map(o => o.trim())
  : [];

fastify.register(cors, {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (allowedOrigins.length === 0 || allowedOrigins.includes(origin) || origin.endsWith(".vercel.app") || origin.includes("localhost") || origin.includes("127.0.0.1")) {
      return cb(null, true);
    }
    return cb(null, false);
  },
  credentials: true,
})

fastify.register(clerkPlugin)

fastify.get("/", (request, reply) => {
  return reply.send("Order Service Point Hai Ye")
})


fastify.get("/test", { preHandler: shoulbeUser }, async (request, reply) => {
  const { userId } = getAuth(request);


  return reply.send({ success: true, message: "Order Service Is Authenticated !", userId: request.userId });
});

fastify.register(orderRoute);

const start = async () => {
  try {
    await connectOrderDB();

    producer.connect().catch((error) => {
      console.error("Failed to connect order-service Kafka producer:", error);
    });

    consumer.connect().then(async () => {
      await runKafkaSubscriptions();
    }).catch((error) => {
      console.error("Failed to connect order-service Kafka consumer:", error);
    });

    await fastify.listen({ port: 8001 })

    console.log("OOrder- Services on 8001")
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()