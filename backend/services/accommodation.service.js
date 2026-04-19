import { searchAccommodations } from "../repositories/accommodation.repository.js";

function normalizeSearchPayload(payload = {}) {
  const destination = String(payload.destination || "").trim();
  const guests = Number(payload.guests);
  const checkIn = payload.checkIn ? String(payload.checkIn).trim() : "";
  const checkOut = payload.checkOut ? String(payload.checkOut).trim() : "";

  return { destination, guests, checkIn, checkOut };
}

function validateSearchPayload(payload) {
  const errors = [];

  if (!payload.destination) {
    errors.push("destination is required");
  }

  if (!Number.isInteger(payload.guests) || payload.guests < 1) {
    errors.push("guests must be a positive integer");
  }

  if ((payload.checkIn && !payload.checkOut) || (!payload.checkIn && payload.checkOut)) {
    errors.push("checkIn and checkOut must be provided together");
  }

  return errors;
}

export async function getAccommodationSearchResults(payload) {
  const normalizedPayload = normalizeSearchPayload(payload);
  const errors = validateSearchPayload(normalizedPayload);

  if (errors.length > 0) {
    const error = new Error(errors.join("; "));
    error.statusCode = 400;
    error.details = errors;
    throw error;
  }

  const results = await searchAccommodations(normalizedPayload);

  return {
    query: normalizedPayload,
    count: results.length,
    results,
  };
}
