import { app } from "../../server";
import { db, format } from '../../db';

app.get("/users/:userId/profile", (req, res) => {
  const userId = req.params.userId;
  let query = `
    SELECT
      r.id,
      r.brand,
      r.size,
      r.material,
      r.color,
      r.description,
      r.biweekly_price,
      r.monthly_price,
      JSON_ARRAYAGG(JSON_OBJECT(
        'path', i.path,
        'id', i.id)) as images
    FROM rental r
    LEFT JOIN image i
    ON r.id = i.rental_id
    WHERE r.user_id = ? GROUP BY r.id;
  `
  
  query = format(query, [userId]);

  let results;

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      results = result.map((row) => {
        let images = JSON.parse(row.images);

        if (images.includes(null)) {
          images = [];
        }

        images.map((image) => {
          if (image) {
            return image.path;
          }
        })

        return {
          id: row.id,
          brand: row.brand,
          size: row.size,
          material: row.material,
          color: row.color,
          description: row.description,
          biweekly_price: row.biweekly_price,
          monthly_price: row.monthly_price,
          images: images
        }
      });

      res.send(results);
    }
  });
});
