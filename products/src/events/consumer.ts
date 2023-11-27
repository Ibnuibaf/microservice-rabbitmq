import { makeBooked } from "../controllers/product.controller";
import connectToRabbitMQ  from "./rabbitmq";

export const startConsumer = async () => {
  const { channel } = await connectToRabbitMQ();
  
  const queue = "ORDER";
  await channel.assertQueue(queue, { durable: true });
  console.log(`Waiting for messages in ${queue}`);
  
  channel.consume(queue, (msg) => {
    if (msg !== null) {
      const contentString = msg.content.toString();
      const message = JSON.parse(contentString);
      console.log(`Received message: ${message.productId}`);

      // Process the message as needed
      if (message.type === "ORDER-BOOKED") {
        makeBooked(message);
      }

      channel.ack(msg); // Acknowledge the message when it's processed
    }
  });
};