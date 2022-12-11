import connection from "../database/db.js";

export async function getCategories(req, res) {
  try {
    const { rows } = await connection.query("SELECT * FROM categories;");

    res.send(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function postCategory(req, res) {
  const name = res.locals.name;

  try {
    const categoryExists = await connection.query(
      `SELECT * FROM categories WHERE name=$1;`,
      [name]
    );

    if (categoryExists.rows.length > 0) {
      return res.status(401).send({ message: "Categoria já cadastrada!" });
    }

    await connection.query(`INSERT INTO categories (name) VALUES ($1);`, [
      name,
    ]);

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
