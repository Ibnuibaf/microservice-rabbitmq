import { Request, Response } from "express";
import productModel, { IProducts } from "../models/product.model";
import { sendMessage } from "../events/publisher";



export const makeBooked = async (message: any) => {
  const productId = message.productId;
  try {
    const order: IProducts | null = await productModel.findOne({
      _id: productId,
    });
    
    if (order && !order.booked) {
      // Update the 'booked' property to true
      order.booked = true;

      // Save the updated document
      await order.save();
    }
  } catch (error) {
    console.log(error);
  }
};

interface IProduct {
  type?: string;
  name: string;
  price: number;
}

export const addProduct = async (req: Request, res: Response) => {
  const { name, price } = req.body as IProduct;

  if (!name || !price) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid product data" });
  }

  try {
    const product = await productModel.create({
      name,
      price,
    });

    const message = {
      type: "PRODUCT-ADDED",
      productId: product._id,
      productName: product.name,
      price: product.price,
    };
    sendMessage(message);
    res.status(201).send({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getproducts = async (req: Request, res: Response) => {
  try {
    const products = await productModel.find();

    res.status(200).send({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};