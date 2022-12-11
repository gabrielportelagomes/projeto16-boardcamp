import connection from "../database/db.js";

export async function getCustomers(req, res) {
  const { cpf } = req.query;

  try {
    if (!cpf) {
      const { rows } = await connection.query(`SELECT * FROM customers;`);

      res.send(rows);
    } else {
      const { rows } = await connection.query(
        `SELECT * FROM customers WHERE cpf ILIKE $1 || '%';`,
        [cpf]
      );
      res.send(rows);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function postCustomer(req, res) {
  const { name, phone, cpf, birthday } = res.locals.customer;

  try {
    await connection.query(
      `INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`,
      [name, phone, cpf, birthday]
    );

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
