const db = require("../models");

module.exports = (app) => {

app.post("/api/workouts", (req, res) => {
  console.log(req.body);
  db.Work.create({day: Date.now()})
    .then(Workout => {
      res.json(Workout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

app.put("/api/workouts/:id", (req, res) => {
  console.log(req.body)
  db.Exercise.create(req.body)
  .then((data) => db.Work.findOneAndUpdate(
      {_id: req.params.id},
      {
          $push: {
              exercises: data._id
          },
          $inc: {
              totalDuration: data.duration
          }
      },
      { new: false })
  )
  .then(dbWorkout => {
      res.json(dbWorkout)
  })
  .catch(err => {
      res.json(err)
  })
});

app.get("/api/workouts", (req, res) => {
    db.Work.find({})
      .populate("exercises")
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

  app.get("/api/workouts/range", (req, res) => {
    db.Work.find({})
    .populate("exercises")
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err)
    })
})

};




