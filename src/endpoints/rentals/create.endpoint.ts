import { app } from '../../server';
import { db } from '../../db';

app.post("/users/:userId/rentals", (req, res) => {
  const {
    userId,
    brand,
    size,
    material,
    color,
    description,
    biweeklyPrice,
    monthlyPrice,
  } = req.body;

  db.query(
    "INSERT INTO rental (user_id, brand, size, material, color, description, biweekly_price, monthly_price) VALUES (?,?,?,?,?,?,?,?)",
    [
      userId,
      brand,
      size,
      material,
      color,
      description,
      biweeklyPrice,
      monthlyPrice,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Rental Created, sending result back', result);
        res.send(result);
      }
    }
  );
});