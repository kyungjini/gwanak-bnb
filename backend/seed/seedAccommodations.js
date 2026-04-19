import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDatabase } from "../config/db.js";
import { Accommodation } from "../models/accommodation.model.js";
import { accommodationsSeed } from "./accommodations.seed.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });
dotenv.config({ path: path.join(__dirname, "../../.env") });

async function seedAccommodations() {
  await connectDatabase();

  await Accommodation.deleteMany({});
  const inserted = await Accommodation.insertMany(accommodationsSeed);

  console.log(`Seeded ${inserted.length} accommodations.`);
}

seedAccommodations()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Failed to seed accommodations:", error);
    process.exit(1);
  });