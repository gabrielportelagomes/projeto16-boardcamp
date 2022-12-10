import joi from "joi";

export const gameSchema = joi.object({
  name: joi.string().required(),
  image: joi
    .string()
    .uri({ scheme: [/https?/] })
    .required(),
  stockTotal: joi.number().integer().min(1).required(),
  categoryId: joi.number().integer().required(),
  pricePerDay: joi.number().integer().min(1).required(),
});
