import { app } from '../../server';
import { db, format } from '../../db';

app.delete("/rentals/:rentalId/images/:imageId", (req, res) => {
  const {rentalId, imageId } = req.params;
  let query = `DELETE FROM image WHERE id = ? AND rental_id = ?`;

  query = format(query, [imageId, rentalId]);

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status('200').send(result);
    }
  });
});