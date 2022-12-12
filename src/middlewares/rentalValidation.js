import connection from "../database/db.js";

export async function rentalValidation(req, res, next) {
  const { customerId, gameId } = res.locals.rental;

  try {
    const customerExists = await connection.query(
      `SELECT * FROM customers WHERE id=$1;`,
      [customerId]
    );

    if (customerExists.rows.length === 0) {
      return res.status(400).send({ message: "Usuário não existe!" });
    }

    const gameExists = await connection.query(
      `SELECT * FROM games WHERE id=$1;`,
      [gameId]
    );

    if (gameExists.rows.length === 0) {
      return res.status(400).send({ message: "Jogo não existe!" });
    }

    const { rowCount } = await connection.query(
      `SELECT * FROM rentals WHERE id=$1`,
      [gameId]
    );

    if (rowCount > gameExists.rows[0].stockTotal) {
      return res.status(400).send({ message: "Jogo fora de estoque!" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }

  next();
}
