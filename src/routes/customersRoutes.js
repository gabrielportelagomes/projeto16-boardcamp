import { Router } from "express";
import { postCustomer } from "../controllers/customersControllers.js";
import { customerSchemaValidation } from "../middlewares/customerSchemaValidation.js";
import { customerValidation } from "../middlewares/customerValidation.js";

const customersRouter = Router();

customersRouter.post(
  "/customers",
  customerSchemaValidation,
  customerValidation,
  postCustomer
);

export default customersRouter;
