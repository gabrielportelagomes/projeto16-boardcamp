import { Router } from "express";
import { postGame } from "../controllers/gamesControllers.js";
import { gameSchemaValidation } from "../middlewares/gameSchemaValidation.js";
import { gameValidation } from "../middlewares/gameValidation.js";

const gamesRouter = Router();

gamesRouter.post("/games", gameSchemaValidation, gameValidation, postGame);

export default gamesRouter;
