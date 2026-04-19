import express from "express";
import cors from "cors";
import { apiRouter } from "./routes/index.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || true,
      credentials: true,
    })
  );
  app.use(express.json());

  app.use("/api", apiRouter);

  app.get("/", (req, res) => {
    res.json({
      message: "Accommodation Search API is running",
    });
  });

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
