const router = require("express").Router();
let Exercise = require("../models/exercise.model");

// gets a list of all exercises in the database
router.route("/").get((req, res) => {
  Exercise.find()
    .sort({ createdAt: -1 })
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error: " + err));
});

// adds a new exercise to the database
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.startDate);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise
    .save()
    .then(() => res.json("Exercsie added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// returns a particular exercise using its id in the database
router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});

// deletes a particular exercise using its id in the database
router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// updates all details of a certain exercise selected by its id
router.route("/update/:id").post((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then(() => res.json("Exercise updated!"))
        .catch((err) => res.json("Error saving exercise", err));
    })
    .catch((err) => res.json("Error finding exercise in database", err));
});

module.exports = router;
