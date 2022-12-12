import dayjs from "dayjs";
import connection from "../database/db.js";

export async function postRental(req, res) {
  const { customerId, gameId, daysRented } = res.locals.rental;
  const rentDate = dayjs().format("YYYY-DD-MM");

  try {
    const { rows } = await connection.query(
      `SELECT games."pricePerDay" FROM games WHERE id=$1`,
      [gameId]
    );

    const pricePerDay = rows[0].pricePerDay;

    console.log(pricePerDay);

    await connection.query(
      `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7);`,
      [
        customerId,
        gameId,
        rentDate,
        daysRented,
        null,
        daysRented * pricePerDay,
        null,
      ]
    );

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
