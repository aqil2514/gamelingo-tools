import mongoose, { ConnectOptions } from "mongoose";

const connectMongoDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI ?? "");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectMongoDB;
