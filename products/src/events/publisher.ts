import connectToRabbitMQ from "./rabbitmq";

export async function sendMessage(message: any) {
    try {
      const { channel } = await connectToRabbitMQ();
      const queueName = "PRODUCT";
      await channel.assertQueue("PRODUCT", { durable: true });
      channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)),  { persistent: true });
      console.log(`Sent message: "${message}" to queue: ${queueName}`);  
      channel.close();
    } catch (error) {
      console.error("Error sending message to RabbitMQ:", error);
    }
  }
  