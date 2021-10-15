import { app } from '../../server';
import { db } from '../../db';
import bcrypt from "bcrypt";

const saltRounds = 10;

app.post("/register", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO user (firstName, lastName, email, password) VALUES (?,?,?,?)",
      [firstName, lastName, email, hash],
      (err, result) => {
        console.log(err);
      }
    );
  });
});