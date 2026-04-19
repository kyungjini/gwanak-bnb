import mongoose from "mongoose";

function getMongoUri() {
  return process.env.MONGODB_URI || process.env.URI || "";
}

export async function connectDatabase() {
  const mongoUri = getMongoUri();

  if (!mongoUri) {
    throw new Error("Missing MONGODB_URI or URI in environment variables.");
  }

  mongoose.set("strictQuery", true);
  await mongoose.connect(mongoUri);

  console.log("MongoDB connected");
}
