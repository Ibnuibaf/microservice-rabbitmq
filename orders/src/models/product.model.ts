import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProducts extends Document {
  id: string;
  name: string;
  price: string;
  booked: boolean;
}

const productSchema: Schema<IProducts> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add an name"],
  },
  price: {
    type: String,
  },
  booked: {
    type: Boolean,
    default: false,
  },
});

const productModel: Model<IProducts> = mongoose.model<IProducts>(
  "Product",
  productSchema
);
export default productModel;