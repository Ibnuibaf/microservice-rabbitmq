import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
  },
  password: {
    type: String,
    minlength: [6, "Password must be at least 6 characters long"],
  },
});


const userModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default userModel;