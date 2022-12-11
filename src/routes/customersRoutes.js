import { Router } from "express";
import {
  getCustomer,
  getCustomers,
  postCustomer,
  putCustomer,
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
customersRouter.put(
  "/customers/:id",
  customerSchemaValidation,
  customerValidation,
  putCustomer
);

export default customersRouter;
