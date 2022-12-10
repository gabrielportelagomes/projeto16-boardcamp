import connection from "../database/db.js";

export async function gameValidation(req, res, next) {
  const { categoryId, name } = res.locals.game;

  try {
    const categoryExists = await connection.query(
      `SELECT * FROM categories WHERE id=$1;`,
      [categoryId]
    );

    if (categoryExists.rows.length === 0) {
      return res.status(400).send({ message: "Categoria não existe!" });
    }

    const gameNameExists = await connection.query(
      `SELECT * FROM games WHERE name=$1;`,
      [name]
    );

    if (gameNameExists.rows.length > 0) {
      return res.status(409).send({ message: "Nome de jogo já existe!" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }

  next();
}
