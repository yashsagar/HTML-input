import mongoose from "mongoose";
import ENV_VAR from "../utils/var.js";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(ENV_VAR.MONGO_URL);
    console.log(`database connected to ${connection.connection.host} `);
    return connection.connection.getClient();
  } catch (error) {
    console.log("Error in connection database");
  }
};

export default connectDB;
