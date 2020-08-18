const router = require("express").Router();
const db = require("../models");


router.post("/api/workouts", ({body}, res) => {
  db.Workout.create({day: Date.now()})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .populate("exercises")
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });


  router.put("/api/workouts/:id", (req, res) => {
    console.log(req.body)
    db.Exercise.create(req.body)
    .then((data) => db.Workout.findOneAndUpdate(
        {_id: req.params.id},
        {
            $push: {
                exercises: data._id
            },
            $inc: {
                totalDuration: data.duration
            }
        },
        { new: true })
    )
    .then(dbWorkout => {
        res.json(dbWorkout)
    })
    .catch(err => {
        res.json(err)
    })
});

// router.get("/api/workouts/range", (req, res) => {
//     db.Workout.find({})
//     .populate("exercises")
//     .then(dbWorkout => {
//         res.json(dbWorkout);
//     })
//     .catch(err => {
//         res.json(err)
//     })
// })


module.exports = router;