import { Kafka, logLevel } from "kafkajs";

export const createKafkaClient = (service: string) => {
  const brokersEnv = process.env.KAFKA_BROKERS;
  const brokers = brokersEnv 
    ? brokersEnv.split(",").map(b => b.trim()) 
    : ["localhost:19092", "localhost:19093", "localhost:19094"];

  // Default to WARN log level to avoid log flooding on Railway
  const rawLogLevel = process.env.KAFKAJS_LOG_LEVEL 
    ? parseInt(process.env.KAFKAJS_LOG_LEVEL, 10) 
    : logLevel.WARN;

  return new Kafka({
    clientId: service,
    brokers,
    logLevel: rawLogLevel,
  });
};


