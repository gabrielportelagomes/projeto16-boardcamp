import { Router } from "express";
import { getRentals, postRental } from "../controllers/rentalsControllers.js";
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

export default rentalsRouter;
