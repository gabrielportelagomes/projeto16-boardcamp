import dayjs from "dayjs";
import connection from "../database/db.js";

export async function getRentals(req, res) {
  const { customerId } = req.query;
  const { gameId } = req.query;

  try {
    if (customerId) {
      const { rows } = await connection.query(
        `SELECT rentals.*, rentals."rentDate"::text, rentals."returnDate"::text, customers.name AS customer, games.name AS game, categories.id AS "categoryId", categories.name As "categoryName" FROM rentals 
          JOIN customers ON customers.id = "customerId" 
          JOIN games ON games.id = "gameId" 
          JOIN categories ON categories.id = games."categoryId" WHERE "customerId"=$1
        ;`,
        [customerId]
      );
      const rentals = rows.map((rental) => {
        const {
          id,
          customerId,
          gameId,
          rentDate,
          daysRented,
          returnDate,
          originalPrice,
          delayFee,
          customer,
          game,
          categoryId,
          categoryName,
        } = rental;

        return {
          id,
          customerId,
          gameId,
          rentDate,
          daysRented,
          returnDate,
          originalPrice,
          delayFee,
          customer: {
            id: customerId,
            name: customer,
          },
          game: {
            id: gameId,
            name: game,
            categoryId,
            categoryName,
          },
        };
      });

      res.send(rentals);
    } else if (gameId) {
      const { rows } = await connection.query(
        `SELECT rentals.*, rentals."rentDate"::text, rentals."returnDate"::text, customers.name AS customer, games.name AS game, categories.id AS "categoryId", categories.name As "categoryName" FROM rentals 
          JOIN customers ON customers.id = "customerId" 
          JOIN games ON games.id = "gameId" 
          JOIN categories ON categories.id = games."categoryId" WHERE "gameId"=$1
        ;`,
        [gameId]
      );
      const rentals = rows.map((rental) => {
        const {
          id,
          customerId,
          gameId,
          rentDate,
          daysRented,
          returnDate,
          originalPrice,
          delayFee,
          customer,
          game,
          categoryId,
          categoryName,
        } = rental;

        return {
          id,
          customerId,
          gameId,
          rentDate,
          daysRented,
          returnDate,
          originalPrice,
          delayFee,
          customer: {
            id: customerId,
            name: customer,
          },
          game: {
            id: gameId,
            name: game,
            categoryId,
            categoryName,
          },
        };
      });

      res.send(rentals);
    } else {
      const { rows } = await connection.query(
        `SELECT rentals.*, rentals."rentDate"::text, rentals."returnDate"::text, customers.name AS customer, games.name AS game, categories.id AS "categoryId", categories.name As "categoryName" FROM rentals 
        JOIN customers ON customers.id = "customerId" 
        JOIN games ON games.id = "gameId" 
        JOIN categories ON categories.id = games."categoryId"
      ;`
      );
      const rentals = rows.map((rental) => {
        const {
          id,
          customerId,
          gameId,
          rentDate,
          daysRented,
          returnDate,
          originalPrice,
          delayFee,
          customer,
          game,
          categoryId,
          categoryName,
        } = rental;

        return {
          id,
          customerId,
          gameId,
          rentDate,
          daysRented,
          returnDate,
          originalPrice,
          delayFee,
          customer: {
            id: customerId,
            name: customer,
          },
          game: {
            id: gameId,
            name: game,
            categoryId,
            categoryName,
          },
        };
      });

      res.send(rentals);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function postRental(req, res) {
  const { customerId, gameId, daysRented } = res.locals.rental;
  const rentDate = dayjs().format("YYYY-MM-DD");

  try {
    const { rows } = await connection.query(
      `SELECT games."pricePerDay" FROM games WHERE id=$1`,
      [gameId]
    );

    const pricePerDay = rows[0].pricePerDay;

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

export async function postRentalReturn(req, res) {
  const { id } = req.params;
  const returnDate = dayjs().format("YYYY-MM-DD");
  let delayFee = 0;

  try {
    const { rows } = await connection.query(
      `SELECT * FROM rentals JOIN games ON games.id = "gameId" WHERE rentals.id=$1`,
      [id]
    );

    const rentDate = dayjs(rows[0].rentDate).format("YYYY-MM-DD");
    const daysRented = rows[0].daysRented;
    const pricePerDay = rows[0].pricePerDay;
    const maximumDate = dayjs(rentDate)
      .add(daysRented, "days")
      .format("YYYY-MM-DD");

    if (dayjs(returnDate).isAfter(maximumDate)) {
      const newReturnDate = new Date(returnDate);
      const newMaximunDate = new Date(maximumDate);
      const differenceOfDays =
        Math.abs(newReturnDate - newMaximunDate) /
        (1000 *
          60 *
          60 *
          24); /* milliseconds * seconds * minutes * hours / day */
      delayFee = differenceOfDays * pricePerDay;
    }

    await connection.query(
      `UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3`,
      [returnDate, delayFee, id]
    );

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function deleteRental(req, res) {
  const { id } = req.params;

  try {
    await connection.query(`DELETE FROM rentals WHERE id=$1`, [id]);

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
