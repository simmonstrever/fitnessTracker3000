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


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

db.Workout.create({name: "Workout Test"})
  .then(dbWorkout => {
    console.log(dbWorkout); 
  })
  .catch(({message}) => {
    console.log(message);
  });

  // app.get("/exercise", (req, res) => {
  //   db.Exercise.find({})
  //     .then(dbExercise => {
  //       res.json(dbExercise);
  //     })
  //     .catch(err => {
  //       res.json(err);
  //     });
  // });

  app.get("/exercise?", (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });
 
  app.post("/exercise", ({ exercise }, res) => {
    db.Exercise.create(exercise)
      .then(({ _id }) => db.Workout.findOneAndUpdate({}, { $push: { exercise: _id } }, { new: true }))
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.get("/exercise?", (req, res) => {
    db.Workout.find({})
      .populate("exercises")
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.listen(PORT, () => {
    console.log(`App running on port ${PORT} !`);
  });