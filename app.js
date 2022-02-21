require("dotenv").config();

const express = require("express");
const session = require("express-session");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./routes/");

app.set("view engine", "ejs");
app.use(express.static("views"));
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );

app.use(router);

app.listen(port, () => {
  console.log(`Server is listening to http://localhost:${port}`);
});
