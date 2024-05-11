import mongoose from "mongoose";
import { _config } from "./config";
export const connectDB = async (): Promise<void> => {
  try {
    mongoose.connection.on("connected", () => {
      console.log(`
                  *************************************************
                          Database connected successfully!!
                  *************************************************
    `);
    });
    await mongoose.connect(_config.MONGO_URI);
  } catch (error: any) {
    console.log(`Error While connecting to the database::${error.message}`);
    process.exit(1);
  }
};
