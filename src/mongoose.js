import mongoose from "mongoose";
import winston from "winston";

export async function connectMongoose() {
  const credentials = process.env.MONGODB_USERNAME
    ? process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_password + "@"
    : "";

  const host = process.env.MONGODB_HOST;
  const port = process.env.MONGODB_PORT;
  const database = process.env.MONGODB_DATABASE;
  const uri = `mongodb://${credentials}${host}:${port}/${database}`;

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  winston.info("MongoDB connected");
}
