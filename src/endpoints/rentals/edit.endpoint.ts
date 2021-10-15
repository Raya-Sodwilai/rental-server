import { app } from '../../server';
import { db, format } from '../../db';

app.put("/users/:userId/rentals/:rentalId", (req, res) => {
  const { userId, rentalId } = req.params; 
  const {
    brand,
    size,
    material,
    color,
    description,
    biweekly_price,
    monthly_price
  } = req.body;
  
  let query = `
    UPDATE rental 
    SET 
      brand = ?, 
      size = ?, 
      material = ?, 
      color = ?, 
      description = ?, 
      biweekly_price = ?, 
      monthly_price = ? 
    WHERE id = ? 
    AND user_id = ?`;

  query = format(query, [brand, size, material, color, description, biweekly_price, monthly_price, rentalId, userId]);
  
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Rental Updated, sending result back', result);
      res.send(result);
    }
  });
});