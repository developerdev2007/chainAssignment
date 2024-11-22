import mongoose from "mongoose";
import { ErrorSend } from "./errorHandle.js";
import { config } from "dotenv";
config({});
const URI = process.env.MONGO_URI || "mongodb://localhost:27017";

export const connectDB = async () => {
  await mongoose
    .connect("mongodb://localhost:27017")
    .then(() => {
      console.log("Application connected to the database");
    })
    .catch((err: any) => {
      throw new ErrorSend("Failed to connect with database", 500, false, true);
    });
};
