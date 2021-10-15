import { app } from '../../server';

app.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send("Unable to log out");
      } else {
        res.status(200).send("Logout successful");
      }
    });
  } else {
    res.end();
  }
});