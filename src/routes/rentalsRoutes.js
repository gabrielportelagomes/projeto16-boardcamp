import { Router } from "express";
import {
  deleteRental,
  getRentals,
  postRental,
  postRentalReturn,
} from "../controllers/rentalsControllers.js";
import { rentalDeleteValidation } from "../middlewares/RentalDeleteValidation.js";
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
rentalsRouter.delete(
  "/rentals/:id",
  rentalDeleteValidation,
  deleteRental
);

export default rentalsRouter;
