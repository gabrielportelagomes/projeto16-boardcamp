import connection from "../database/db.js";

export async function rentalReturnValidation(req, res, next) {
  const { id } = req.params;

  try {
    const rentalExists = await connection.query(
      `SELECT * FROM rentals WHERE id=$1;`,
      [id]
    );

    if (rentalExists.rows.length === 0) {
      return res.sendStatus(404);
    }

    if (rentalExists.rows[0].returnDate) {
      return res.sendStatus(400);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }

  next();
}
