import sendMail from "./utils/mailer";
// Trigger restart after Kafka is fully initialized
import { createConsumer, createKafkaClient } from "@repo/kafka";

const kafka = createKafkaClient("email-service");
const consumer = createConsumer(kafka, "email-service");

const start = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe([
      {
        topicName: "user.created",
        topicHandler: async (message) => {
          const { email, username } = message.value;

          if (email) {
            await sendMail({
              email,
              subject: "Welcome to E-commerce App",
              text: `Welcome ${username}. You account has been created!`,
            });
          }
        },
      },
      {
        topicName: "order.created",
        topicHandler: async (message) => {
          console.log("Email service received order.created event:", message);
          const { email, amount, status } = message.value;

          if (email) {
            console.log(`Sending email to ${email}...`);
            await sendMail({
              email,
              subject: "Order has been created",
              text: `Hello! Your order has been Placed.
              Order Summary:
             unt: ${amount/100}, Status: ${status}
              Thank you for shopping with us! `,
            });
            console.log(`Email successfully sent to ${email}!`);
          } else {
            console.log("No email field found in message payload!");
          }
        },
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};

start();