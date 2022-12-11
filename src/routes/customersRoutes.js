import { Router } from "express";
import {
  getCustomers,
  postCustomer,
} from "../controllers/customersControllers.js";
import { customerSchemaValidation } from "../middlewares/customerSchemaValidation.js";
import { customerValidation } from "../middlewares/customerValidation.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.post(
  "/customers",
  customerSchemaValidation,
  customerValidation,
  postCustomer
);

export default customersRouter;
