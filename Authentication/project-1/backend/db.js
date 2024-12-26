import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const mongooseInstance = await mongoose.connect(
      "mongodb://127.0.0.1:27017/workout"
    );
    console.log(`database connected ${mongooseInstance.connection.host}`);
    return mongooseInstance.connection.getClient();
  } catch (error) {
    console.log("database connection error", error);
  }
};
