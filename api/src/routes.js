import express from 'express';
import { CompressionTypes } from 'kafkajs';

const routes = new express.Router();

routes.post('/certifications', async (req, res) => {
  const message = {
    user: { id: 1, name: 'Cristian Paniagua' },
    course: 'Kafka with NodeJS',
    grade: 10,
  };
  await req.producer.send({
    topic: 'issue-certificate',
    compression: CompressionTypes.GZIP,
    messages: [
      { value: JSON.stringify(message) },
      { value: JSON.stringify({ ...message, user: { ...message.user, name: 'Ramon'}}) },
    ],
  });
  res.json({ message: 'Hello world' });
});

export default routes;
