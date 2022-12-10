import { Router } from "express";
import categoriesRouter from "./categoriesRoutes.js";
import gamesRouter from "./gamesRoutes.js";

const router = Router();

router.use(categoriesRouter);
router.use(gamesRouter);

export default router;
