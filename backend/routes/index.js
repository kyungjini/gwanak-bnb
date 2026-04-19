import { Router } from "express";
import { accommodationRouter } from "./accommodation.routes.js";
import { healthRouter } from "./health.routes.js";

export const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use(accommodationRouter);
