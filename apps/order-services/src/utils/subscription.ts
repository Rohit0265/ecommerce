import { consumer } from "./kafka";
import { createOrder } from "./order";

// import { createStripeProduct, deleteStripeProduct } from "./stripeProduct";

export const runKafkaSubscriptions = async () => {
  // consumer.subscribe("product.created", async (message) => {
  //   const product = message.value;
  //   console.log("Received message: product.created", product);

  //   await createStripeProduct(product);
  // });
  // consumer.subscribe("product.deleted", async (message) => {
  //   const productId = message.value;
  //   console.log("Received message: product.deleted", productId);

  //   await deleteStripeProduct(productId);
  // });

  consumer.subscribe([
    {
      topicName: "payment.successful",
      topicHandler: async (message) => {
        console.log("Received message: payment.successful", message);

        const order = message.value;
        await createOrder(order);
      },
    },
  ]);
};