import { Kafka } from "kafkajs";

export const createKafkaClient = (service: string) => {
  return new Kafka({
    clientId: service,
      brokers: [
    "localhost:19092",
    "localhost:19093",
    "localhost:19094",
  ],
  });
};

