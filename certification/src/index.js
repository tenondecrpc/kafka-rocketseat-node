import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  brokers: ['localhost:9092'],
  clientId: 'certificate-service',
});

const topic = 'issue-certificate';
const consumer = kafka.consumer({ groupId: 'certificate-group-receiver' });

const producer = kafka.producer();

let counter = 0;

async function run() {
  await producer.connect();
  await consumer.connect();
  await consumer.subscribe({ topic });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      counter++;
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
      console.log(`- ${prefix} ${message.key}#${message.value}`);

      const payload = JSON.parse(message.value);


      setTimeout(() => {
        producer.send({
          topic: 'certification-response',
          messages: [
            { value: `Certification of user ${payload.user.name} and course ${payload.course} generated!` }
          ]
        })
      }, 3000);
    },
  });
};

run().catch(console.error);