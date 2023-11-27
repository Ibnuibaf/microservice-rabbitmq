import { saveProducts } from "../controllers/order.controller";
import connectToRabbitMQ  from "./rabbitmq";

export const startConsumer = async () => {
  const { channel } = await connectToRabbitMQ();
  
  const queue = "PRODUCT";
  await channel.assertQueue(queue, { durable: true });
  console.log(`Waiting for messages in ${queue}`);
  
  channel.consume(queue, (msg) => {
    if (msg !== null) {
      const contentString = msg.content.toString();
      const message = JSON.parse(contentString);
      console.log(`Received message: ${message.productName}`);

      // Process the message as needed
      if (message.type === "PRODUCT-ADDED") {
        saveProducts(message);
      }

      channel.ack(msg); // Acknowledge the message when it's processed
    }
  });
};