import Joi from "joi";
import ExpressPromiseRouter from "express-promise-router";
import { secretRoutes } from "./secretRoutes.js";

// create api router and add routes
const apiRouter = ExpressPromiseRouter();
secretRoutes(apiRouter);

// error handler middleware
apiRouter.use((err, req, res, next) => {
  if (err instanceof Joi.ValidationError) {
    res.status(400).send(err.details);
    return;
  }

  next();
});

export { apiRouter };
