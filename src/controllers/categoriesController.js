import connection from "../database/db.js";

export async function getCategories(req, res) {
  try {
    const { rows } = await connection.query("SELECT * FROM categories;");

    res.send(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
