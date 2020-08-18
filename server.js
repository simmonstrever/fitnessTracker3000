const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");
// const seed = require("./seeders/seed.js");
// console.log(seed);


const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true});

// routes
app.use(require("./routes/api.js"));
app.use(require("./routes/htmlRoutes.js"));



  app.listen(PORT, () => {
    console.log(`App running on port ${PORT} !`);
  });