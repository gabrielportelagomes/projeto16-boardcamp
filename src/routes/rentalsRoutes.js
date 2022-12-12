import { Router } from "express";
import { postRental } from "../controllers/rentalsControllers.js";
import { rentalSchemaValidation } from "../middlewares/rentalSchemaValidation.js";
import { rentalValidation } from "../middlewares/rentalValidation.js";

const rentalsRouter = Router();

rentalsRouter.post(
  "/rentals",
  rentalSchemaValidation,
  rentalValidation,
  postRental
);

export default rentalsRouter;
