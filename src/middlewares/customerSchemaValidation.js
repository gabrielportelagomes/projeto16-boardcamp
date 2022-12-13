import { customerSchema } from "../schemas/customerSchema.js";

export async function customerSchemaValidation(req, res, next) {
  const { name, phone, cpf, birthday } = req.body;
  console.log(req.body);

  const { error } = customerSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const erros = error.details.map((detail) => detail.message);
    console.log(erros)
    return res.status(400).send(erros);
  }

  const customer = {
    name,
    phone,
    cpf,
    birthday,
  };

  res.locals.customer = customer;

  next();
}
