import connection from "../database/db.js";

export async function getCustomers(req, res) {
  const { cpf } = req.query;

  try {
    if (!cpf) {
      const { rows } = await connection.query(`SELECT *, birthday::text FROM customers;`);

      res.send(rows);
    } else {
      const { rows } = await connection.query(
        `SELECT *, birthday::text FROM customers WHERE cpf ILIKE $1 || '%';`,
        [cpf]
      );
      res.send(rows);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getCustomer(req, res) {
  const { id } = req.params;

  try {
    const { rows } = await connection.query(
      `SELECT *, birthday::text FROM customers WHERE id=$1;`,
      [id]
    );

    if (rows.length === 0) {
      return res.sendStatus(404);
    }

    res.send(rows);
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

export async function putCustomer(req, res) {
  const { name, phone, cpf, birthday } = res.locals.customer;
  const { id } = req.params;

  try {
    await connection.query(
      `UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5;`,
      [name, phone, cpf, birthday, id]
    );

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
