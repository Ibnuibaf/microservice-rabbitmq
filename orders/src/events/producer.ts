import connectToRabbitMQ from "./rabbitmq";

export const sendMessage = async (message: any) => {
  const { channel } = await connectToRabbitMQ();

  const queue = "ORDER";
  await channel.assertQueue(queue, { durable: true });
  await channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });

  console.log(`Message sent: ${message}`);
};