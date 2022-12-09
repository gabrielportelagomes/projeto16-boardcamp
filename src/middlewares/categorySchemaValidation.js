import { categorySchema } from "../schemas/categorySchema.js";

export async function categorySchemaValidation(req, res, next) {
  const { name } = req.body;

  try {
    const { error } = categorySchema.validate({ name }, { abortEarly: false });

    if (error) {
      const erros = error.details.map((detail) => detail.message);
      return res.status(400).send(erros);
    }

    res.locals.name = name;
  } catch (err) {
    res.status(500).send(err.message);
  }

  next();
}
