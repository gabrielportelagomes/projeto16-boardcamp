import { rentalSchema } from "../schemas/rentalSchema.js";

export async function rentalSchemaValidation(req, res, next) {
  const { customerId, gameId, daysRented } = req.body;

  const { error } = rentalSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const erros = error.details.map((detail) => detail.message);
    return res.status(400).send(erros);
  }

  const rental = {
    customerId,
    gameId,
    daysRented,
  };

  res.locals.rental = rental;

  next();
}
