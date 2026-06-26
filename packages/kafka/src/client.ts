import { Kafka } from "kafkajs";

export const createKafkaClient = (service: string) => {
  const brokersEnv = process.env.KAFKA_BROKERS;
  const brokers = brokersEnv 
    ? brokersEnv.split(",").map(b => b.trim()) 
    : ["localhost:19092", "localhost:19093", "localhost:19094"];

  return new Kafka({
    clientId: service,
    brokers,
  });
};


