import connection from "../database/db.js";

export async function customerUpdateValidation(req, res, next) {
  const { id } = req.params;
  const { cpf } = res.locals.customer;

  try {
    const { rows } = await connection.query(
      `SELECT * FROM customers WHERE cpf=$1;`,
      [cpf]
    );

    if (Number(cpf) === rows[0].cpf && id !== rows[0].id) {
      return res.status(409).send({ message: "CPF já cadastrado!" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }

  next();
}
