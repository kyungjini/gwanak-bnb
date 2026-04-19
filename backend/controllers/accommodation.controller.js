import { getAccommodationSearchResults } from "../services/accommodation.service.js";

export async function searchAccommodationsController(req, res, next) {
  try {
    const result = await getAccommodationSearchResults(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
