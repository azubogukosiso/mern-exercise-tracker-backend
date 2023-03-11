const router = require("express").Router();
let User = require("../models/user.model");

// gets every user in the database
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// adds a new user to the database
router.route("/add").post((req, res) => {
  const username = req.body.username;
  User.findOne({ username: username })
    .then((user) => {
      if (user) {
        res.json("User already exists!");
      } else {
        const newUser = new User({ username });

        newUser
          .save()
          .then(() => res.json("User added!"))
          .catch((err) => res.status(400).json("Error: " + err));
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
