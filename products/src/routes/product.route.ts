import express  from "express";
import { addProduct, getproducts } from "../controllers/product.controller";

const adminRouter = express.Router();

adminRouter.post("/addproduct", addProduct);

adminRouter.get("/getproducts", getproducts);

export default adminRouter;