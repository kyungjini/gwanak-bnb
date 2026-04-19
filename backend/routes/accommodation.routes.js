import { Router } from "express";
import { searchAccommodationsController } from "../controllers/accommodation.controller.js";

export const accommodationRouter = Router();

accommodationRouter.post("/search", searchAccommodationsController);
