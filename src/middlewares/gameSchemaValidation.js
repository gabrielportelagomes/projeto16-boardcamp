import { gameSchema } from "../schemas/gameSchema.js";

export async function gameSchemaValidation(req, res, next) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

  const { error } = gameSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const erros = error.details.map((detail) => detail.message);
    return res.status(400).send(erros);
  }

  const game = {
    name,
    image,
    stockTotal,
    categoryId,
    pricePerDay,
  };

  res.locals.game = game;

  next();
}
