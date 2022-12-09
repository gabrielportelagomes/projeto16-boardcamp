import { Router } from "express";
import { getCategories, postCategory } from "../controllers/categoriesController.js";
import { categorySchemaValidation } from "../middlewares/categorySchemaValidation.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", getCategories);
categoriesRouter.post("/categories", categorySchemaValidation, postCategory);

export default categoriesRouter;
