import { connectDatabase } from "../config/db.js";
import { Accommodation } from "../models/accommodation.model.js";
import { accommodationsSeed } from "./accommodations.seed.js";

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