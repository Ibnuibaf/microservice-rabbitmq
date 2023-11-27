import express from "express";
import cors from "cors";
import connectDb from "./db";
import { startConsumer } from "./events/consumer";
import orderRouter from "./routes/order.route";

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/orders', orderRouter);

Promise.all([startConsumer(), connectDb()])
  .then(() => {
    console.log('Consumer and database connected successfully');
    
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((error) => {
    console.error('Error during initialization:', error);
  });