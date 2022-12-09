import { Router } from "express";
import categoriesRouter from "./categoriesRoutes.js";

const router = Router();

router.use(categoriesRouter);

export default router;
