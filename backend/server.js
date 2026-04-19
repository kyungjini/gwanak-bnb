import { createServer } from "http";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDatabase } from "./config/db.js";
import { createApp } from "./app.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config({ path: path.join(__dirname, "../.env") });

const PORT = process.env.PORT || 3000;

async function startServer() {
  await connectDatabase();

  const app = createApp();
  const server = createServer(app);

  server.listen(PORT, () => {
    console.log(`Accommodation API listening on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
