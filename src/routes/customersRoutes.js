import { Router } from "express";
import {
  getCustomer,
  getCustomers,
  postCustomer,
} from "../controllers/customersControllers.js";
import { customerSchemaValidation } from "../middlewares/customerSchemaValidation.js";
import { customerValidation } from "../middlewares/customerValidation.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomer);
customersRouter.post(
  "/customers",
  customerSchemaValidation,
  customerValidation,
  postCustomer
);

export default customersRouter;
