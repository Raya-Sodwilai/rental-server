import { app } from '../../server';
import { db } from '../../db';
import * as copyfiles from 'copyfiles';
import * as process from 'process';

app.post("/upload", function (req, res) {
  let sampleFiles = [];
  const { files } = req.files;
  const rentalId = Number(req.query.rentalId);

  if (!files || Object.keys(files).length === 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }

  // const publicFolder = path.join(__dirname) + '/public';
  console.log("req.files >>>", files); // eslint-disable-line
  files.forEach((file) => {
    sampleFiles.push({
      file: file,
      path: file.name,
    });
  });

  const insertQuery = "INSERT INTO image (rental_id, path) VALUES (?, ?)";

  sampleFiles.forEach((f) => {
    f.file.mv('./public/' + f.path, function (err) {
      if (err) {
        return res.send(err);
      }

      db.query(insertQuery, [rentalId, f.path], (err, result) => {
        if (err) {
          console.log(err);
        }
      });

      console.log("File uploaded to " + f.path);
    });
  });

  copyfiles([`./public/*.jpg`, `./build/`], false, (err, result) => {
    if (err) {
      console.log('err', err);
    }
    else {
      console.log('result', result);
      res.status(200).send("Successfully uploaded");
    }
  });
});