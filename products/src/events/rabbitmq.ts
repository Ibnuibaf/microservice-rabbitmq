import amqp from "amqplib";
const connectToRabbitMQ = async ()=> {
  try {
    const connection = await amqp.connect("amqp://rabbitmq-service");
    const channel = await connection.createChannel();
    console.log("Connected to rabbitMQ");
    return { connection, channel };
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
    throw error;
  }
}

export default connectToRabbitMQ;