import { Request, Response } from "express";
import productModel, { IProducts } from "../models/product.model";
import { sendMessage } from "../events/producer";

export const saveProducts = async (message: any) => {
  try {
    console.log(message);
    const product = await productModel.create({
      _id: message.productId,
      name: message.productName,
      price: message.price,
    });
    console.log("produt saved");
  } catch (error: any) {
    console.log(error);
  }
};

export const order = async (req: Request, res: Response) => {
  const { productId } = req.body;
  
  try {
    const order: IProducts | null = await productModel.findOne({
      _id: productId,
    });

    if (order && !order.booked) {
      // Update the 'booked' property to true
      order.booked = true;

      // Save the updated document
      await order.save();

      const message = {
        type: "ORDER-BOOKED",
        productId: order._id,
      };
      // rabbit mq
      sendMessage(message);

      return res.status(200).send({
        success: true,
        message: "Order placed successfully",
      });
    } else if (order && order.booked) {
      return res.status(200).send({
        success: false,
        message: "Already booked",
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      error,
    });
  }
};