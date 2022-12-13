import { Router } from "express";
import {
  getRentals,
  postRental,
  postRentalReturn,
} from "../controllers/rentalsControllers.js";
import { rentalReturnValidation } from "../middlewares/rentalReturnValidation.js";
import { rentalSchemaValidation } from "../middlewares/rentalSchemaValidation.js";
import { rentalValidation } from "../middlewares/rentalValidation.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post(
  "/rentals",
  rentalSchemaValidation,
  rentalValidation,
  postRental
);
rentalsRouter.post(
  "/rentals/:id/return",
  rentalReturnValidation,
  postRentalReturn
);

export default rentalsRouter;
