import connection from "../database/db.js";

export async function customerValidation(req, res, next) {
  const { cpf } = res.locals.customer;

  try {
    const cpfExists = await connection.query(
      `SELECT * FROM customers WHERE cpf=$1;`,
      [cpf]
    );

    if (cpfExists.rows.length > 0) {
      return res.status(409).send({ message: "CPF já cadastrado!" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }

  next();
}
