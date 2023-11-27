import express from "express";
import cors from "cors";
import productRouter from "./routes/product.route";
import connectDb from "./db";
import { startConsumer } from "./events/consumer";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/products", productRouter);

const PORT = 4000;
app.listen(PORT, () => {
  startConsumer();
  connectDb();
  console.log(`Server running in port ${PORT}`);
});