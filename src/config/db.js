import mongoose from "mongoose";
import { config } from "./index.js";
import logger from "./logger.js";

export const connectDB = async () => {
    await mongoose.connect(config.mongoDbUri);
    logger.info("MongoDB conectado");
}