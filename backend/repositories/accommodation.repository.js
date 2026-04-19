import { Accommodation } from "../models/accommodation.model.js";

function buildAvailabilityFilter(checkIn, checkOut) {
  const dates = [checkIn, checkOut].filter(Boolean);

  if (dates.length === 0) {
    return {};
  }

  return {
    availableDates: {
      $all: dates,
    },
  };
}

export async function searchAccommodations({ destination, guests, checkIn, checkOut }) {
  const query = {
    location: { $regex: destination, $options: "i" },
    maxGuests: { $gte: guests },
    ...buildAvailabilityFilter(checkIn, checkOut),
  };

  return Accommodation.find(query).sort({ rating: -1, pricePerNight: 1 }).lean();
}
