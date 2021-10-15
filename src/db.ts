import * as mysql from "mysql";

export const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "epicodus", // TODO: move to env file
  database: "rentals_db",
});

export const format = mysql.format;
