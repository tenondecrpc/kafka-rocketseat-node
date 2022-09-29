import express from 'express';
import { Kafka } from 'kafkajs';
import routes from './routes';

const app = express();

const kafka = new Kafka({
  clientId: 'main-service',
  brokers: ['kafka:9092']
});

app.use(routes);

async function run() {
  // await producer.connect();

  app.listen(3333);
};

const producer = kafka.producer();

run().catch(console.error);