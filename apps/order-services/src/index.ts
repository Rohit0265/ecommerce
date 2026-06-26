import Fasify from "fastify"
// Trigger restart after Kafka is fully initialized

import { clerkPlugin, getAuth } from '@clerk/fastify'
import { shoulbeUser } from "./middleware/authMiddleware.js";
import { connectOrderDB } from "@repo/order-db"
import { orderRoute } from "./routes/route.js";
import { consumer, producer } from "./utils/kafka.js";
import { runKafkaSubscriptions } from "./utils/subscription.js";

const fastify = Fasify();

fastify.register(clerkPlugin)

fastify.get("/",(request,reply)=>{
    return reply.send("Order Service Point Hai Ye")
})


fastify.get("/test", {preHandler:shoulbeUser},async (request, reply) => {
  const { userId } = getAuth(request);


  return reply.send({ success: true, message: "Order Service Is Authenticated !",userId:request.userId });
});

fastify.register(orderRoute);

const start = async () => {
  try {
    
    Promise.all([await connectOrderDB(),await producer.connect(), await consumer.connect()
    ]);
    await runKafkaSubscriptions();
    await fastify.listen({ port: 8001 })

    console.log("OOrder- Services on 8001")
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()