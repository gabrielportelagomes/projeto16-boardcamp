import { Router } from "express";
import { getGames, postGame } from "../controllers/gamesControllers.js";
import { gameSchemaValidation } from "../middlewares/gameSchemaValidation.js";
import { gameValidation } from "../middlewares/gameValidation.js";

const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", gameSchemaValidation, gameValidation, postGame);

export default gamesRouter;
