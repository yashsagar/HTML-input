import mongoose from "mongoose";

export const test = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/workout");
    console.log(`MongoDB connected: ${conn.connection.host}`);
    return conn.connection.getClient();
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};
