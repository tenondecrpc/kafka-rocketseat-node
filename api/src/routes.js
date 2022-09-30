import express from 'express';

const routes = new express.Router();

routes.post('/certifications', async (req, res) => {
  const message = {
    user: { id: 1, name: 'Cristian Paniagua' },
    course: 'Kafka with NodeJS',
    grade: 5,
  };
  await req.producer.send({
    topic: 'certification-response',
    messages: [
      {
        value: JSON.stringify(message),
      },
    ],
  });
  res.json({ message: 'Hello world' });
});

export default routes;
