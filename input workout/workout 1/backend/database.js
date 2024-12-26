import mongoose from "mongoose";

export const connectToDB = async () => {
  //   mongoose
  //     .connect(
  //       "mongodb://localhost:27017/"
  //     )
  //     .then(() => {
  //       console.log("database connected to:", mongoose.connection.host);
  //     })
  //     .catch((err) => {
  //       console.log(`database connection failed Error : ${err.message} `);
  //       process.exit(1);
  //     });

  //   ES6 syntax
  try {
    const connection = await mongoose.connect("mongodb://localhost:27017/test");
    console.log(
      `connected to = ${connection.connection.host}, connected db = ${connection.connection.name}`
    );
  } catch (error) {
    console.log(`database connection failed Error : ${error.message} `);
    process.exit(1);
  }
};
