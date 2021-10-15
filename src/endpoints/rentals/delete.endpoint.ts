import { app } from '../../server';
import { db, format } from '../../db';

app.delete("/users/:userId/rentals/:rentalId", (req, res) => {
  const { userId, rentalId } = req.params;
  let query = `DELETE FROM rental WHERE id = ? AND user_id = ?`;

  query = format(query, [rentalId, userId]);

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});