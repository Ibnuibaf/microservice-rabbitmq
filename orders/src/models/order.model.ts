import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProducts extends Document {
  productId: string;
  userId : string;
  
}

const productSchema: Schema<IProducts> = new mongoose.Schema({});

const productModel: Model<IProducts> = mongoose.model<IProducts>(
  "Product",
  productSchema
);
export default productModel;