import mongoose from "mongoose";

const accommodationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true, index: true },
    pricePerNight: { type: Number, required: true, min: 0 },
    maxGuests: { type: Number, required: true, min: 1, index: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    availableDates: {
      type: [String],
      default: [],
      index: true,
    },
  },
  {
    timestamps: true,
    collection: "accommodations",
  }
);

export const Accommodation = mongoose.model("Accommodation", accommodationSchema);
