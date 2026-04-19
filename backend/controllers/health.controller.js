import mongoose from "mongoose";

export function healthCheckController(req, res) {
  res.json({
    ok: true,
    message: "Backend is reachable",
    dbState: mongoose.connection.readyState,
    timestamp: new Date().toISOString(),
  });
}
