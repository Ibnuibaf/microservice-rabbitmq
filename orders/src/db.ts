import mongoose from "mongoose";
const dbUrl: string = "mongodb+srv://ibrahim2005ch:1m9ugV8E0KMYLOgY@testing.2askt1r.mongodb.net/torder" || ""

const connectDb = async () => {
  try {
    await mongoose.connect(dbUrl).then((data: any) => {
      console.log(`Database connected with${data.connection.host}`);
    });
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDb, 5000);
  }
};

export default connectDb;