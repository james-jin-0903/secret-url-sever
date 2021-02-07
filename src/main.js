import express from "express";
import cors from "cors";
import dotEnv from "dotenv";
import HttpStatus from "http-status-codes";
import winston from "winston";
import { connectMongoose } from "./mongoose.js";
import { apiRouter } from "./router/index.js";

winston.add(new winston.transports.Console());

// config environment
dotEnv.config();

async function bootstrap() {
  const app = express();

  // connect database
  await connectMongoose();

  // use json and cors middlewares
  app.use(express.json(), cors());

  // add routers
  app.use('/api', apiRouter);

  // not found fallback route
  app.use("*", (req, res) => {
    res.status(HttpStatus.NOT_FOUND).send("404 Not Found");
  });

  app.listen(process.env.APP_PORT, () => {
    winston.info(`Server started on port ${process.env.APP_PORT}`);
  });
}

bootstrap()
  .then()
  .catch((e) => {
    winston.error(e.message);
    process.exit(1);
  });
