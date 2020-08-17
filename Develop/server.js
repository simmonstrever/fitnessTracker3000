const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const seed = require("./seeders");
const db = require("./models");


const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

db.Workout.create({name: "Testing"})
  .then(dbWorkout => {
    console.log(dbWorkout); 
  })
  .catch(({message}) => {
    console.log(message);
  });

db.Exercise.create({seed})
  .then(dbExercise => {
    console.log(dbExercise);
  })
  .catch(({message}) => {
    console.log(message);
  });


  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });